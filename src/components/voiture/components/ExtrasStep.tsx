import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface ExtrasStepProps {
  onSelect: (data: { step: string; value: string[]; price: number; time: number }) => void;
  nextSectionId?: string;
  selected?: string[];
}

const options = [
  {
    value: "Poils animaux",
    label: "Poils animaux",
    price: 10,
    time: 30,
    img: "/voiture/specific/poils.jpg",
  },
  {
    value: "Véhicule très sale",
    label: "Véhicule très sale",
    price: "À voir sur devis",
    time: "À voir sur devis",
    img: "/voiture/specific/tressale.jpg",
  },
  {
    value: "Shampoing sol",
    label: "Shampoing sol",
    price: 15,
    time: 30,
    img: "/voiture/specific/moquettes.jpg",
  },
  {
    value: "Sous Coffre",
    label: "Sous Coffre",
    price: 10,
    time: 15,
    img: "/voiture/specific/souscoffre.jpg",
  },
];

const ExtrasStep: React.FC<ExtrasStepProps> = ({ onSelect, nextSectionId, selected = [] }) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selected);
  const [loading, setLoading] = useState(false);

  // ✅ Synchronisation avec la sélection du parent
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
    
    // Calcul du prix total (comme "Hors gabarit" : afficher spécial mais calculer normal)
    const selectedOptions = options.filter((o) => localSelected.includes(o.value));
    const totalPrice = selectedOptions.reduce((sum, o) => {
      // Si l'option a un prix spécial, on l'ignore dans le calcul (comme "Hors gabarit")
      if (typeof o.price === 'string') {
        return sum; // Ne pas ajouter au total
      }
      return sum + o.price;
    }, 0);
    
    // Calcul du temps total (même logique)
    const totalTime = selectedOptions.reduce((sum, o) => {
      // Si l'option a un temps spécial, on l'ignore dans le calcul
      if (typeof o.time === 'string') {
        return sum; // Ne pas ajouter au total
      }
      return sum + o.time;
    }, 0);
    
    onSelect({ step: "Extras", value: localSelected, price: totalPrice, time: totalTime });
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
    
    onSelect({ step: "Extras", value: [], price: 0, time: 0 });
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
                  <span className="text-xl font-bold text-[#0049ac]">
                    {typeof opt.price === 'number' ? `+${opt.price} €` : opt.price}
                  </span>
                </div>
                 <p className="text-xs text-gray-400 mb-3">
                   Durée : {typeof opt.time === 'number' ? `${opt.time} min` : opt.time}
                 </p>
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
        {localSelected.length ? localSelected.join(", ") : <span className="text-gray-400 italic">Aucun extra sélectionné</span>}
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
          Finaliser les extras <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={handleValidateWithoutOptions}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl font-bold text-[#0049ac] bg-gray-100 shadow-sm transition-all hover:bg-gray-200"
        >
          Finaliser sans extra
        </button>
      </div>
    </section>
  );
};

export default ExtrasStep;
