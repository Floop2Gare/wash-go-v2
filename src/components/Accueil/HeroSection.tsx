import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onCTAClick: () => void;
  onContactClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick, onContactClick }) => {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 text-white text-center"
      style={{ backgroundImage: "url('accueil/nousacceuil.svg')" }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6 sm:space-y-8 px-4">
        <img
          src="/logo/logophrase.svg"
          alt="Logo Wash&GO"
          className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-4 sm:space-y-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
            La <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Propreté</span> qui vient à vous !
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
            Un nettoyage professionnel, rapide et efficace à Fuveau et ses alentours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={onCTAClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-sm sm:text-base"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
              <span className="relative z-10 flex items-center space-x-2">
                <span>Découvrez nos Prestations</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>

            {onContactClick && (
              <motion.button
                onClick={onContactClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-transparent border-2 border-white shadow-lg group transition-all duration-300 hover:bg-white hover:text-gray-900 text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Zone d'intervention & Contact</span>
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
