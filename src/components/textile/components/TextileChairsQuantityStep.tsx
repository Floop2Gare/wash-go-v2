import React, { useState, useEffect } from "react";

interface TextileChairsQuantityStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number; quantity: number; discount?: number; originalPrice?: number }) => void;
  selected?: string;
}

const TextileChairsQuantityStep: React.FC<TextileChairsQuantityStepProps> = ({ onSelect, selected: parentSelected }) => {
  const [quantity, setQuantity] = useState<number>(parentSelected ? parseInt(parentSelected) : 1);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (parentSelected) {
      setQuantity(parseInt(parentSelected) || 1);
    }
  }, [parentSelected]);

  // Fonction de calcul de la remise dégressive
  const calculateDiscount = (quantity: number): { discount: number; discountPercentage: number } => {
    if (quantity >= 15) {
      return { discount: 30, discountPercentage: 30 };
    } else if (quantity >= 10) {
      return { discount: 20, discountPercentage: 20 };
    } else if (quantity >= 5) {
      return { discount: 10, discountPercentage: 10 };
    } else {
      return { discount: 0, discountPercentage: 0 };
    }
  };

  // Calculs des prix
  const basePrice = 10; // Prix unitaire
  const originalPrice = quantity * basePrice;
  const { discount, discountPercentage } = calculateDiscount(quantity);
  const discountedPrice = originalPrice * (1 - discount / 100);
  const totalTime = quantity * 15;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
      setError("");
    } else if (value > 20) {
      setQuantity(20);
      setError("Le nombre maximum est de 20 chaises");
    } else {
      setQuantity(value);
      setError("");
    }
  };

  const handleValidate = () => {
    if (quantity >= 1 && quantity <= 20) {
      onSelect({ 
        step: "Nombre de chaises", 
        value: quantity.toString(), 
        price: discountedPrice,
        time: totalTime,
        quantity: quantity,
        discount: discount,
        originalPrice: originalPrice
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Nombre de chaises</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Sélectionnez le nombre de chaises à nettoyer</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de chaises à nettoyer
            </label>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleQuantityChange({ target: { value: String(Math.max(1, quantity - 1)) } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0049ac] transition-colors"
              >
                <span className="text-2xl font-medium">-</span>
              </button>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                min="1"
                max="20"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 border-2 border-gray-300 rounded-xl px-2 py-3 text-lg font-semibold text-center focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] transition-colors"
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'textfield',
                  appearance: 'textfield'
                }}
              />
              <button
                onClick={() => handleQuantityChange({ target: { value: String(Math.min(20, quantity + 1)) } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0049ac] transition-colors"
              >
                <span className="text-2xl font-medium">+</span>
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-xs sm:text-sm mt-2 text-center">{error}</p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Prix unitaire :</span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#0049ac]">10 € / chaise</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center bg-green-50 rounded-lg p-2 sm:p-3">
                <span className="text-xs sm:text-sm text-gray-600">Remise ({discountPercentage}%) :</span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">-{(originalPrice - discountedPrice).toFixed(2)} €</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Prix total :</span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#0049ac]">
                {discount > 0 ? (
                  <span>
                    <span className="line-through text-gray-400 mr-2 text-sm sm:text-base">{originalPrice.toFixed(2)} €</span>
                    {discountedPrice.toFixed(2)} €
                  </span>
                ) : (
                  `${originalPrice.toFixed(2)} €`
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Durée estimée :</span>
              <span className="text-xs sm:text-sm text-gray-500">{totalTime} min</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
            <div className="text-center">
              <h4 className="text-xs sm:text-sm font-semibold text-blue-800 mb-2 sm:mb-3">💡 Tarification dégressive</h4>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-blue-100">
                  <span className="font-medium text-blue-700">1-4 chaises</span>
                  <div className="text-gray-600">Tarif plein</div>
                </div>
                <div className="bg-green-50 rounded-lg p-1.5 sm:p-2 border border-green-200">
                  <span className="font-medium text-green-700">5-9 chaises</span>
                  <div className="text-green-600">-10%</div>
                </div>
                <div className="bg-green-50 rounded-lg p-1.5 sm:p-2 border border-green-200">
                  <span className="font-medium text-green-700">10-14 chaises</span>
                  <div className="text-green-600">-20%</div>
                </div>
                <div className="bg-green-50 rounded-lg p-1.5 sm:p-2 border border-green-200">
                  <span className="font-medium text-green-700">15-20 chaises</span>
                  <div className="text-green-600">-30%</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleValidate}
            className="w-full bg-gradient-to-r from-[#0049ac] to-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-600 hover:to-[#0049ac] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Valider - {quantity} {quantity === 1 ? 'chaise sélectionnée' : 'chaises sélectionnées'}
            {discount > 0 && ` (${discountPercentage}% de remise)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextileChairsQuantityStep;