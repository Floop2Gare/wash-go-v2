import React, { useState, useEffect } from "react";

interface TextileMatelasSizeStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string;
}

const matelasSizes = [
  {
    value: "Matelas 1 place",
    title: "Matelas 1 place",
    subtitle: "90 cm = 1 personne",
    dimensions: "90 x 190 cm",
    price: 30,
    time: 45,
    desc: "Nettoyage en profondeur de votre matelas une personne",
  },
  {
    value: "Matelas 1,5 place",
    title: "Matelas 1,5 place", 
    subtitle: "120 cm = 1 à 2 personnes",
    dimensions: "120 x 190 cm",
    price: 40,
    time: 60,
    desc: "Matelas intermédiaire, idéal pour une personne avec plus d'espace",
  },
  {
    value: "Matelas 2 places",
    title: "Matelas 2 places",
    subtitle: "140 cm = 2 personnes",
    dimensions: "140 x 190 cm", 
    price: 50,
    time: 75,
    desc: "Matelas double standard pour un couple",
  },
  {
    value: "Matelas King Size",
    title: "Matelas King Size",
    subtitle: "180 cm = 2 personnes (grand confort)",
    dimensions: "180 x 200 cm",
    price: 60,
    time: 90,
    desc: "Matelas extra-large pour un confort maximal",
  },
];

const TextileMatelasSizeStep: React.FC<TextileMatelasSizeStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (size: typeof matelasSizes[0]) => {
    setSelected(size.value);
    onSelect({ step: "Taille du matelas", value: size.value, price: size.price, time: size.time });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {matelasSizes.map((size) => {
        const isActive = selected === size.value;

        return (
          <div
            key={size.value}
            onClick={() => handleClick(size)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 hover:scale-[1.02] ${
              isActive ? "border-[#0049ac] shadow-lg" : "border-gray-200 hover:border-[#0049ac]/30"
            }`}
          >
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{size.title}</h3>
                <div className="text-sm font-medium text-[#0049ac] mb-2">
                  {size.subtitle}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Dimensions : {size.dimensions}
                </div>
                
                {/* Affichage du prix en bleu standard */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-[#0049ac]">
                    {size.price} €
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{size.desc}</p>
              
              <p className="text-xs text-gray-400 mb-3">Durée estimée : {size.time} min</p>

              <div className="mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300 ${
                    isActive
                      ? "bg-[#0049ac] text-white"
                      : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"
                  }`}
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

export default TextileMatelasSizeStep; 