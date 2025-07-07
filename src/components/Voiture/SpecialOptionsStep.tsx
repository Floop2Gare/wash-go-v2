// components/Voiture/SpecialOptionsStep.tsx
import React from "react";

interface SpecialOptionsStepProps {
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
  onContinue?: () => void;
}

const options = [
  {
    id: "poils",
    title: "Présence de poils d’animaux",
    price: 15,
    desc: "Retrait approfondi des poils incrustés",
    image: "/2d/Voiture/specific/poils.jpg",
  },
  {
    id: "moquettes",
    title: "Pressing moquettes (sols)",
    price: 20,
    desc: "Remise à neuf du sol de l’habitacle",
    image: "/2d/Voiture/specific/moquettes.jpg",
  },
  {
    id: "tres-sale",
    title: "Véhicule très sale",
    price: 10,
    desc: "Intervention renforcée pour salissures exceptionnelles",
    image: "/2d/Voiture/specific/tressale.jpg",
  },
  {
    id: "cuir",
    title: "Nettoyage et hydratation cuir",
    price: 20,
    desc: "Traitement des sièges en cuir pour éliminer les marques type jean et hydrater",
    image: "/2d/Voiture/specific/cuir.jpg",
  },
  {
    id: "souscoffre",
    title: "Compartiment sous le coffre",
    price: 15,
    desc: "Zone sous le plancher du coffre, souvent négligée",
    image: "/2d/Voiture/specific/souscoffre.jpg",
  },
  {
    id: "aucune",
    title: "Aucune option",
    price: 0,
    desc: "Je ne souhaite pas d’option spécifique",
    image: "/2d/Voiture/pressing/aucun.svg",
  },
];

export default function SpecialOptionsStep({
  selectedOptions,
  onToggle,
  onContinue,
}: SpecialOptionsStepProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Choisissez vos <span className="text-blue-600">options spécifiques</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6 justify-center">
        {options.map((opt) => {
          const isSelected = selectedOptions.includes(opt.id);
          return (
            <div
              key={opt.id}
              onClick={() => {
                if (opt.id === "aucune") {
                  onToggle("aucune");
                } else {
                  onToggle(opt.id);
                }
              }}
              className={`cursor-pointer rounded-xl overflow-hidden border transition duration-200 hover:shadow-md ${
                isSelected ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
            >
              <div className="relative h-44">
                <img
                  src={opt.image}
                  alt={opt.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 flex justify-between items-center">
                  {opt.title}
                  {opt.price > 0 && (
                    <span className="text-blue-600">+{opt.price} €</span>
                  )}
                </h3>
                <p className="text-gray-600 mt-2">{opt.desc}</p>
                {isSelected && (
                  <div className="mt-4 text-sm text-blue-600 font-medium">
                    ✔ Option sélectionnée
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {onContinue && (
        <div className="flex justify-end pt-6">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200"
          >
            Continuer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
