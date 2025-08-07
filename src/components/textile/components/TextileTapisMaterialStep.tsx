import React, { useState, useEffect } from "react";

interface TextileTapisMaterialStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
  selected?: string;
}

const options = [
  {
    value: "Tissu",
    title: "Tissu",
    desc: "Idéal pour les tapis en tissu classique. Le service inclut l'ensemble des traitements standards pour un résultat optimal et durable.",
    price: 0,
    time: 0,
    img: "/textile/tapis/tissu.jpg",
  },
  {
    value: "Laine",
    title: "Laine",
    desc: "Fibre naturelle, confortable et durable. Traitement doux adapté aux tapis en laine.",
    price: 0,
    time: 0,
    img: "/textile/tapis/coton.jpg",
  },
  {
    value: "Synthétique",
    title: "Synthétique",
    desc: "Matière synthétique résistante. Traitement adapté pour une durabilité optimale.",
    price: 0,
    time: 0,
    img: "/textile/tapis/velours.jpg",
  },
  {
    value: "Cuir",
    title: "Cuir",
    desc: "Une attention particulière est portée à l'hydratation du cuir, en complément des soins habituels.",
    price: 0,
    time: 0,
    img: "/textile/tapis/cuir.webp",
  },
  {
    value: "Alcantara",
    title: "Alcantara",
    desc: "Matière délicate nécessitant un traitement ajusté. Le nettoyage est adapté selon la texture et la sensibilité du revêtement.",
    price: 0,
    time: 0,
    img: "/textile/tapis/alcantara.jpg",
  },
  {
    value: "Autre",
    title: "Autre",
    desc: "Matière spécifique non listée. Nous adapterons le traitement selon vos besoins.",
    price: 0,
    time: 0,
    img: "/textile/tapis/autres.jpg",
  },
];

const TextileTapisMaterialStep: React.FC<TextileTapisMaterialStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [selected, setSelected] = useState<string | null>(parentSelected ?? null);

  useEffect(() => {
    setSelected(parentSelected ?? null);
  }, [parentSelected]);

  const handleClick = (material: typeof options[0]) => {
    setSelected(material.value);
    onSelect({ step: "Matière du tapis", value: material.value, price: material.price, time: material.time });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 font-[Outfit]">
      {options.map((material) => {
        const isActive = selected === material.value;

        return (
          <div
            key={material.value}
            onClick={() => handleClick(material)}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
          >
            <img
              src={material.img}
              alt={material.title}
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />

            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{material.title}</h3>
                
                {/* Affichage harmonisé des mentions tarifaires - EN BLEU */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-[#0049ac]">
                    Inclus
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-3">{material.desc}</p>
              
              <p className="text-xs text-gray-400 mb-3">Durée estimée : {material.time} min</p>

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

export default TextileTapisMaterialStep;
