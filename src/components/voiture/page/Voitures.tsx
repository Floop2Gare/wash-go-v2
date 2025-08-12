// ✅ Code fusionné avec prise en compte du reset visuel des sous-étapes

import React, { useState, useEffect, useRef } from "react";
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
import { ChevronDown, Car, Shield, Sparkles, Wrench, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

// Icônes SVG personnalisées dans le style de la page Accueil
const ServiceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    <path d="M9 12l6 6"/>
  </svg>
);

const GuaranteeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const PremiumIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

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
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-4 sm:space-y-6 md:space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
              Nettoyage Professionnel de{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Voitures
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
              Offrez à votre véhicule une expérience de propreté haut de gamme
            </p>
            
            {/* Bouton CTA harmonisé */}
            <motion.button
              onClick={() => {
                const target = aspirationRef.current || sectionRefs.current[0];
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-sm sm:text-base md:text-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Commencer ma demande sur mesure</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-1" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Section Features harmonisée avec Accueil */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-white to-slate-300">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Pourquoi choisir{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Wash&GO
              </span>{" "}?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2">
              Pour les actifs, Wash&GO propose une expérience de nettoyage automobile haut de gamme,
              pensée pour vous faire gagner du temps sans sacrifier la qualité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { icon: ServiceIcon, title: "Service Complet", desc: "Intérieur traité avec soin", bg: "bg-gradient-to-br from-blue-500 to-blue-600" },
              { icon: GuaranteeIcon, title: "Garantie Satisfaction", desc: "Résultats garantis ou remboursés", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
              { icon: PremiumIcon, title: "Produits Premium", desc: "Produits haut de gamme uniquement", bg: "bg-gradient-to-br from-purple-500 to-purple-600" },
            ].map(({ icon: Icon, title, desc, bg }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center h-full border border-gray-100"
              >
                <div className={`h-12 h-12 sm:w-14 sm:h-14 ${bg} rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
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

      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
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
                  selected: extras.value,
                  aspirationType: aspiration?.value
                }
              : { 
                  selections, 
                  totalPrice, 
                  totalTime, 
                  onReset: handleReset
                };

            return (
              <motion.section 
                key={i} 
                ref={i === 0 ? aspirationRef : (el) => (sectionRefs.current[i] = el)} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-100"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base md:text-lg">{i + 1}</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{step.label}</h2>
                </div>
                <StepComponent {...props} />
              </motion.section>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
