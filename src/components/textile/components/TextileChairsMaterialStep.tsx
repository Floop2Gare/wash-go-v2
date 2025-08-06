import React, { useState, useEffect } from "react";

interface TextileChairsMaterialStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string;
}

const materials = [
  {
    value: "Tissu",
    title: "Tissu",
    desc: "Nettoyage standard pour tissus classiques",
    price: 0,
    time: 0,
    img: "/canapé/tissu.jpg",
  },
  {
    value: "Velours",
    title: "Velours",
    desc: "Traitement spécialisé pour velours délicat",
    price: 3,
    time: 5,
    img: "/canapé/tissu.jpg",
  },
  {
    value: "Coton",
    title: "Coton",
    desc: "Traitement doux pour coton naturel",
    price: 1,
    time: 5,
    img: "/canapé/tissu.jpg",
  },
  {
    value: "Alcantara",
    title: "Alcantara",
    desc: "Nettoyage premium pour Alcantara",
    price: 5,
    time: 8,
    img: "/canapé/alcantara.jpg",
  },
  {
    value: "Cuir",
    title: "Cuir",
    desc: "Traitement spécialisé pour cuir véritable",
    price: 8,
    time: 10,
    img: "/canapé/cuir.jpg",
  },
  {
    value: "Autre",
    title: "Autre",
    desc: "Matière spécifique à évaluer",
    price: 0,
    time: 0,
    img: "/canapé/tissu.jpg",
  },
];

const TextileChairsMaterialStep: React.FC<TextileChairsMaterialStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (material: typeof materials[0]) => {
    setSelected(material.value);
    onSelect({ 
      step: "Matière des chaises", 
      value: material.value, 
      price: material.price, 
      time: material.time 
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {materials.map((material) => {
        const isActive = selected === material.value;

        return (
          <div
            key={material.value}
            onClick={() => handleClick(material)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-all duration-300 border-2 hover:scale-[1.02] ${
              isActive ? "border-[#0049ac] shadow-lg" : "border-gray-200 hover:border-[#0049ac]/30"
            }`}
          >
            <img
              src={material.img}
              alt={material.title}
              className="w-full h-32 sm:h-40 object-cover"
            />

            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{material.title}</h3>
                
                {/* Affichage du prix supplémentaire */}
                {material.price > 0 && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-200">
                      +{material.price} € / chaise
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">{material.desc}</p>
              
              {material.time > 0 && (
                <p className="text-xs text-gray-400 mb-3">Temps supplémentaire : +{material.time} min / chaise</p>
              )}

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

export default TextileChairsMaterialStep;