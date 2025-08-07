import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TextileTapisSurfaceStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number; surface: number; discount?: number; originalPrice?: number }) => void;
  selected?: { longueur: number; largeur: number; surface: number; price: number; time: number } | null;
}

const TextileTapisSurfaceStep: React.FC<TextileTapisSurfaceStepProps> = ({ onSelect, selected }) => {
  const [longueur, setLongueur] = useState<number>(selected?.longueur || 0);
  const [largeur, setLargeur] = useState<number>(selected?.largeur || 0);
  const [isValid, setIsValid] = useState(false);

  // Fonction de calcul de la remise dégressive
  const calculateDiscount = (surface: number): { discount: number; discountPercentage: number } => {
    if (surface >= 15) {
      return { discount: 30, discountPercentage: 30 };
    } else if (surface >= 10) {
      return { discount: 20, discountPercentage: 20 };
    } else if (surface >= 5) {
      return { discount: 10, discountPercentage: 10 };
    } else {
      return { discount: 0, discountPercentage: 0 };
    }
  };

  // Calculs automatiques
  const surface = (longueur && largeur) ? (longueur * largeur) / 10000 : 0;
  const basePrice = 5; // 5€ par m²
  const originalPrice = surface * basePrice;
  const { discount, discountPercentage } = calculateDiscount(surface);
  const discountedPrice = originalPrice * (1 - discount / 100);
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
        price: discountedPrice,
        time: time,
        surface: parseFloat(surfaceFormatted),
        discount: discount,
        originalPrice: originalPrice
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

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prix unitaire :</span>
                  <span className="text-lg font-bold text-[#0049ac]">5 € / m²</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between items-center bg-green-50 rounded-lg p-3">
                    <span className="text-sm text-gray-600">Remise ({discountPercentage}%) :</span>
                    <span className="text-lg font-bold text-green-600">-{(originalPrice - discountedPrice).toFixed(2)} €</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prix total :</span>
                  <span className="text-xl font-semibold text-[#0049ac]">
                    {discount > 0 ? (
                      <span>
                        <span className="line-through text-gray-400 mr-2">{originalPrice.toFixed(2)} €</span>
                        {discountedPrice.toFixed(2)} €
                      </span>
                    ) : (
                      `${originalPrice.toFixed(2)} €`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Durée estimée :</span>
                  <span className="text-xl font-semibold text-orange-600">
                    ≈ {time} min
                  </span>
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

      {/* Information sur la tarification dégressive */}
      {isValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
        >
          <div className="text-center">
            <h4 className="text-sm font-semibold text-blue-800 mb-3">💡 Tarification dégressive</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-lg p-2 border border-blue-100">
                <span className="font-medium text-blue-700">0-4.99 m²</span>
                <div className="text-gray-600">Tarif plein</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                <span className="font-medium text-green-700">5-9.99 m²</span>
                <div className="text-green-600">-10%</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                <span className="font-medium text-green-700">10-14.99 m²</span>
                <div className="text-green-600">-20%</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                <span className="font-medium text-green-700">15+ m²</span>
                <div className="text-green-600">-30%</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
            {discount > 0 && ` (${discountPercentage}% de remise)`}
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