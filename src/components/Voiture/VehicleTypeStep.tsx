// components/Voiture/VehicleTypeStep.tsx
import React from "react";

interface VehicleTypeStepProps {
  selected: string | null;
  onSelect: (value: string) => void;
}

const vehicles = [
  {
    id: "citadine",
    title: "Citadine",
    desc: "Petite voiture urbaine, compacte et facile à entretenir.",
    price: 0,
    image: "/2d/Voiture/citadine.jpg",
  },
  {
    id: "berline",
    title: "Berline",
    desc: "Voiture spacieuse, idéale pour les trajets confortables en ville et sur autoroute.",
    price: 10,
    image: "/2d/Voiture/berline.jpg",
  },
  {
    id: "break",
    title: "Break",
    desc: "Grand coffre, parfaite pour les longs trajets et familles nombreuses.",
    price: 10,
    image: "/2d/Voiture/break.png",
  },
  {
    id: "suv",
    title: "SUV / 4x4",
    desc: "Gros gabarit avec habitacle volumineux.",
    price: 15,
    image: "/2d/Voiture/SUV.avif",
  },
  {
    id: "7places",
    title: "7 places & +",
    desc: "Monospace ou familiale avec sièges supplémentaires.",
    price: 20,
    image: "/2d/Voiture/7 Places.jpg",
  },
  {
    id: "utilitaire",
    title: "Utilitaire",
    desc: "Véhicule de travail ou transport, très grand espace intérieur.",
    price: 15,
    image: "/2d/Voiture/utilitaire.jpg",
  },
];

export default function VehicleTypeStep({ selected, onSelect }: VehicleTypeStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Choisissez votre type de <span className="text-blue-600">véhicule</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((veh) => {
          const isSelected = selected === veh.id;
          return (
            <div
              key={veh.id}
              onClick={() => onSelect(veh.id)}
              className={`rounded-xl overflow-hidden border cursor-pointer transition duration-200 hover:shadow-md ${
                isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              <div className="relative h-44">
                <img
                  src={veh.image}
                  alt={veh.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{veh.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{veh.desc}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Supplément : +{veh.price} €
                </p>
                {isSelected && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    ✔ Sélectionné
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
