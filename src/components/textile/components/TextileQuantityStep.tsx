import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface TextileQuantityStepProps {
  onSelect: (quantity: number) => void;
  selected?: number;
  textileType?: any;
}

export default function TextileQuantityStep({ onSelect, selected = 1, textileType }: TextileQuantityStepProps) {
  const [quantity, setQuantity] = useState(selected);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onSelect(newQuantity);
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(quantity - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      handleQuantityChange(value);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Combien de {textileType?.value?.toLowerCase() || 'textiles'} souhaitez-vous nettoyer ?
        </h3>
        <p className="text-gray-600">
          Sélectionnez la quantité pour calculer votre devis personnalisé
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Quantité
            </span>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`p-2 rounded-lg ${
                  quantity <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <Minus className="w-4 h-4" />
              </motion.button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleInputChange}
                className="w-16 text-center text-lg font-bold text-gray-800 border-2 border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500"
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrement}
                className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Prix unitaire :</span>
              <span className="font-semibold text-gray-800">
                {textileType?.price || 0}€
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temps unitaire :</span>
              <span className="font-semibold text-gray-800">
                ~{textileType?.time || 0} min
              </span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total :</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {(textileType?.price || 0) * quantity}€
                  </div>
                  <div className="text-sm text-gray-500">
                    ~{(textileType?.time || 0) * quantity} min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Prix et durée calculés pour {quantity} {textileType?.value?.toLowerCase() || 'textile(s)'}
          </p>
        </div>
      </div>
    </div>
  );
} 