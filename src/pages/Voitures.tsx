import { useEffect, useRef, useState } from "react";
import { ChevronDown, Car, Shield, Sparkles } from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import VerticalProgressBar from "../components/Voiture/VerticalProgressBar";
import AspirationStep from "../components/Voiture/AspirationStep";
import VehicleTypeStep from "../components/Voiture/VehicleTypeStep";
import SeatCleaningStep from "../components/Voiture/SeatCleaningStep";
import ExtrasStep from "../components/Voiture/ExtrasStep";
import SpecialOptionsStep from "../components/Voiture/SpecialOptionsStep";
import ContactStep from "../components/Voiture/ContactStep";
import SummaryBar from "../components/Voiture/SummaryBar";

const PRICING = {
  aspiration: { complete: 40, partielle: 30 },
  vehicle: { citadine: 0, berline: 10, break: 10, suv: 10, "7places": 20, utilitaire: 10 },
  seats: { avant: 20, arriere: 20, coffre: 15 },
  extras: { plastiques: 15, portes: 20, vitres: 10, parebrise: 5 },
  specials: { poils: 15, moquettes: 20, "tres-sale": 10, cuir: 20, souscoffre: 15 },
};

const TIMING = {
  aspiration: { complete: 60, partielle: 45 },
  vehicle: { citadine: 0, berline: 15, break: 15, suv: 15, "7places": 45, utilitaire: 60 },
  seats: { avant: 15, arriere: 15, coffre: 10 },
  extras: { plastiques: 10, portes: 10, vitres: 10, parebrise: 5 },
  specials: { poils: 20, moquettes: 25, "tres-sale": 15, cuir: 15, souscoffre: 10 },
};

export default function Voitures() {
  const [aspiration, setAspiration] = useState<string | null>(null);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [seatZones, setSeatZones] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [specialOptions, setSpecialOptions] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToNextSection = (index: number) => {
    setActiveStep(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    if (!aspiration || !vehicleType) {
      setShowErrorModal(true);
      return;
    }
    setShowErrorModal(false);
    scrollToNextSection(5);
  };

  const handleModalClose = () => {
    setShowErrorModal(false);
    setTimeout(() => {
      if (!aspiration && sectionRefs.current[0]) {
        sectionRefs.current[0].scrollIntoView({ behavior: "smooth", block: "center" });
        sectionRefs.current[0].classList.add("ring-4", "ring-red-400");
        setTimeout(() => {
          sectionRefs.current[0]?.classList.remove("ring-4", "ring-red-400");
        }, 1500);
      } else if (!vehicleType && sectionRefs.current[1]) {
        sectionRefs.current[1].scrollIntoView({ behavior: "smooth", block: "center" });
        sectionRefs.current[1].classList.add("ring-4", "ring-red-400");
        setTimeout(() => {
          sectionRefs.current[1]?.classList.remove("ring-4", "ring-red-400");
        }, 1500);
      }
    }, 200);
  };

  const handleSubmit = (data: any) => {
    console.log("✅ Données soumises :", data);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 4000);
  };

  const handleReset = () => {
    setAspiration(null);
    setVehicleType(null);
    setSeatZones([]);
    setExtras([]);
    setSpecialOptions([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getTotalPrice = () => {
    let total = 0;
    if (aspiration) total += PRICING.aspiration[aspiration];
    if (vehicleType) total += PRICING.vehicle[vehicleType];
    seatZones.forEach((zone) => {
      if (PRICING.seats[zone]) total += PRICING.seats[zone];
    });
    extras.forEach((extra) => {
      if (PRICING.extras[extra]) total += PRICING.extras[extra];
    });
    specialOptions.forEach((opt) => {
      if (PRICING.specials[opt]) total += PRICING.specials[opt];
    });
    return total;
  };

  const getTotalTime = () => {
    let time = 0;
    if (aspiration) time += TIMING.aspiration[aspiration];
    if (vehicleType) time += TIMING.vehicle[vehicleType];
    seatZones.forEach((zone) => {
      if (TIMING.seats[zone]) time += TIMING.seats[zone];
    });
    extras.forEach((extra) => {
      if (TIMING.extras[extra]) time += TIMING.extras[extra];
    });
    specialOptions.forEach((opt) => {
      if (TIMING.specials[opt]) time += TIMING.specials[opt];
    });
    return time;
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shouldShowSummary =
    hasScrolled ||
    aspiration ||
    vehicleType ||
    seatZones.length > 0 ||
    extras.length > 0 ||
    specialOptions.length > 0;

  const steps = [
    "1ère étape",
    "2ème étape",
    "3ème étape",
    "4ème étape",
    "5ème étape",
    "6ème étape",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <VerticalProgressBar
          activeStep={activeStep}
          selectedFormule={aspiration || ""}
          selectedCategory={vehicleType || ""}
          selectedSeats={seatZones}
          selectedExtras={extras}
          selectedSpecialOptions={specialOptions}
        />

        {shouldShowSummary && (
          <SummaryBar totalPrice={getTotalPrice()} totalTime={getTotalTime()} />
        )}

        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="relative bg-white rounded-3xl shadow-2xl px-8 py-10 max-w-md w-full border border-blue-100 animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-blue-700 text-center mb-3">Oops !</h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Vous devez d’abord sélectionner une <strong>aspiration</strong> et un <strong>type de véhicule</strong> avant de continuer.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all duration-200"
                >
                  Compris
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="relative bg-white rounded-3xl shadow-2xl px-8 py-10 max-w-md w-full border border-green-100 animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 text-green-600 p-4 rounded-full shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-green-700 text-center mb-3">Demande envoyée !</h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Votre demande a bien été reçue. Nous reviendrons vers vous dans les plus brefs délais.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transition-all duration-200"
                >
                  Parfait !
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-white text-center" style={{ backgroundImage: "url('/2d/tout/merco2.jpg')" }}>
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-6">Nettoyage Professionnel de Voitures</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Un service premium pour redonner à votre véhicule son éclat d'origine
            </p>
            <button
              onClick={() => scrollToNextSection(0)}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto"
            >
              Commencer ma configuration
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: "Service Complet", desc: "Intérieurs traités avec soin" },
              { icon: Shield, title: "Garantie Satisfaction", desc: "Résultats garantis ou remboursés" },
              { icon: Sparkles, title: "Produits Premium", desc: "Produits haut de gamme, biodégradables" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-6">
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
          {[
            <AspirationStep selected={aspiration} onSelect={(val) => { setAspiration(val); scrollToNextSection(1); }} />,
            <VehicleTypeStep selected={vehicleType} onSelect={(val) => { setVehicleType(val); scrollToNextSection(2); }} />,
            <SeatCleaningStep selectedZones={seatZones} onToggle={setSeatZones} vehicleType={vehicleType} onContinue={() => scrollToNextSection(3)} />,
            <ExtrasStep selectedExtras={extras} onToggle={(id) => setExtras((prev) => id === "aucune" ? ["aucune"] : prev.includes(id) ? prev.filter(e => e !== id) : [...prev.filter(e => e !== "aucune"), id])} onContinue={() => scrollToNextSection(4)} />,
            <SpecialOptionsStep selectedOptions={specialOptions} onToggle={(id) => setSpecialOptions((prev) => id === "aucune" ? ["aucune"] : prev.includes(id) ? prev.filter(o => o !== id) : [...prev.filter(o => o !== "aucune"), id])} onContinue={scrollToContact} />,
            <ContactStep aspiration={aspiration} vehicleType={vehicleType} seatZones={seatZones} extras={extras} specialOptions={specialOptions} onSubmit={handleSubmit} onReset={handleReset} />,
          ].map((Component, i) => (
            <section key={i} ref={(el) => (sectionRefs.current[i] = el)} className="section scroll-mt-24 bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{i + 1}</div>
                <h2 className="text-3xl font-bold">{steps[i]}</h2>
              </div>
              {Component}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}