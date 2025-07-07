import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface SpecialVehicleStepProps {
  selected: string | undefined;
  onSelect: (category: string) => void;
}

const categories = [
  {
    id: 'campingcar',
    name: 'Camping-Car',
    description: 'Habitat mobile, grand espace intérieur',
    image: '/2d/campingcar.jpg',
    priceModifier: '+70€',
  },
  {
    id: 'camion',
    name: 'Camion',
    description: 'Véhicule utilitaire lourd',
    image: '/2d/camion.jpg',
    priceModifier: '+80€',
  },
  {
    id: 'vanamenage',
    name: 'Van aménagé',
    description: 'Véhicule habitable de taille moyenne',
    image: '/2d/van.jpg',
    priceModifier: '+60€',
  },
  {
    id: 'bus',
    name: 'Minibus / Bus',
    description: 'Transport collectif, intérieur spacieux',
    image: '/2d/minibus.jpg',
    priceModifier: '+100€',
  },
  {
    id: 'utilitaire35t',
    name: 'Utilitaire 3.5T',
    description: 'Type Iveco Daily ou équivalent',
    image: '/2d/iveco.jpeg', // mets une image adaptée si tu en as une
    priceModifier: '+60€',
  },
];

const SpecialVehicleStep: React.FC<SpecialVehicleStepProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const isSelected = selected === category.id;

        return (
          <div
            key={category.id}
            onClick={() => onSelect(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(category.id)}
            aria-pressed={isSelected}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none
              ${isSelected
                ? 'border-blue-500 shadow-md scale-[1.02]'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'}
            `}
          >
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${category.image})` }}
              aria-label={category.name}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
                  <Check size={16} />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="text-white text-opacity-80">{category.description}</p>
              </div>
            </div>

            <div className="p-4">
              <p className="font-semibold text-blue-600 mb-4">
                Supplément : {category.priceModifier}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(category.id);
                }}
                className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300
                  ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {isSelected ? 'Sélectionné' : 'Choisir'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialVehicleStep;
