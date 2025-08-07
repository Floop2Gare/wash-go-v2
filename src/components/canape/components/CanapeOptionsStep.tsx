import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface CanapeOptionsStepProps {
  onSelect: (data: { step: string; value: string[]; price: number; time: number }) => void;
  nextSectionId?: string;
  selected?: string[];
}

const options = [
  {
    value: "Traitement anti-acariens",
    label: "Traitement anti-acariens",
    price: 10,
    time: 10,
    img: "/canapé/antibac.jpg",
  },
  {
    value: "Détachant renforcé",
    label: "Détachant renforcé",
    price: 10,
    time: 10,
    img: "/canapé/detachant.jpg",
  },
  {
    value: "Parfum & désodorisant",
    label: "Parfum & désodorisant",
    price: 10,
    time: 0,
    img: "/canapé/deo.jpg",
  },
];

const CanapeOptionsStep: React.FC<CanapeOptionsStepProps> = ({ onSelect, nextSectionId, selected = [] }) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleToggle = (val: string) => {
    const newSelected = localSelected.includes(val)
      ? localSelected.filter((v) => v !== val)
      : [...localSelected, val];
    setLocalSelected(newSelected);
  };

  const handleContinue = () => {
    if (!localSelected.length) return;
    setLoading(true);
    const totalPrice = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.price, 0);
    const totalTime = options
      .filter((o) => localSelected.includes(o.value))
      .reduce((sum, o) => sum + o.time, 0);
    
    onSelect({ step: "Options supplémentaires", value: localSelected, price: totalPrice, time: totalTime });
    setTimeout(() => {
      setLoading(false);
      if (nextSectionId) {
        const next = document.getElementById(nextSectionId);
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const handleValidateWithoutOptions = () => {
    if (loading) return;
    setLoading(true);
    
    onSelect({ step: "Options supplémentaires", value: [], price: 0, time: 0 });
    setTimeout(() => {
      setLoading(false);
      if (nextSectionId) {
        const next = document.getElementById(nextSectionId);
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <section className="w-full flex flex-col gap-6 sm:gap-10 font-[Outfit]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {options.map((opt) => {
          const isActive = localSelected.includes(opt.value);
          return (
            <div
              key={opt.value}
              role="button"
              tabIndex={0}
              onClick={() => handleToggle(opt.value)}
              onKeyDown={(e) => e.key === "Enter" && handleToggle(opt.value)}
              aria-pressed={isActive}
              className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-transform duration-300 hover:scale-[1.015] shadow-md
                ${isActive ? "border-[#0049ac]" : "border-gray-200 hover:border-[#0049ac]/40"}`}
            >
              <img
                src={opt.img}
                alt={opt.label}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-5">
                <div className="mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{opt.label}</h3>
                  <span className="text-xl font-bold text-[#0049ac]">+{opt.price} €</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">Durée : {opt.time} min</p>
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-300
                      ${isActive
                        ? "bg-[#0049ac] text-white"
                        : "bg-gray-100 text-[#0049ac] hover:bg-[#0049ac] hover:text-white"}`}
                  >
                    {isActive ? "Sélectionné" : "Choisir"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs sm:text-sm text-gray-700">
        <b>Votre sélection :</b>{" "}
        {localSelected.length ? localSelected.join(", ") : <span className="text-gray-400 italic">Aucune option sélectionnée</span>}
      </div>

      {/* Boutons d'action - Responsive */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!localSelected.length || loading}
          className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-bold text-white bg-[#0049ac] shadow-sm transition-all
            ${!localSelected.length || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
        >
          Valider avec options <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={handleValidateWithoutOptions}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-bold text-[#0049ac] bg-gray-100 shadow-sm transition-all hover:bg-gray-200"
        >
          Passer sans option
        </button>
      </div>
    </section>
  );
};

export default CanapeOptionsStep;