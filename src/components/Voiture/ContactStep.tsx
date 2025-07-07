import React, { useState } from "react";

// --- Tarifs par catégorie ---
const PRICING = {
  aspiration: { complete: 40, partielle: 30 },
  vehicle: {
    citadine: 0,
    berline: 10,
    break: 10,
    suv: 15,
    "7places": 20,
    utilitaire: 15,
  },
  seats: {
    avant: 20,
    arriere: 20,
    coffre: 15,
    unite: 10,
  },
  extras: {
    plastiques: 15,
    portes: 20,
    vitres: 10,
    parebrise: 5,
  },
  specials: {
    poils: 15,
    moquettes: 20,
    "tres-sale": 10,
    cuir: 20,
    souscoffre: 15,
  },
};

// --- Temps estimés (en minutes) ---
const TIMING = {
  aspiration: { complete: 60, partielle: 45 },
  vehicle: {
    citadine: 0,
    berline: 15,
    break: 15,
    suv: 15,
    "7places": 45,
    utilitaire: 60,
  },
  seats: {
    avant: 15,
    arriere: 15,
    coffre: 15,
    unite: 10,
  },
  extras: {
    plastiques: 20,
    portes: 20,
    vitres: 5,
    parebrise: 2,
  },
  specials: {
    poils: 15,
    moquettes: 20,
    "tres-sale": 30,
    cuir: 15,
    souscoffre: 10,
  },
};

const LABELS: Record<string, string> = {
  complete: "Aspiration complète",
  partielle: "Aspiration partielle",
  citadine: "Citadine",
  berline: "Berline",
  break: "Break",
  suv: "SUV / 4x4",
  "7places": "7 places & +",
  utilitaire: "Utilitaire",
  avant: "Sièges avant",
  arriere: "Sièges arrière",
  coffre: "Coffre (7 places)",
  unite: "1 siège à l’unité",
  plastiques: "Plastiques intérieurs",
  portes: "Encadrements de portes",
  vitres: "Vitres intérieures",
  parebrise: "Pare-brise",
  poils: "Poils d’animaux",
  moquettes: "Pressing moquettes",
  "tres-sale": "Véhicule très sale",
  cuir: "Nettoyage et hydratation cuir",
  souscoffre: "Compartiment sous coffre",
};

function calculateTotal({ aspiration, vehicleType, seatZones, extras, specialOptions }: any) {
  let total = 0;
  if (aspiration) total += PRICING.aspiration[aspiration] || 0;
  if (vehicleType) total += PRICING.vehicle[vehicleType] || 0;
  seatZones.forEach((z: string) => (total += PRICING.seats[z] || 0));
  extras.forEach((e: string) => (total += PRICING.extras[e] || 0));
  specialOptions.forEach((o: string) => (total += PRICING.specials[o] || 0));
  return total;
}

function estimateTime({ aspiration, vehicleType, seatZones, extras, specialOptions }: any) {
  let totalMinutes = 0;
  if (aspiration) totalMinutes += TIMING.aspiration[aspiration] || 0;
  if (vehicleType) totalMinutes += TIMING.vehicle[vehicleType] || 0;
  seatZones.forEach((z: string) => (totalMinutes += TIMING.seats[z] || 0));
  extras.forEach((e: string) => (totalMinutes += TIMING.extras[e] || 0));
  specialOptions.forEach((o: string) => (totalMinutes += TIMING.specials[o] || 0));
  const rounded = Math.floor(totalMinutes / 30) * 30;
  const hours = Math.floor(rounded / 60);
  const minutes = rounded % 60;
  return `± ${hours > 0 ? `${hours}h` : ""}${minutes > 0 ? ` ${minutes}min` : ""}`.trim();
}

interface ContactStepProps {
  aspiration: string | null;
  vehicleType: string | null;
  seatZones: string[];
  extras: string[];
  specialOptions: string[];
  onSubmit: (data: any) => void;
  onReset: () => void;
}

export default function ContactStep({
  aspiration,
  vehicleType,
  seatZones,
  extras,
  specialOptions,
  onSubmit,
  onReset,
}: ContactStepProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");

  const total = calculateTotal({ aspiration, vehicleType, seatZones, extras, specialOptions });
  const duration = estimateTime({ aspiration, vehicleType, seatZones, extras, specialOptions });

  const handleSubmit = async () => {
    let valid = true;

    if (!name.trim().includes(" ")) {
      setNameError("Merci d’indiquer un nom et un prénom.");
      valid = false;
    } else setNameError("");

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setPhoneError("Numéro de téléphone invalide (10 chiffres minimum).");
      valid = false;
    } else setPhoneError("");

    if (city.trim().length < 5) {
      setCityError("Merci d’indiquer une adresse précise.");
      valid = false;
    } else setCityError("");

    if (!valid) return;

    const formData = {
      access_key: "b1c483a3-32a0-4ab0-8382-f7b50840048f",
      subject: "Nouvelle demande de nettoyage Wash&GO",
      from_name: "Wash&GO",
      replyto: phone,
      message: `🚗 Nouvelle demande Wash&GO\n\n- Aspiration : ${LABELS[aspiration || ""] || "Non précisé"}\n- Type de véhicule : ${LABELS[vehicleType || ""] || "Non précisé"}\n- Sièges à nettoyer : ${seatZones.map((z) => LABELS[z]).join(", ") || "Aucun"}\n- Options choisies : ${extras.map((e) => LABELS[e]).join(", ") || "Aucune"}\n- Spécificités : ${specialOptions.map((o) => LABELS[o]).join(", ") || "Aucune"}\n- Prix total : ${total} €\n- Temps estimé : ${duration}\n\n📩 Contact client :\nNom : ${name}\nTéléphone : ${phone}\nAdresse : ${city}${referralCode ? `\n🔁 Code parrainage : ${referralCode}` : ""}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSubmit(formData);
      } else {
        alert("Erreur lors de l'envoi de la demande.");
      }
    } catch (err) {
      console.error("Erreur de soumission :", err);
      alert("Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <div className="p-6">
      <div className="p-0">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Vos informations</h3>
        <div>
          <label className="text-sm font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            placeholder="Jean Dupont"
            className={`w-full mt-1 border rounded-md p-3 ${nameError ? "border-red-500" : "border-gray-300"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            placeholder="06 12 34 56 78"
            className={`w-full mt-1 border rounded-md p-3 ${phoneError ? "border-red-500" : "border-gray-300"}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Adresse d’intervention</label>
          <input
            type="text"
            placeholder="15 avenue des Platanes, Fuveau"
            className={`w-full mt-1 border rounded-md p-3 ${cityError ? "border-red-500" : "border-gray-300"}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {cityError && <p className="text-sm text-red-500 mt-1">{cityError}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Code parrainage (optionnel)</label>
          <input
            type="text"
            placeholder="Ex: WASH10"
            className="w-full mt-1 border border-gray-300 rounded-md p-3"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleSubmit}
          className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 group"
        >
          <span className="relative z-10">Valider ma demande</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 relative z-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
            />
          </svg>
          <span className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 blur-sm" />
        </button>
      </div>
    </div>
  );
}
