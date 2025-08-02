import { useRef, useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
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
    if (stepIdx === 3 && options.value.length === 0) return error("Sélectionnez au moins une option ou passez sans option.");
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

      <div ref={heroRef} className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 text-white text-center" style={{ backgroundImage: "url('/canapé/canape.jpg')" }}>
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight px-2">Nettoyage Professionnel de <span className="text-[#0049ac]">Canapés</span></h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto px-2 leading-relaxed">Offrez à vos canapés une expérience de propreté haut de gamme</p>
          <button onClick={() => {
            const target = fabricTypeRef.current || sectionRefs.current[0];
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }} className="bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto text-sm sm:text-base lg:text-lg min-h-[56px] sm:min-h-[60px]">
            Commencer ma demande sur mesure
            <ChevronDown size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>

      {/* Section Introduction du service canapé */}
      <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Notre service de nettoyage canapé</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-2 leading-relaxed">Un traitement complet et professionnel pour tous types de tissus</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: Droplets, title: "Nettoyage vapeur", desc: "Élimination des saletés incrustées en profondeur" },
              { icon: Zap, title: "Désinfection", desc: "Protection antibactérienne complète" },
              { icon: Heart, title: "Anti-odeurs", desc: "Traitement neutralisant les mauvaises odeurs" },
              { icon: Brush, title: "Soin du tissu", desc: "Brossage et protection du matériau" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#0049ac]" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">{desc}</p>
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-sm sm:max-w-md text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-4 sm:mb-6">Attention</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">{formError}</p>
            <button onClick={() => setShowErrorModal(false)} className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 text-sm sm:text-base lg:text-lg min-h-[48px] sm:min-h-[52px] transition-colors">
              Fermer
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-16 sm:space-y-20 lg:space-y-24">
        {steps.map((step, i) => {
          const StepComponent = step.component;

          const props = i === 0 ? { onSelect: handleStepSelect(i, setFabricType), selected: fabricType?.value }
            : i === 1 ? { onSelect: handleStepSelect(i, setPlaces), selected: places?.value }
            : i === 2 ? { onSelect: handleStepSelect(i, setOptions), selected: options.value }
            : { selections, totalPrice, totalTime, onReset: handleReset };

          return (
            <section key={i} ref={i === 0 ? fabricTypeRef : (el) => (sectionRefs.current[i] = el)} className="section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28 bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#0049ac] text-white flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg">{i + 1}</div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{step.label}</h2>
              </div>
              <StepComponent {...props} />
            </section>
          );
        })}
      </div>
    </>
  );
}
