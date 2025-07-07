import React from 'react';
import { Check, ChevronRight, Star } from 'lucide-react';

interface FormuleStepSpecialProps {
  selected: string | undefined;
  onSelect: (formule: string) => void;
}

const formules = [
  {
    id: 'Express',
    name: 'Express',
    price: '30€',
    description: 'Nettoyage de base pour véhicules spéciaux',
    features: ['Aspiration', 'Dépoussiérage', 'Vitres intérieures'],
    popular: false,
  },
  {
    id: 'classique',
    name: 'Classique',
    price: '50€',
    description: 'Nettoyage approfondi pour utilitaires ou vans',
    features: ['Aspiration', 'Dépoussiérage', 'Shampouinage sièges avant'],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '70€',
    description: 'Formule complète pour véhicules de grande taille',
    features: ['Nettoyage complet', 'Traitement odeurs', 'Rénovation plastiques'],
    popular: true,
  },
];

const FormuleStepSpecial: React.FC<FormuleStepSpecialProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {formules.map((formule) => {
        const isSelected = selected === formule.id;

        return (
          <div
            key={formule.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(formule.id)}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(formule.id)}
            aria-pressed={isSelected}
            className={`relative group cursor-pointer rounded-2xl border p-6 transition-all duration-300 focus:outline-none
              ${isSelected
                ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-500 shadow-xl scale-[1.02]'
                : 'bg-white border-gray-200 hover:shadow-md hover:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300'}
            `}
          >
            {isSelected && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow">
                <Check size={16} />
              </div>
            )}

            {formule.popular && (
              <div className="absolute top-4 right-14 bg-yellow-400 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md animate-pulse">
                Populaire
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{formule.name}</h3>
              <p className="text-3xl font-extrabold text-blue-600">{formule.price}</p>
              <p className="text-sm text-gray-600 mt-2">{formule.description}</p>
            </div>

            <ul className="space-y-2 my-6">
              {formule.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-800">
                  <Star size={16} className="text-blue-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(formule.id);
              }}
              className={`w-full flex items-center justify-center gap-2 rounded-lg py-2 font-semibold transition-colors duration-300
                ${isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
              `}
            >
              {isSelected ? 'Sélectionné' : 'Choisir'}
              <ChevronRight size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FormuleStepSpecial;
