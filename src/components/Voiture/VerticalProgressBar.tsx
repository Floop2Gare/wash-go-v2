import React, { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

interface VerticalProgressBarProps {
  activeStep: number;
  selectedFormule?: string;
  selectedCategory?: string;
  selectedSeats?: string[];
  selectedExtras?: string[];
  selectedSpecialOptions?: string[];
}

const steps = [
  "Aspiration",
  "Type de véhicule",
  "Nettoyage sièges",
  "Extras",
  "Options spéciales",
  "Contact",
];

const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({
  activeStep,
  selectedFormule,
  selectedCategory,
  selectedSeats,
  selectedExtras,
  selectedSpecialOptions,
}) => {
  const [showBar, setShowBar] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatValues = (arr?: string[], empty = "Non sélectionné", none = "Aucun") => {
    if (!arr || arr.length === 0) return empty;
    if (arr.includes("aucune") || arr.includes("Aucun")) return none;
    return arr.join(", ");
  };

  const getStepDetail = (index: number): string => {
    switch (index) {
      case 0:
        return selectedFormule || "Non sélectionné";
      case 1:
        return selectedCategory || "Non sélectionné";
      case 2:
        return formatValues(selectedSeats, "Non sélectionné", "Aucun siège");
      case 3:
        return formatValues(selectedExtras, "Non sélectionné", "Aucun extra");
      case 4:
        return formatValues(selectedSpecialOptions, "Non sélectionné", "Aucune option");
      case 5:
        return "Coordonnées à remplir";
      default:
        return "Non sélectionné";
    }
  };

  const isStepDone = (index: number): boolean => {
    switch (index) {
      case 0:
        return !!selectedFormule;
      case 1:
        return !!selectedCategory;
      case 2:
        return selectedSeats && selectedSeats.length > 0;
      case 3:
        return selectedExtras && selectedExtras.length > 0;
      case 4:
        return selectedSpecialOptions && selectedSpecialOptions.length > 0;
      case 5:
        return false;
      default:
        return false;
    }
  };

  const scrollToStep = (index: number) => {
    const section = document.querySelectorAll(".section")[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop - Vertical Bar */}
      <div
        ref={barRef}
        className={`fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start transition-opacity duration-500 space-y-6 ${
          showBar ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-start h-full pl-4">
          {/* Ligne grise + remplissage dynamique */}
          <div className="absolute left-2 top-2 w-[2px] h-full bg-gray-200 z-0 rounded" />
          <div
            className="absolute left-2 top-2 w-[2px] bg-gradient-to-b from-blue-500 to-blue-700 z-10 rounded transition-all duration-700"
            style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          {/* Étapes */}
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep || isStepDone(index);
            const detail = getStepDetail(index);

            return (
              <div
                key={index}
                className="relative z-20 mb-6 flex items-center cursor-pointer group"
                onClick={() => scrollToStep(index)}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 border-blue-600"
                      : isDone
                      ? "bg-blue-400 border-blue-400"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {isDone && !isActive && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="ml-4 flex flex-col">
                  <span
                    className={`text-sm font-semibold ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  >
                    {step}
                  </span>
                  {detail && (
                    <span className="text-xs text-gray-400 max-w-[140px] truncate">
                      {detail}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile - Horizontal Bar */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex md:hidden bg-white border border-gray-200 shadow-xl rounded-full px-6 py-2 transition-all duration-300 ${
          showBar ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep || isStepDone(index);

          return (
            <div
              key={index}
              className="flex flex-col items-center text-[10px] mx-2 cursor-pointer"
              onClick={() => scrollToStep(index)}
            >
              <div
                className={`w-4 h-4 rounded-full border-2 mb-1 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 border-blue-600"
                    : isDone
                    ? "bg-blue-400 border-blue-400"
                    : "bg-white border-gray-300"
                }`}
              >
                {isDone && !isActive && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`whitespace-nowrap font-medium ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VerticalProgressBar;
