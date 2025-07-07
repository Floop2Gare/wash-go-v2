// components/Voiture/SummaryBar.tsx
import React from "react";

interface SummaryBarProps {
  totalPrice: number;
  totalTime: number;
}

const SummaryBar: React.FC<SummaryBarProps> = ({ totalPrice, totalTime }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white border shadow-lg rounded-xl px-6 py-4 flex flex-col text-sm text-gray-700 max-w-[240px] w-full">
      <div className="flex justify-between mb-1">
        <span>Prix total</span>
        <strong className="text-blue-700">{totalPrice} €</strong>
      </div>
      <div className="flex justify-between">
        <span>Durée estimée</span>
        <strong className="text-blue-700">{totalTime} min</strong>
      </div>
    </div>
  );
};

export default SummaryBar;
