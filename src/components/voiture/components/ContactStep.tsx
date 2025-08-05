import React, { useState, useEffect } from "react";
import { CalendarDays, Send, AlertCircle } from "lucide-react";
import TimeSlotSelector, { TimeSlot, generateTimeSlots, formatDuration } from "./TimeSlotSelector";
import { sendEmailViaWeb3Forms, formatServiceRequest } from "../../../config/web3forms";

interface ContactStepProps {
  selections: { step: string; value: string | string[] }[];
  totalPrice: number;
  totalTime: number;
  onReset?: () => void;
}

const initialForm = {
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  adresse: "",
  date: "",
  timeSlot: "",
  message: "",
  rappel: true,
};

// Fonction pour vérifier si une date est valide
function isValidDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Date doit être dans le futur et pas un dimanche
  return date >= today && date.getDay() !== 0;
}

function isValidEmail(email: string) {
  return /^[^@\s]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email);
}

function isValidPhone(phone: string) {
  return /^\d{10}$/.test(phone.replace(/\s/g, ""));
}

function isValidAdresse(adresse: string) {
  return /\d+\s+.+,?\s*\d{5}\s+.+/i.test(adresse);
}

const ContactStep: React.FC<ContactStepProps> = ({ selections, totalPrice, totalTime, onReset }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [rgpd, setRgpd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  // États locaux pour garantir la synchro des props
  const [localSelections, setLocalSelections] = useState(selections);
  const [localTotalPrice, setLocalTotalPrice] = useState(totalPrice);
  const [localTotalTime, setLocalTotalTime] = useState(totalTime);

  useEffect(() => {
    setLocalSelections(selections);
    setLocalTotalPrice(totalPrice);
    setLocalTotalTime(totalTime);
  }, [selections, totalPrice, totalTime]);

  // Afficher les créneaux quand la date change
  useEffect(() => {
    if (form.date && isValidDate(form.date)) {
      setShowTimeSlots(true);
      setForm(prev => ({ ...prev, timeSlot: "" })); // Reset le créneau sélectionné
    } else {
      setShowTimeSlots(false);
    }
  }, [form.date, localTotalTime]);

  // Fonction pour valider un champ spécifique
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'nom':
        return !value.trim() ? "Veuillez saisir votre nom" : "";
      case 'prenom':
        return !value.trim() ? "Veuillez saisir votre prénom" : "";
      case 'telephone':
        if (!value.trim()) return "Numéro de téléphone obligatoire";
        if (!isValidPhone(value)) return "Numéro de téléphone invalide (10 chiffres requis)";
        return "";
      case 'email':
        if (!value.trim()) return "Adresse e-mail obligatoire";
        if (!isValidEmail(value)) return "Adresse e-mail invalide";
        return "";
      case 'date':
        return !value ? "Veuillez sélectionner une date" : "";
      case 'timeSlot':
        return !value ? "Veuillez sélectionner un créneau horaire" : "";
      case 'rgpd':
        return !rgpd ? "Veuillez accepter l'utilisation de vos données (RGPD)" : "";
      default:
        return "";
    }
  };

  // Fonction pour afficher les erreurs de champ avec style amélioré
  const renderFieldError = (fieldName: string) => {
    const error = fieldErrors[fieldName];
    // N'afficher les erreurs que si le formulaire a été soumis
    if (!error || !isSubmitted) return null;
    
    return (
      <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
        <p className="text-red-600 text-sm font-medium">{error}</p>
      </div>
    );
  };

  // Fonction pour obtenir les classes CSS des champs
  const getFieldClasses = (fieldName: string) => {
    const hasError = fieldErrors[fieldName] && isSubmitted; // Erreur seulement si soumis
    return `w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-300 focus:ring-[#0049ac] focus:border-[#0049ac]"
    }`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    
    // Valider le champ en temps réel mais ne pas afficher l'erreur
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    // Effacer l'erreur générale si il y en avait une
    if (error) setError("");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidDate(value)) {
      setForm({ ...form, date: value, timeSlot: "" });
      setError("");
    } else {
      setForm({ ...form, date: "", timeSlot: "" });
      setError("Date non valide (dimanche non autorisé ou date passée)");
    }
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setForm({ ...form, timeSlot: `${slot.start}-${slot.end}` });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marquer le formulaire comme soumis
    setIsSubmitted(true);
    
    // Valider tous les champs
    const newFieldErrors: Record<string, string> = {};
    let hasErrors = false;
    
    // Validation des champs obligatoires
    const requiredFields = ['nom', 'prenom', 'telephone', 'email', 'date', 'timeSlot'];
    requiredFields.forEach(field => {
      const error = validateField(field, form[field as keyof typeof form] as string);
      if (error) {
        newFieldErrors[field] = error;
        hasErrors = true;
      }
    });
    
    // Validation RGPD
    if (!rgpd) {
      newFieldErrors.rgpd = "Veuillez accepter l'utilisation de vos données (RGPD)";
      hasErrors = true;
    }
    
    setFieldErrors(newFieldErrors);
    
    if (hasErrors) {
      // Scroll vers le premier champ en erreur
      const firstErrorField = Object.keys(newFieldErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setError("");
    setLoading(true);

    // Utilisation des valeurs locales pour garantir la fraîcheur
    const getValue = (stepLabel: string) => {
      const found = localSelections.find(sel => sel.step === stepLabel);
      if (!found) return "-";
      if (Array.isArray(found.value)) return found.value.length ? found.value.join(", ") : "-";
      return found.value || "-";
    };

    const formatTime = (min: number) => {
      const h = Math.floor(min / 60);
      const m = min % 60;
      if (h && m) return `± ${h}h${m.toString().padStart(2, "0")}`;
      if (h) return `± ${h}h`;
      return `± ${m} min`;
    };

    const message = formatServiceRequest('voiture', localSelections, localTotalPrice, localTotalTime, {
      nom: form.nom,
      prenom: form.prenom,
      telephone: form.telephone,
      email: form.email,
      adresse: form.adresse,
      date: form.date,
      timeSlot: form.timeSlot,
      message: form.message
    });

    try {
      await sendEmailViaWeb3Forms(`${form.nom} ${form.prenom}`, form.email, message);
      
      setSuccess(true);
      setShowSuccessOverlay(true);
      setForm(initialForm);
      setRgpd(false);
      setShowTimeSlots(false);
      if (typeof onReset === 'function') onReset();
    } catch (err) {
      console.error("Erreur lors de l'envoi:", err);
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi, merci de réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Fermer l'overlay automatiquement après 5s
  useEffect(() => {
    if (showSuccessOverlay) {
      const timer = setTimeout(() => setShowSuccessOverlay(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessOverlay]);

  // Affichage téléphone masqué (optionnel)
  const displayPhone = form.telephone.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1 ").trim();

  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
      {/* Overlay de succès */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full text-center relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold focus:outline-none transition-colors duration-200 hover:scale-110"
              onClick={() => setShowSuccessOverlay(false)}
              aria-label="Fermer"
            >
              ×
            </button>
            <svg className="mx-auto mb-4" width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#e0f7fa"/><path d="M7 13l3 3 7-7" stroke="#009688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 className="text-2xl font-bold text-[#0049ac] mb-2">Message envoyé !</h2>
            <p className="text-gray-700 mb-6">Nous vous recontacterons sous peu.</p>
            
            {/* Bouton Fermer en bas */}
            <button
              onClick={() => setShowSuccessOverlay(false)}
              className="bg-[#0049ac] text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Fermer
            </button>
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease;
            }
          `}</style>
        </div>
      )}
      {/* Fin overlay */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Finalisez votre <span className="text-[#0049ac]">demande de lavage</span>
        </h2>

        <div className="bg-blue-50 border-l-4 border-[#0049ac] rounded-xl p-6 mb-10 shadow-sm">
          <h3 className="font-semibold text-[#0049ac] mb-4 text-lg">Récapitulatif de votre sélection</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            {selections.map((sel, idx) => (
              <li key={idx}>
                <span className="font-medium">{sel.step} :</span>{" "}
                {Array.isArray(sel.value) ? sel.value.join(", ") : sel.value}
              </li>
            ))}
          </ul>
          <div className="mt-4 text-sm">
            <p><strong>Prix total :</strong> <span className="text-[#0049ac] font-bold">{totalPrice} €</span></p>
            <p><strong>Durée estimée :</strong> <span className="text-[#0049ac] font-bold">{formatDuration(totalTime)}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <input className={getFieldClasses("nom")} name="nom" placeholder="Nom *" value={form.nom} onChange={handleChange} />
            {renderFieldError("nom")}
            <input className={getFieldClasses("prenom")} name="prenom" placeholder="Prénom *" value={form.prenom} onChange={handleChange} />
            {renderFieldError("prenom")}
            <input
              className={getFieldClasses("telephone")}
              name="telephone"
              placeholder="Téléphone *"
              value={displayPhone}
              onChange={handleChange}
              maxLength={14}
              inputMode="numeric"
              pattern="[0-9 ]*"
            />
            {renderFieldError("telephone")}
            <input className={getFieldClasses("email")} type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} />
            {renderFieldError("email")}
            <input className={getFieldClasses("adresse")} name="adresse" placeholder="Adresse / Ville (facultatif)" value={form.adresse} onChange={handleChange} />
            
            {/* Sélection de date */}
            <div className="relative sm:col-span-2">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleDateChange}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none pl-10 transition-colors ${
                  fieldErrors.date && isSubmitted
                    ? "border-red-400 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-[#0049ac] focus:border-[#0049ac]"
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {renderFieldError("date")}

            {/* Sélection de créneau horaire */}
            {showTimeSlots && (
              <div className="sm:col-span-2">
                <TimeSlotSelector
                  date={form.date}
                  serviceDuration={localTotalTime}
                  selectedSlot={form.timeSlot}
                  onSlotSelect={handleTimeSlotSelect}
                />
              </div>
            )}
            {renderFieldError("timeSlot")}
          </div>

          

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={rgpd} onChange={() => setRgpd(v => !v)} className="accent-[#0049ac] w-5 h-5" required />
            <span>J'accepte l'utilisation de mes données (RGPD)</span>
          </div>
          {renderFieldError("rgpd")}

          <textarea className={getFieldClasses("message")} rows={3} name="message" placeholder="Message" value={form.message} onChange={handleChange} />
          {renderFieldError("message")}

          {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-sm font-semibold">Votre demande a bien été envoyée !</div>}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Bouton Réinitialiser à gauche */}
            <button
              type="button"
                             onClick={() => {
                 setForm(initialForm);
                 setRgpd(false);
                 setError("");
                 setSuccess(false);
                 setShowTimeSlots(false);
                 setFieldErrors({}); // Clear field errors on reset
                 setIsSubmitted(false); // Reset submitted state
                 if (typeof onReset === 'function') onReset();
               }}
              className="flex items-center gap-2 bg-gray-100 text-gray-800 font-semibold rounded-lg px-4 py-2 shadow-sm hover:bg-gray-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.293 6.293a1 1 0 011.414 0L8 8.586V7a1 1 0 112 0v4a1 1 0 01-1 1H5a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 010-1.414zM10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" /></svg>
              Réinitialiser le formulaire
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0049ac] text-white font-bold rounded-2xl px-6 py-3 flex items-center justify-center gap-2 shadow hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" /> Envoyer ma demande
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactStep;
