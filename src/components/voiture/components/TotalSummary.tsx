import React, { useState } from "react";
import { Clock, Euro } from "lucide-react";

interface TotalSummaryProps {
  price: number;
  time: number;
  onReset?: () => void;
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h${m.toString().padStart(2, "0")}`;
  if (h) return `${h}h`;
  return `${m} min`;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({ price, time, onReset }) => {
  const [open, setOpen] = useState(true);
  const formattedTime = formatTime(time);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block fixed bottom-4 left-4 z-50 animate-fade-in">
        <div className="bg-white/90 backdrop-blur-md border border-[#0049ac] shadow-lg rounded-xl px-4 py-3 w-60">
          <h4 className="text-[#0049ac] font-semibold text-sm mb-3">Résumé</h4>
          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <Euro size={16} className="text-[#0049ac]" />
              <span>Prix : <span className="font-bold text-[#0049ac]">{price} €</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#0049ac]" />
              <span>Durée : <span className="font-bold text-[#0049ac]">{formattedTime}</span></span>
            </div>
            {/* Lien Réinitialiser ma demande */}
            <div
              className="mt-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition select-none"
              onClick={() => { if (typeof onReset === 'function') onReset(); }}
              tabIndex={0}
              role="button"
              aria-label="Réinitialiser ma demande"
            >
              ↺ Réinitialiser ma demande
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        {open ? (
          <div className="bg-white/90 backdrop-blur-md border border-[#0049ac] shadow-md rounded-xl px-4 py-2 w-[85vw] max-w-xs flex items-center justify-between animate-slide-up">
            <div className="text-xs text-gray-700 space-y-1">
              <div className="flex items-center gap-2">
                <Euro size={14} className="text-[#0049ac]" />
                <span><strong className="text-[#0049ac]">{price} €</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#0049ac]" />
                <span><strong className="text-[#0049ac]">{formattedTime}</strong></span>
              </div>
              {/* Lien Réinitialiser ma demande (mobile) */}
              <div
                className="mt-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer transition select-none"
                onClick={() => { if (typeof onReset === 'function') onReset(); }}
                tabIndex={0}
                role="button"
                aria-label="Réinitialiser ma demande"
              >
                ↺ Réinitialiser ma demande
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-4 text-[#0049ac] text-lg font-bold">×</button>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-[#0049ac] text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow-sm"
          >
            Voir le résumé
          </button>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out both;
        }
      `}</style>
    </>
  );
};

export default TotalSummary;
