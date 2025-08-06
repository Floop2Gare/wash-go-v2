import { useRef, useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Accueil/Footer";
import VerticalProgressBar from "../components/VerticalProgressBar";
import FabricTypeStep from "../components/FabricTypeStep";
import CanapeTypeStep from "../components/CanapeTypeStep";
import CanapeOptionsStep from "../components/CanapeOptionsStep";
import CanapeContactStep from "../components/CanapeContactStep";
import TotalSummary from "../../voiture/components/TotalSummary";
import { ChevronDown, Shield, Sparkles, Home, Droplets, Zap, Heart, Brush } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { label: "Type de tissu", component: FabricTypeStep },
  { label: "Nombre de places", component: CanapeTypeStep },
  { label: "Options supplémentaires", component: CanapeOptionsStep },
  { label: "Contact et validation", component: CanapeContactStep },
];

export default function Canapes() {
  const [fabricType, setFabricType] = useState(null);
  const [places, setPlaces] = useState(null);
  const [options, setOptions] = useState({ value: [], price: 0, time: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [formError, setFormError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);
  const fabricTypeRef = useRef(null);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  


  useEffect(() => {
    if (!fabricTypeRef.current) return;
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
    observer.observe(fabricTypeRef.current);
    return () => observer.disconnect();
  }, []);

  const totalPrice = (fabricType?.price || 0) + (places?.price || 0) + options.price;
  const totalTime = (fabricType?.time || 0) + (places?.time || 0) + options.time;

  const selections = [
    fabricType ? { step: "Type de tissu", value: fabricType.value } : null,
    places ? { step: "Nombre de places", value: places.value } : null,
    options.value.length ? { step: "Options supplémentaires", value: options.value.join(", ") } : null,
  ].filter(Boolean);

  const handleNext = (stepIdx) => {
    if (stepIdx === 1 && !fabricType) return error("Veuillez compléter le type de tissu.");
    if (stepIdx === 2 && (!fabricType || !places)) return error("Complétez le type de tissu et le nombre de places.");
    if (stepIdx === 3 && options.value.length === 0)
      return error("Sélectionnez au moins une option supplémentaire.");
    setActiveStep(stepIdx);
    sectionRefs.current[stepIdx]?.scrollIntoView({ behavior: "smooth" });
  };

  const error = (msg) => {
    setFormError(msg);
    setShowErrorModal(true);
  };



  const handleReset = () => {
    setFabricType(null);
    setPlaces(null);
    setOptions({ value: [], price: 0, time: 0 });
    setActiveStep(0);
    
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />

      <div ref={heroRef} className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 text-white text-center" style={{ backgroundImage: "url('/canapé/canape.jpg')" }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6 sm:space-y-8 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
            Nettoyage Professionnel de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Canapés
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
            Offrez à vos canapés une expérience de propreté haut de gamme
          </p>
          <motion.button
            onClick={() => {
              const target = fabricTypeRef.current || sectionRefs.current[0];
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
            Pour les actifs, Wash&GO propose une expérience de nettoyage de canapés haut de gamme,
            pensée pour vous faire gagner du temps sans sacrifier la qualité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mt-14 max-w-6xl mx-auto">
          {[
            { icon: Droplets, title: "Nettoyage vapeur", desc: "Élimination des saletés incrustées", bg: "bg-gradient-to-br from-blue-500 to-blue-600" },
            { icon: Zap, title: "Désinfection", desc: "Protection antibactérienne complète", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
            { icon: Heart, title: "Anti-odeurs", desc: "Traitement neutralisant les mauvaises odeurs", bg: "bg-gradient-to-br from-purple-500 to-purple-600" },
            { icon: Brush, title: "Soin du tissu", desc: "Brossage et protection du matériau", bg: "bg-gradient-to-br from-orange-500 to-orange-600" },
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
        <VerticalProgressBar selections={selections} totalSteps={4} />
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

          // Props originales pour chaque étape
          const props = i === 0 ? { 
              onSelect: (selection) => {
                setFabricType(selection);
                setTimeout(() => {
                  setActiveStep(1);
                  sectionRefs.current[1]?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }, 
              selected: fabricType?.value
            }
            : i === 1 ? { 
                onSelect: (selection) => {
                  setPlaces(selection);
                  setTimeout(() => {
                    setActiveStep(2);
                    sectionRefs.current[2]?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }, 
                selected: places?.value
              }
            : i === 2 ? { 
                onSelect: (selection) => {
                  setOptions(selection);
                  setTimeout(() => {
                    setActiveStep(3);
                    sectionRefs.current[3]?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }, 
                selected: options.value
              }
            : { 
                selections, 
                totalPrice, 
                totalTime, 
                onReset: handleReset
              };

          return (
            <section key={i} ref={i === 0 ? fabricTypeRef : (el) => (sectionRefs.current[i] = el)} className="section scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
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
