// ✅ Code fusionné avec prise en compte du reset visuel des sous-étapes

import { useRef, useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Accueil/Footer";
import VerticalProgressBar from "../components/VerticalProgressBar/VerticalProgressBar";
import AspirationStep from "../components/AspirationStep";
import VehicleTypeStep from "../components/VehicleTypeStep";
import SeatCleaningStep from "../components/SeatCleaningStep";
import SpecialOptionsStep from "../components/SpecialOptionsStep";
import ExtrasStep from "../components/ExtrasStep";
import TotalSummary from "../components/TotalSummary";
import ContactStep from "../components/ContactStep";
import { ChevronDown, Car, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { label: "Aspiration", component: AspirationStep },
  { label: "Type de véhicule", component: VehicleTypeStep },
  { label: "Pressing sièges", component: SeatCleaningStep },
  { label: "Options spéciales", component: SpecialOptionsStep },
  { label: "Extras", component: ExtrasStep },
  { label: "Contact et validation", component: ContactStep },
];

export default function Voitures() {
  const [aspiration, setAspiration] = useState<any>(null);
  const [vehicule, setVehicule] = useState<any>(null);
  const [pressing, setPressing] = useState({ value: [], price: 0, time: 0 });
  const [options, setOptions] = useState({ value: [], price: 0, time: 0 });
  const [extras, setExtras] = useState({ value: [], price: 0, time: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [formError, setFormError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const aspirationRef = useRef(null);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);

  useEffect(() => {
    if (!aspirationRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyBarVisible(entry.isIntersecting || entry.boundingClientRect.top <= 0);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-40% 0px 0px 0px"
      }
    );
    observer.observe(aspirationRef.current);
    return () => observer.disconnect();
  }, []);

  const totalPrice = (aspiration?.price || 0) + (vehicule?.price || 0) + pressing.price + options.price + extras.price;
  const totalTime = (aspiration?.time || 0) + (vehicule?.time || 0) + pressing.time + options.time + extras.time;

  const selections = [
    aspiration ? { step: "Aspiration", value: aspiration.value } : null,
    vehicule ? { step: "Véhicule", value: vehicule.value } : null,
    pressing.value.length ? { step: "Pressing sièges", value: pressing.value.join(", ") } : null,
    options.value.length ? { step: "Options spéciales", value: options.value.join(", ") } : null,
    extras.value.length ? { step: "Extras", value: extras.value.join(", ") } : null,
  ].filter(Boolean);

  const handleNext = (stepIdx) => {
    if (stepIdx === 1 && !aspiration) return error("Veuillez compléter l'aspiration.");
    if (stepIdx === 2 && (!aspiration || !vehicule)) return error("Complétez l'aspiration et le type de véhicule.");
    if (stepIdx === 3 && pressing.value.length === 0) return error("Sélectionnez au moins un pressing.");
    setActiveStep(stepIdx);
    sectionRefs.current[stepIdx]?.scrollIntoView({ behavior: "smooth" });
  };

  const error = (msg) => {
    setFormError(msg);
    setShowErrorModal(true);
  };

  const handleReset = () => {
    setAspiration(null);
    setVehicule(null);
    setPressing({ value: [], price: 0, time: 0 });
    setOptions({ value: [], price: 0, time: 0 });
    setExtras({ value: [], price: 0, time: 0 });
    setActiveStep(0);
    
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />

      <div ref={heroRef} className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 text-white text-center" style={{ backgroundImage: "url('/voiture/merco.jpg')" }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6 sm:space-y-8 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
            Nettoyage Professionnel de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Voitures
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
            Offrez à votre véhicule une expérience de propreté haut de gamme
          </p>
          <motion.button
            onClick={() => {
              const target = aspirationRef.current || sectionRefs.current[0];
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-sm sm:text-base"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
            <span className="relative z-10 flex items-center space-x-2">
              <span>Commencer ma demande sur mesure</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-1" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Section Features harmonisée avec Accueil */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-white to-slate-300">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Pourquoi choisir <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wash&GO</span> ?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Pour les actifs, Wash&GO propose une expérience de nettoyage automobile haut de gamme,
            pensée pour vous faire gagner du temps sans sacrifier la qualité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 max-w-6xl mx-auto">
          {[
            { icon: Car, title: "Service Complet", desc: "Intérieur traité avec soin", bg: "bg-gradient-to-br from-blue-500 to-blue-600" },
            { icon: Shield, title: "Garantie Satisfaction", desc: "Résultats garantis ou remboursés", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
            { icon: Sparkles, title: "Produits Premium", desc: "Produits haut de gamme uniquement", bg: "bg-gradient-to-br from-purple-500 to-purple-600" },
          ].map(({ icon: Icon, title, desc, bg }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center h-full"
            >
              <div className={`h-14 w-14 ${bg} rounded-xl flex items-center justify-center mb-5 shadow-inner`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className={`transition-opacity duration-500 ${stickyBarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <VerticalProgressBar selections={selections} totalSteps={6} />
        <TotalSummary price={totalPrice} time={totalTime} onReset={handleReset} />
      </div>

      {showErrorModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm sm:max-w-md text-center">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-blue-600 mb-2 sm:mb-3 md:mb-4">Attention</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 md:mb-6">{formError}</p>
            <button onClick={() => setShowErrorModal(false)} className="bg-blue-600 text-white px-3 sm:px-4 md:px-6 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
              Fermer
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-12 space-y-12 sm:space-y-16 md:space-y-24">
        {steps.map((step, i) => {
          const StepComponent = step.component;
          let vehicleTypeId = undefined;
          if (i === 2 && vehicule?.value) {
            const vehicleTypes = [
              { id: "citadine", label: "Citadine" },
              { id: "berline", label: "Berline / Break" },
              { id: "suv", label: "SUV / 4x4" },
              { id: "7places", label: "7 places" },
              { id: "utilitaire", label: "Utilitaire" },
              { id: "horsgabarit", label: "Hors de ces gabarits" },
            ];
            const found = vehicleTypes.find(v => v.label === vehicule.value);
            vehicleTypeId = found?.id;
          }

          const props = i === 0 ? { 
              onSelect: (data) => {
                setAspiration(data);
                if (i < steps.length - 1) {
                  setTimeout(() => {
                    setActiveStep(i + 1);
                    sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }
              }, 
              selected: aspiration?.value
            }
            : i === 1 ? { 
                onSelect: (data) => {
                  setVehicule(data);
                  if (i < steps.length - 1) {
                    setTimeout(() => {
                      setActiveStep(i + 1);
                      sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }
                }, 
                selected: vehicule?.value
              }
            : i === 2 ? { 
                onSelect: (data) => {
                  setPressing(data);
                  if (i < steps.length - 1) {
                    setTimeout(() => {
                      setActiveStep(i + 1);
                      sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }
                },
                vehicleTypeId, 
                selected: pressing.value
              }
            : i === 3 ? { 
                onSelect: (data) => {
                  setOptions(data);
                  if (i < steps.length - 1) {
                    setTimeout(() => {
                      setActiveStep(i + 1);
                      sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }
                },
                selected: options.value
              }
            : i === 4 ? { 
                onSelect: (data) => {
                  setExtras(data);
                  if (i < steps.length - 1) {
                    setTimeout(() => {
                      setActiveStep(i + 1);
                      sectionRefs.current[i + 1]?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }
                },
                selected: extras.value
              }
            : { 
                selections, 
                totalPrice, 
                totalTime, 
                onReset: handleReset
              };

          return (
            <section key={i} ref={i === 0 ? aspirationRef : (el) => (sectionRefs.current[i] = el)} className="section scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">{i + 1}</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{step.label}</h2>
              </div>
              <StepComponent {...props} />
            </section>
          );
        })}
      </div>

      <Footer />
    </>
  );
}
