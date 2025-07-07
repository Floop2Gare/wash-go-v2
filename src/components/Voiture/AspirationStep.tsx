// components/Voiture/AspirationStep.tsx
import React from "react";

interface AspirationStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const options = [
  {
    id: "complete",
    title: "Aspiration complète",
    price: 40,
    desc: "Nettoyage intégral de l'habitacle, incluant le coffre. Recommandé pour un résultat optimal.",
  },
  {
    id: "partielle",
    title: "Aspiration partielle",
    price: 30,
    desc: "Aspiration complète de l'habitacle (hors coffre). Idéal pour les entretiens réguliers.",
  },
];

export default function AspirationStep({ selected, onSelect }: AspirationStepProps) {
  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-10">
        Choisissez votre type <span className="text-blue-600">d'aspiration</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`cursor-pointer border rounded-2xl p-6 transition duration-200 hover:shadow-md ${
                isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800 flex justify-between items-center">
                {opt.title}
                <span className="text-blue-600 font-bold">{opt.price} €</span>
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">{opt.desc}</p>
              {isSelected && (
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  ✔ Option sélectionnée
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
