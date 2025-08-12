import React, { useState, useEffect } from "react";

interface AspirationStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string; // ✅ nouvelle prop contrôlée
}

const options = [
  {
    value: "Partielle (hors coffre)",
    title: "Aspiration partielle",
    desc: "Nettoyage de l'habitacle hors coffre avec dépoussiérage des plastiques",
    price: 20,
    time: 50,
    img: "/voiture/aspiration/sanscoffre.svg",
  },
  {
    value: "Complète (avec coffre)",
    title: "Aspiration complète",
    desc: "Nettoyage complet de l'habitacle + coffre avec dépoussiérage des plastiques",
    price: 30,
    time: 75,
    img: "/voiture/aspiration/aveccoffre.svg",
  },
];

const AspirationStep: React.FC<AspirationStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  // ✅ Mise à jour automatique si le parent change la sélection
  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (opt: typeof options[0]) => {
    setSelected(opt.value);
    onSelect({ step: "Aspiration", value: opt.value, price: opt.price, time: opt.time });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 font-[Outfit]">
      {options.map((opt) => {
        const isActive = selected === opt.value;

        return (
          <div
            key={opt.value}
            onClick={() => handleClick(opt)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
          >
            <img
              src={opt.img}
              alt={opt.title}
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />

            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{opt.title}</h3>
                
                {/* Affichage harmonisé des mentions tarifaires - EN BLEU */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-[#0049ac]">
                    {opt.price} €
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-3">{opt.desc}</p>
              
              <p className="text-xs text-gray-400 mb-3">Durée estimée : {opt.time} min</p>

              <div className="mt-3 sm:mt-4">
                <span
                  className={`inline-block px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-300
                    ${isActive
                      ? "bg-[#0049ac] text-white"
                      : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
                >
                  {isActive ? "Sélectionné" : "Choisir"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AspirationStep;
