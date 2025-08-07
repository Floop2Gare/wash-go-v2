import React from "react";

interface CanapeTypeStepProps {
  selected: string | undefined;
  onSelect: (data: { step: string; value: string; price: number; time: number }) => void;
}

const formules = [
  {
    id: "2 places",
    label: "2 places",
    desc: "Petit canapé 2 places",
    price: 40,
    time: 30,
    img: "/canapé/2places.jpg",
  },
  {
    id: "3 places",
    label: "3 places",
    desc: "Canapé 3 places",
    price: 50,
    time: 45,
    img: "/canapé/3places.jpg",
  },
  {
    id: "4 places",
    label: "4 places",
    desc: "Grand canapé 4 places",
    price: 60,
    time: 60,
    img: "/canapé/4places.jpg",
  },
  {
    id: "5 et +",
    label: "5 places et +",
    desc: "Très grand canapé ou d'angle",
    price: 70,
    time: 75,
    img: "/canapé/5places.jpg",
  },
];

const CanapeTypeStep: React.FC<CanapeTypeStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 font-[Outfit]">
      {formules.map((formule) => {
        const isActive = selected === formule.label;
        return (
          <div
            key={formule.id}
            onClick={() => onSelect({
              step: "Nombre de places",
              value: formule.label,
              price: formule.price,
              time: formule.time,
            })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect({
              step: "Nombre de places",
              value: formule.label,
              price: formule.price,
              time: formule.time,
            })}
            aria-pressed={isActive}
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
          >
            <img
              src={formule.img}
              alt={formule.label}
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />

            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{formule.label}</h3>
                
                {/* Affichage harmonisé des mentions tarifaires - EN BLEU */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-[#0049ac]">
                    {formule.price} €
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-3">{formule.desc}</p>
              
              <p className="text-xs text-gray-400 mb-3">Durée estimée : {formule.time} min</p>

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

export default CanapeTypeStep;
