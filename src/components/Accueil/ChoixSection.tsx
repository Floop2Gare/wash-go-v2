import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const options = [
  {
    label: 'Véhicule',
    path: '/voitures',
    image: '/accueil/voiture.svg',
  },
  {
    label: 'Canapé',
    path: '/canapes',
    image: '/accueil/canape.svg',
  },
  {
    label: 'Textiles',
    path: '/textile',
    image: '/accueil/canape.svg', // Réutilisation temporaire de l'image canapé
  },
];

const ChoixSection: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-100" id="choix-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 px-2">
          Que souhaitez-vous faire ?
        </h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl lg:max-w-none mx-auto">
          {options.map(({ label, path, image, description }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleClick(path)}
              className="cursor-pointer bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
            >
              <img
                src={image}
                alt={`Icône ${label}`}
                className="h-32 sm:h-36 md:h-42 w-auto mb-4 sm:mb-6 object-contain scale-110"
              />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">{label}</h3>
              {description && (
                <p className="text-sm sm:text-base text-gray-600 text-center px-2">
                  {description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoixSection;
