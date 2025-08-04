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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">Nettoyage Professionnel de <span className="text-[#0049ac]">Canapés</span></h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-2">Offrez à vos canapés une expérience de propreté haut de gamme</p>
          <button onClick={() => {
            const target = fabricTypeRef.current || sectionRefs.current[0];
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }} className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto text-sm sm:text-base">
            Commencer ma demande sur mesure
            <ChevronDown size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Section Introduction du service canapé */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Notre service de nettoyage canapé</h2>
            <p className="text-base sm:text-lg text-gray-600 px-2">Un traitement complet et professionnel pour tous types de tissus</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Droplets, title: "Nettoyage vapeur", desc: "Élimination des saletés incrustées en profondeur" },
              { icon: Zap, title: "Désinfection", desc: "Protection antibactérienne complète" },
              { icon: Heart, title: "Anti-odeurs", desc: "Traitement neutralisant les mauvaises odeurs" },
              { icon: Brush, title: "Soin du tissu", desc: "Brossage et protection du matériau" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0049ac]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`transition-opacity duration-500 ${stickyBarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <VerticalProgressBar selections={selections} totalSteps={4} />
        <TotalSummary price={totalPrice} time={totalTime} onReset={handleReset} />
      </div>

      {showErrorModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm sm:max-w-md text-center">
            <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-3 sm:mb-4">Attention</h2>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{formError}</p>
            <button onClick={() => setShowErrorModal(false)} className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
              Fermer
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {steps.map((step, i) => {
          const StepComponent = step.component;

          const props = i === 0 ? { onSelect: handleStepSelect(i, setFabricType), selected: fabricType?.value }
            : i === 1 ? { onSelect: handleStepSelect(i, setPlaces), selected: places?.value }
            : i === 2 ? { onSelect: handleStepSelect(i, setOptions), selected: options.value }
            : { selections, totalPrice, totalTime, onReset: handleReset };

          return (
            <section key={i} ref={i === 0 ? fabricTypeRef : (el) => (sectionRefs.current[i] = el)} className="section scroll-mt-20 sm:scroll-mt-24 bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0049ac] text-white flex items-center justify-center font-bold text-sm sm:text-base">{i + 1}</div>
                <h2 className="text-2xl sm:text-3xl font-bold">{step.label}</h2>
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
