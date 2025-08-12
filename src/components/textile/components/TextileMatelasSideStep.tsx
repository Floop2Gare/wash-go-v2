import React, { useState, useEffect } from "react";

interface TextileMatelasSideStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number; discount?: number }) => void;
  selected?: string;
  basePrice?: number;
  baseTime?: number;
}

const TextileMatelasSideStep: React.FC<TextileMatelasSideStepProps> = ({ 
  onSelect, 
  selected: parentSelected, 
  basePrice = 0, 
  baseTime = 0 
}) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  // Calculer les prix et durées selon la nouvelle logique
  const matelasSides = [
    {
      value: "Recto uniquement",
      title: "Recto uniquement",
      subtitle: "Nettoyage d'un seul côté",
      price: basePrice,
      time: baseTime,
      desc: "Nettoyage professionnel du côté visible du matelas",
    },
    {
      value: "Verso uniquement",
      title: "Verso uniquement",
      subtitle: "Nettoyage du côté caché",
      price: basePrice,
      time: baseTime,
      desc: "Nettoyage professionnel du côté caché du matelas",
    },
    {
      value: "Recto + verso",
      title: "Recto + verso",
      subtitle: "Nettoyage complet avec réduction",
      price: Math.round((basePrice * 2) * 0.9), // (prix de base × 2) - 10%
      time: baseTime * 2, // durée de base × 2
      originalPrice: basePrice * 2, // Prix avant réduction pour affichage
      discount: 10,
      desc: "Nettoyage complet des deux côtés avec une réduction de 10% sur le prix total",
    },
  ];

  const handleClick = (side: typeof matelasSides[0]) => {
    setSelected(side.value);
    onSelect({ 
      step: "Côté du matelas", 
      value: side.value, 
      price: side.price, 
      time: side.time,
      discount: side.discount 
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
      {matelasSides.map((side) => {
        const isActive = selected === side.value;

        return (
          <div
            key={side.value}
            onClick={() => handleClick(side)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 hover:scale-[1.02] ${
              isActive ? "border-[#0049ac] shadow-lg" : "border-gray-200 hover:border-[#0049ac]/30"
            }`}
          >
            <div className="p-4 sm:p-5">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">{side.title}</h3>
                <div className="text-sm sm:text-base font-medium text-[#0049ac] mb-2">
                  {side.subtitle}
                </div>
                
                {/* Affichage du prix */}
                <div className="mb-2">
                  {side.value === "Recto + verso" && side.originalPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-[#0049ac]">
                        {side.price} €
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {side.originalPrice} €
                      </span>
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        -{side.discount}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg sm:text-xl font-bold text-[#0049ac]">
                      {side.price} €
                    </span>
                  )}
                </div>
                
                {/* Affichage de la durée */}
                <div className="text-xs text-gray-500 mb-2">
                  Durée estimée : {side.time} min
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{side.desc}</p>

              <div className="mt-4 sm:mt-5">
                <span
                  className={`inline-block px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300 ${
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

export default TextileMatelasSideStep;
