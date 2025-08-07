import React, { useState, useEffect } from "react";

interface TextileTypeStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string;
}

const options = [
  {
    value: "Matelas",
    title: "Matelas",
    desc: "Nettoyage professionnel de votre matelas. Élimination des acariens, taches et odeurs pour un sommeil sain.",
    price: null,
    time: 0,
    pricingInfo: "À voir selon la demande",
    img: "/textile/matelas/matelas.png",
  },
  {
    value: "Chaises",
    title: "Chaises",
    desc: "Restauration de vos chaises en tissu. Nettoyage en profondeur pour retrouver leur éclat d'origine.",
    price: 10,
    time: 15,
    pricingInfo: "10 € / chaise",
    img: "/textile/chaises/chaise.png",
  },
  {
    value: "Tapis",
    title: "Tapis",
    desc: "Nettoyage spécialisé de vos tapis et moquettes. Traitement anti-taches et désinfection complète.",
    price: 5,
    time: 10,
    pricingInfo: "5 € / m²",
    img: "/textile/tapis/tapis.jpg",
  },
];

const TextileTypeStep: React.FC<TextileTypeStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (opt: typeof options[0]) => {
    setSelected(opt.value);
    onSelect({ step: "Type de textile", value: opt.value, price: opt.price || 0, time: opt.time });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 font-[Outfit]">
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
                
                {/* Affichage harmonisé des mentions tarifaires - TOUS EN BLEU */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-[#0049ac]">
                    {opt.pricingInfo}
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

export default TextileTypeStep; 