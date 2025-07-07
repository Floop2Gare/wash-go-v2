// components/Voiture/SeatCleaningStep.tsx
import React from "react";

interface SeatCleaningStepProps {
  selectedZones: string[];
  onToggle: (zoneIds: string[]) => void;
  onContinue?: () => void;
  vehicleType: string | null;
}

const seatOptions = [
  {
    id: "avant",
    title: "Sièges avant",
    price: 20,
    desc: "Restaure les assises les plus utilisées",
    image: "/2d/Voiture/pressing/avant.jpg",
  },
  {
    id: "arriere",
    title: "Sièges arrière",
    price: 20,
    desc: "Idéal pour véhicules familiaux",
    image: "/2d/Voiture/pressing/arriere.jpg",
  },
  {
    id: "coffre",
    title: "Coffre (7 places uniquement)",
    price: 15,
    desc: "Nettoyage de la 3e rangée ou zone de chargement",
    image: "/2d/Voiture/pressing/coffre.jpg",
  },
  {
    id: "aucun",
    title: "Aucun pressing",
    price: 0,
    desc: "Je ne souhaite pas faire de pressing pour cette fois",
    image: "/2d/Voiture/pressing/aucun.svg",
  },
];

export default function SeatCleaningStep({
  selectedZones,
  onToggle,
  onContinue,
  vehicleType,
}: SeatCleaningStepProps) {
  const handleToggle = (id: string) => {
    let updatedSelection: string[] = [];

    if (id === "aucun") {
      updatedSelection = ["aucun"];
    } else {
      if (selectedZones.includes(id)) {
        updatedSelection = selectedZones.filter((z) => z !== id);
      } else {
        updatedSelection = selectedZones
          .filter((z) => z !== "aucun")
          .concat(id);
      }
    }

    onToggle(updatedSelection);
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Choisissez les zones à <span className="text-blue-600">pressing</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {seatOptions.map((opt) => {
          const isSelected = selectedZones.includes(opt.id);
          const isDisabled = opt.id === "coffre" && vehicleType !== "7places";

          return (
            <div
              key={opt.id}
              onClick={() => !isDisabled && handleToggle(opt.id)}
              className={`rounded-xl overflow-hidden border transition duration-200 hover:shadow-md ${
                isDisabled
                  ? "border-gray-100 bg-gray-100 opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "border-blue-600 bg-blue-50 cursor-pointer"
                  : "border-gray-200 cursor-pointer"
              }`}
            >
              <div className="relative h-44">
                <img
                  src={opt.image}
                  alt={opt.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{opt.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{opt.desc}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Supplément : +{opt.price} €
                </p>
                {isSelected && !isDisabled && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    ✔ Zone sélectionnée
                  </p>
                )}
                {isDisabled && (
                  <p className="mt-1 text-sm text-red-500 font-medium">
                    Disponible uniquement pour les 7 places
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {onContinue && (
        <div className="flex justify-end pt-6">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200"
          >
            Continuer
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
