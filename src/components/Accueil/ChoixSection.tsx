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
    image: '/textile/choix.png', // Utilisation de l'image textile
  },
];

const ChoixSection: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-100" id="choix-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 px-2">
          Que souhaitez-vous faire ?
        </h2>
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl lg:max-w-none mx-auto">
          {options.map(({ label, path, image }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleClick(path)}
              className="cursor-pointer bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
            >
              <img
                src={image}
                alt={`Icône ${label}`}
                className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto mb-3 sm:mb-4 md:mb-6 object-contain scale-110"
              />
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 text-center">{label}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoixSection;
