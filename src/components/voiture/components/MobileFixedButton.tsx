import React from "react";
import { ArrowRight } from "lucide-react";

interface MobileFixedButtonProps {
  selectedItems: string[];
  onValidate: () => void;
  onValidateWithoutOptions: () => void;
  loading: boolean;
  stepName: string;
}

const MobileFixedButton: React.FC<MobileFixedButtonProps> = ({
  selectedItems,
  onValidate,
  onValidateWithoutOptions,
  loading,
  stepName,
}) => {
  const hasSelections = selectedItems.length > 0;
  
  // Libellé dynamique selon les sélections
  const getButtonText = () => {
    if (hasSelections) {
      switch (stepName) {
        case "Pressing sièges":
          return "Valider les sièges";
        case "Options spéciales":
          return "Valider les options";
        case "Extras":
          return "Finaliser les extras";
        default:
          return "Valider les options";
      }
    } else {
      switch (stepName) {
        case "Pressing sièges":
          return "Valider sans pressing";
        case "Options spéciales":
          return "Valider sans options";
        case "Extras":
          return "Finaliser sans extra";
        default:
          return "Valider sans options";
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 z-50 md:hidden">
      <button
        onClick={hasSelections ? onValidate : onValidateWithoutOptions}
        disabled={loading}
        className={`w-full rounded-xl py-4 font-bold text-white bg-[#0049ac] shadow-lg text-base flex items-center justify-center transition-all duration-300
          ${loading 
            ? "opacity-50 cursor-not-allowed" 
            : "hover:bg-blue-800 active:scale-95"
          }
          ${hasSelections 
            ? "bg-[#0049ac] shadow-[#0049ac]/25" 
            : "bg-gray-600 shadow-gray-600/25"
          }`}
      >
        {getButtonText()}
        <ArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default MobileFixedButton; 