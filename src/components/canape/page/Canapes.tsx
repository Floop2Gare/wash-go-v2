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

  const handleStepSelect = (stepIdx: number, setter: (data: any) => void) => (data: any) => {
    setter(data);
    if (stepIdx < steps.length - 1) {
      setTimeout(() => {
        setActiveStep(stepIdx + 1);
        sectionRefs.current[stepIdx + 1]?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
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
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight">Nettoyage Professionnel de <span className="text-[#0049ac]">Canapés</span></h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-2">Offrez à vos canapés une expérience de propreté haut de gamme</p>
          <button onClick={() => {
            const target = fabricTypeRef.current || sectionRefs.current[0];
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }} className="bg-white text-blue-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto text-sm sm:text-base">
            Commencer ma demande sur mesure
            <ChevronDown size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Section Introduction harmonisée avec la page Voiture */}
      <div className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { icon: Droplets, title: "Nettoyage vapeur", desc: "Élimination des saletés incrustées" },
            { icon: Zap, title: "Désinfection", desc: "Protection antibactérienne complète" },
            { icon: Heart, title: "Anti-odeurs", desc: "Traitement neutralisant les mauvaises odeurs" },
            { icon: Brush, title: "Soin du tissu", desc: "Brossage et protection du matériau" },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="text-center p-3 sm:p-4 md:p-6">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-2 sm:mb-3 md:mb-4" />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

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

          const props = i === 0 ? { onSelect: handleStepSelect(i, setFabricType), selected: fabricType?.value }
            : i === 1 ? { onSelect: handleStepSelect(i, setPlaces), selected: places?.value }
            : i === 2 ? { onSelect: handleStepSelect(i, setOptions), selected: options.value }
            : { selections, totalPrice, totalTime, onReset: handleReset };

          return (
            <section key={i} ref={i === 0 ? fabricTypeRef : (el) => (sectionRefs.current[i] = el)} className="section scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#0049ac] text-white flex items-center justify-center font-bold text-xs sm:text-sm md:text-base">{i + 1}</div>
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
