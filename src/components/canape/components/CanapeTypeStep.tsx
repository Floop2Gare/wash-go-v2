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
            className={`flex flex-col h-full rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}
            `}
          >
            <img
              src={formule.img}
              alt={formule.label}
              className="w-full h-40 sm:h-48 object-cover"
            />

            <div className="flex flex-col flex-1 p-4 sm:p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{formule.label}</h3>
                <span className="text-[#0049ac] font-bold text-sm sm:text-base">
                  {formule.price}€
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-1">{formule.desc}</p>
              <p className="text-xs text-gray-400">Durée : {formule.time} min</p>

              {formule.id === "4 places" && (
                <div className="mt-2">
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-yellow-400 text-white text-xs font-semibold shadow">
                    Populaire
                  </span>
                </div>
              )}

              <div className="mt-auto pt-3 sm:pt-4">
                <button
                  className={`w-full px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300
                    ${isActive
                      ? "bg-[#0049ac] text-white"
                      : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}
                  `}
                >
                  {isActive ? "Sélectionné" : "Choisir"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CanapeTypeStep;
