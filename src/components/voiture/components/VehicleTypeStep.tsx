import React, { useEffect } from "react";

interface CarcleanStepProps {
  selected: string | undefined;
  onSelect: (data: { step: string; value: string; price: number | string; time: number | null }) => void;
}

const categories = [
  {
    id: "citadine",
    label: "Citadine",
    desc: "Petite voiture urbaine",
    price: 0,
    time: 0,
    img: "/voiture/type/citadine.jpg",
  },
  {
    id: "berline",
    label: "Berline / Break",
    desc: "Voiture spacieuse et confortable",
    price: 10,
    time: 15,
    img: "/voiture/type/berline.jpg",
  },
  {
    id: "suv",
    label: "SUV / 4x4",
    desc: "Gros gabarit, intérieur volumineux",
    price: 15,
    time: 15,
    img: "/voiture/type/suv.jpg",
  },
  {
    id: "7places",
    label: "7 places",
    desc: "Véhicule familial ou monospace",
    price: 20,
    time: 30,
    img: "/voiture/type/7 Places.jpg",
  },
  {
    id: "utilitaire",
    label: "Utilitaire",
    desc: "Véhicule de travail, gros volume",
    price: 15,
    time: 15,
    img: "/voiture/type/utilitaire.jpg",
  },
];

const horsGabarit = {
  id: "horsgabarit",
  label: "Hors de ces gabarits",
  desc: "Véhicules particuliers ou très grands formats",
  price: "Sur devis",
  time: null,
  img: "/voiture/type/horsgabarit.jpg"
};

const CarcleanStep: React.FC<CarcleanStepProps> = ({ selected, onSelect }) => {
  // Scroll vers la section contact
  const handleHorsGabaritClick = () => {
    onSelect({
      step: "Type de véhicule",
      value: horsGabarit.label,
      price: 0,
      time: 0,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 font-[Outfit]">
      {categories.map((veh) => {
        const isActive = selected === veh.label;
        return (
          <div
            key={veh.id}
            onClick={() => onSelect({
              step: "Type de véhicule",
              value: veh.label,
              price: veh.price,
              time: veh.time,
            })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect({
              step: "Type de véhicule",
              value: veh.label,
              price: veh.price,
              time: veh.time,
            })}
            aria-pressed={isActive}
            className={`flex flex-col h-full rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.015] shadow-sm hover:shadow-md
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}
            `}
          >
            <img
              src={veh.img}
              alt={veh.label}
              className="w-full h-48 sm:h-52 lg:h-56 object-cover"
            />

            <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{veh.label}</h3>
                <span className="text-[#0049ac] font-bold text-sm sm:text-base lg:text-lg">
                  {veh.price > 0 ? `+${veh.price}€` : "Inclus"}
                </span>
              </div>

              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 leading-relaxed">{veh.desc}</p>
              <p className="text-xs sm:text-sm text-gray-400">Durée : {veh.time} min</p>

              <div className="mt-auto pt-4 sm:pt-5">
                <button
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 min-h-[48px] sm:min-h-[52px]
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
      {/* Carte spéciale Hors de ces gabarits */}
      <div
        key={horsGabarit.id}
        onClick={handleHorsGabaritClick}
        role="button"
        tabIndex={0}
        aria-pressed={selected === horsGabarit.label}
        className={`flex flex-col h-full rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.015] shadow-sm hover:shadow-md
          ${selected === horsGabarit.label ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}
        `}
      >
        <img
          src={horsGabarit.img}
          alt={horsGabarit.label}
          className="w-full h-48 sm:h-52 lg:h-56 object-cover"
        />
        <div className="flex flex-col flex-1 p-4 sm:p-5 lg:p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">{horsGabarit.label}</h3>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-[#0049ac] text-white text-xs sm:text-sm font-semibold shadow">
              Sur devis
            </span>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 leading-relaxed">{horsGabarit.desc}</p>
          <div className="mt-auto pt-4 sm:pt-5">
            <button
              className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 min-h-[48px] sm:min-h-[52px]
                ${selected === horsGabarit.label
                  ? "bg-[#0049ac] text-white"
                  : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}
              `}
              onClick={e => { e.stopPropagation(); handleHorsGabaritClick(); }}
            >
              {selected === horsGabarit.label ? "Sélectionné" : "Choisir"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarcleanStep;
