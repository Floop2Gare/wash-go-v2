import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TextileTapisSurfaceStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number; surface: number }) => void;
  selected?: { longueur: number; largeur: number; surface: number; price: number; time: number } | null;
}

const TextileTapisSurfaceStep: React.FC<TextileTapisSurfaceStepProps> = ({ onSelect, selected }) => {
  const [longueur, setLongueur] = useState<number>(selected?.longueur || 0);
  const [largeur, setLargeur] = useState<number>(selected?.largeur || 0);
  const [isValid, setIsValid] = useState(false);

  // Calculs automatiques
  const surface = (longueur && largeur) ? (longueur * largeur) / 10000 : 0;
  const price = surface * 5; // 5€ par m²
  const time = Math.ceil(surface * 10); // 10 min par m²

  useEffect(() => {
    const valid = longueur > 0 && largeur > 0;
    setIsValid(valid);
    // Suppression de la validation automatique pour permettre à l'utilisateur de voir le résultat
  }, [longueur, largeur]);

  const handleLongueurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLongueur(value);
  };

  const handleLargeurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLargeur(value);
  };

  const handleValidate = () => {
    if (isValid) {
      const surfaceFormatted = surface.toFixed(2);
      const dataToSend = {
        step: "Surface du tapis",
        value: `${longueur} cm x ${largeur} cm = ${surfaceFormatted} m²`,
        price: price,
        time: time,
        surface: parseFloat(surfaceFormatted),
      };

      onSelect(dataToSend);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Titre et description */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Dimensions de votre tapis
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Indiquez les dimensions pour calculer automatiquement le prix
        </p>
      </div>

      {/* Formulaire de dimensions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border-2 border-gray-200"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Longueur */}
          <div>
            <label htmlFor="longueur" className="block text-sm font-medium text-gray-700 mb-2">
              Longueur (cm)
            </label>
            <input
              type="number"
              id="longueur"
              value={longueur || ''}
              onChange={handleLongueurChange}
              placeholder="Ex: 200"
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] transition-colors"
            />
          </div>

          {/* Largeur */}
          <div>
            <label htmlFor="largeur" className="block text-sm font-medium text-gray-700 mb-2">
              Largeur (cm)
            </label>
            <input
              type="number"
              id="largeur"
              value={largeur || ''}
              onChange={handleLargeurChange}
              placeholder="Ex: 150"
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] transition-colors"
            />
          </div>
        </div>

        {/* Calculs automatiques */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
          >
            <div className="text-center space-y-4">
              <div>
                <span className="text-sm text-gray-600">Surface calculée :</span>
                <p className="text-2xl font-bold text-[#0049ac]">
                  {surface.toFixed(2)} m²
                </p>
              </div>

              <div className="flex justify-center items-center space-x-6">
                <div className="text-center">
                  <span className="text-sm text-gray-600">Prix estimé :</span>
                  <p className="text-xl font-semibold text-[#0049ac]">
                    {price.toFixed(2)} €
                  </p>
                </div>
                
                <div className="text-center">
                  <span className="text-sm text-gray-600">Durée estimée :</span>
                  <p className="text-xl font-semibold text-orange-600">
                    ≈ {time} min
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                Calcul automatique : {longueur} cm × {largeur} cm ÷ 10 000 = {surface.toFixed(2)} m²
              </div>
            </div>
          </motion.div>
        )}

        {/* Message d'information */}
        {!isValid && (
          <div className="text-center text-gray-500 text-sm">
            Remplissez les deux dimensions pour voir le calcul automatique
          </div>
        )}
      </motion.div>

              {/* Bouton de validation manuel */}
      {isValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={handleValidate}
            className="inline-flex items-center px-6 py-3 bg-[#0049ac] text-white rounded-lg font-semibold text-sm hover:bg-[#003d91] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Valider les dimensions
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Cliquez pour passer à l'étape suivante
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TextileTapisSurfaceStep;