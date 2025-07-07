import React from "react";
import { CheckCircle } from "lucide-react";

interface Option {
  id: string;
  label: string;
  description: string;
  price: string;
}

interface OptionsStepProps {
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  onContinue: () => void;
  scrollToRecap: () => void;
}

const options: Option[] = [
  {
    id: "cuir",
    label: "Nettoyage cuir",
    description: "Traitement nourrissant et protecteur du cuir",
    price: "+10€",
  },
  {
    id: "poils",
    label: "Poils animaux",
    description: "Élimination approfondie des poils incrustés",
    price: "+10€",
  },
  {
    id: "plastique",
    label: "Rénovation plastiques",
    description: "Ravive l’aspect neuf des plastiques intérieurs",
    price: "+10€",
  },
  {
    id: "aucune",
    label: "Aucune option",
    description: "Aucune option supplémentaire sélectionnée",
    price: "0€",
  },
];

const OptionsStep: React.FC<OptionsStepProps> = ({
  selectedOptions,
  onToggleOption,
  onContinue,
  scrollToRecap,
}) => {
  const isAucuneSelected = selectedOptions.includes("aucune");

  const handleOptionClick = (id: string) => {
    if (id === "aucune") {
      onToggleOption("aucune");
    } else {
      if (isAucuneSelected) {
        onToggleOption("aucune");
      }
      onToggleOption(id);
    }
  };

  const visibleOptions = options.filter(o => o.id !== "aucune");
  const aucuneOption = options.find(o => o.id === "aucune");

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
          Choisissez vos <span className="text-blue-600">options supplémentaires</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleOptions.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <div
                key={option.id}
                role="checkbox"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => handleOptionClick(option.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(option.id)}
                className={`
                  relative cursor-pointer border rounded-xl p-6 transition-all duration-300 outline-none
                  ${isSelected 
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.03]" 
                    : "border-gray-200 hover:border-blue-300 hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{option.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                  {isSelected && <CheckCircle className="text-blue-500" size={24} />}
                </div>
                <p className="mt-4 text-blue-600 font-bold text-right">{option.price}</p>
              </div>
            );
          })}

          {/* Option "Aucune" centrée */}
          {aucuneOption && (
            <div className="col-span-full flex justify-center">
              <div
                role="checkbox"
                tabIndex={0}
                aria-checked={isAucuneSelected}
                onClick={() => handleOptionClick("aucune")}
                onKeyDown={(e) => e.key === 'Enter' && handleOptionClick("aucune")}
                className={`
                  relative cursor-pointer border rounded-xl p-6 transition-all duration-300 outline-none max-w-xs w-full
                  ${isAucuneSelected 
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.03]" 
                    : "border-gray-200 hover:border-blue-300 hover:shadow focus-visible:ring-2 focus-visible:ring-blue-300"}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{aucuneOption.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{aucuneOption.description}</p>
                  </div>
                  {isAucuneSelected && <CheckCircle className="text-blue-500" size={24} />}
                </div>
                <p className="mt-4 text-blue-600 font-bold text-right">{aucuneOption.price}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            onContinue();
            scrollToRecap();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-200"
        >
          Continuer
        </button>
      </div>
    </section>
  );
};

export default OptionsStep;
