// components/Voiture/ExtrasStep.tsx
import React from "react";

interface ExtrasStepProps {
  selectedExtras: string[];
  onToggle: (extraId: string) => void;
  onContinue?: () => void;
}

const extras = [
  {
    id: "plastiques",
    title: "Plastiques intérieurs",
    price: 15,
    desc: "Finition esthétique, effet neuf immédiat",
    image: "/2d/Voiture/extras/plastiques.jpg",
  },
  {
    id: "portes",
    title: "Encadrements de portes",
    price: 20,
    desc: "Zones souvent oubliées mais très visibles",
    image: "/2d/Voiture/extras/portes.jpg",
  },
  {
    id: "vitres",
    title: "Vitres intérieures",
    price: 10,
    desc: "Amélioration de la visibilité et du confort",
    image: "/2d/Voiture/extras/vitres.jpg",
  },
  {
    id: "parebrise",
    title: "Pare-brise (option)",
    price: 5,
    desc: "Sécurité renforcée et sensation de propreté accrue",
    image: "/2d/Voiture/extras/parebrise.jpg",
  },
  {
    id: "aucune",
    title: "Aucune option",
    price: 0,
    desc: "Je ne souhaite pas d'option complémentaire",
    image: "/2d/Voiture/pressing/aucun.svg",
  },
];

export default function ExtrasStep({ selectedExtras, onToggle, onContinue }: ExtrasStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Choisissez vos <span className="text-blue-600">options supplémentaires</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {extras.map((opt) => {
          const isSelected = selectedExtras.includes(opt.id);
          return (
            <div
              key={opt.id}
              onClick={() => onToggle(opt.id)}
              className={`cursor-pointer rounded-xl overflow-hidden border transition duration-200 hover:shadow-md ${
                isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"
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
                <h3 className="text-lg font-semibold text-gray-800">
                  {opt.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{opt.desc}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Supplément : +{opt.price} €
                </p>
                {isSelected && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    ✔ Option sélectionnée
                  </p>
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
