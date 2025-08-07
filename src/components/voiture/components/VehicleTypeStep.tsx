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
    price: 10,
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
    price: 10,
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
            className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
              ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
          >
            <img
              src={veh.img}
              alt={veh.label}
              className="w-full h-32 sm:h-40 md:h-48 object-cover"
            />

            <div className="p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{veh.label}</h3>
                
                {/* Affichage harmonisé des mentions tarifaires - TOUS EN BLEU */}
                <div className="mb-2">
                  {veh.price > 0 ? (
                    <span className="text-xl font-bold text-[#0049ac]">
                      +{veh.price} €
                    </span>
                  ) : (
                    <span className="text-xl font-bold text-[#0049ac]">
                      Inclus
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mb-3">{veh.desc}</p>
              
              <p className="text-xs text-gray-400 mb-3">Durée estimée : {veh.time} min</p>

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
      {/* Carte spéciale Hors de ces gabarits */}
      <div
        key={horsGabarit.id}
        onClick={handleHorsGabaritClick}
        role="button"
        tabIndex={0}
        aria-pressed={selected === horsGabarit.label}
        className={`cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform duration-300 border-2 hover:scale-[1.015]
          ${selected === horsGabarit.label ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/30"}`}
      >
        <img
          src={horsGabarit.img}
          alt={horsGabarit.label}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"
        />
        <div className="p-3 sm:p-4 md:p-5">
          <div className="mb-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{horsGabarit.label}</h3>
            
            {/* Affichage harmonisé des mentions tarifaires - EN BLEU */}
            <div className="mb-2">
              <span className="text-xl font-bold text-[#0049ac]">
                Sur devis
              </span>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-3">{horsGabarit.desc}</p>
          
          <div className="mt-3 sm:mt-4">
            <span
              className={`inline-block px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors duration-300
                ${selected === horsGabarit.label
                  ? "bg-[#0049ac] text-white"
                  : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
            >
              {selected === horsGabarit.label ? "Sélectionné" : "Choisir"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarcleanStep;
