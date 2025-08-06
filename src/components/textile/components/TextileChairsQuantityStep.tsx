import React, { useState, useEffect } from "react";

interface TextileChairsQuantityStepProps {
  onSelect: (data: { step: string; value: string; price: number; time: number; quantity: number }) => void;
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
      const totalPrice = quantity * 10;
      const totalTime = quantity * 15;
      onSelect({ 
        step: "Nombre de chaises", 
        value: quantity.toString(), 
        price: totalPrice, 
        time: totalTime,
        quantity: quantity
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Nombre de chaises</h3>
          <p className="text-gray-600">Sélectionnez le nombre de chaises à nettoyer</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de chaises à nettoyer
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg font-semibold text-center focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] transition-colors"
              placeholder="1"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex justify-between items-center text-sm text-blue-800 mb-2">
              <span>Prix unitaire :</span>
              <span className="font-semibold">10 € / chaise</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-blue-900">
              <span>Prix total :</span>
              <span>{quantity * 10} €</span>
            </div>
            <div className="flex justify-between items-center text-sm text-blue-700 mt-1">
              <span>Durée estimée :</span>
              <span>{quantity * 15} min</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Prix : 10 € par chaise. Vous pouvez sélectionner jusqu'à 20 chaises.
          </p>

          <button
            onClick={handleValidate}
            className="w-full bg-gradient-to-r from-[#0049ac] to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-[#0049ac] transition-all duration-300 transform hover:scale-105"
          >
            Valider - {quantity} {quantity === 1 ? 'chaise sélectionnée' : 'chaises sélectionnées'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextileChairsQuantityStep;