import React, { useState, useEffect } from "react";

interface FabricTypeStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string;
}

const options = [
  {
    value: "Tissu",
    title: "Tissu",
    desc: "Idéal pour les tissus classiques. Le service inclut l'ensemble des traitements standards pour un résultat optimal et durable.",
    price: 0,
    time: 0,
    img: "/canapé/canape.jpg",
  },
  {
    value: "Cuir",
    title: "Cuir",
    desc: "Une attention particulière est portée à l'hydratation du cuir, en complément des soins habituels. Convient parfaitement aux salons haut de gamme.",
    price: 0,
    time: 0,
    img: "/canapé/canape.jpg",
  },
  {
    value: "Alcantara",
    title: "Alcantara",
    desc: "Matière délicate nécessitant un traitement ajusté. Le nettoyage est adapté selon la texture et la sensibilité du revêtement.",
    price: 0,
    time: 0,
    img: "/canapé/canape.jpg",
  },
];



const FabricTypeStep: React.FC<FabricTypeStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (opt: typeof options[0]) => {
    setSelected(opt.value);
    onSelect({ step: "Type de tissu", value: opt.value, price: opt.price, time: opt.time });
  };

  return (
    <div className="space-y-8">
      {/* Sélection du type de tissu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{opt.title}</h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">{opt.desc}</p>

                <div className="mt-4">
                  <span
                    className={`inline-block px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-300
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
    </div>
  );
};

export default FabricTypeStep; 