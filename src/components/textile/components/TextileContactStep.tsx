import React, { useState, useEffect } from "react";
import { CalendarDays, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import TimeSlotSelector, { TimeSlot, generateTimeSlots, formatDuration } from "../../voiture/components/TimeSlotSelector";
import { sendEmailViaWeb3Forms, formatServiceRequest } from "../../../config/web3forms";

interface TextileContactStepProps {
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

const TextileContactStep: React.FC<TextileContactStepProps> = ({ selections, totalPrice, totalTime, onReset }) => {
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
      if (Array.isArray(found.value)) {
        if (found.value.length === 0) return "Aucune option";
        return found.value.join(", ");
      }
      return found.value || "-";
    };

    const formatTime = (min: number) => {
      const h = Math.floor(min / 60);
      const m = min % 60;
      if (h && m) return `± ${h}h${m.toString().padStart(2, "0")}`;
      if (h) return `± ${h}h`;
      return `± ${m} min`;
    };

    const message = formatServiceRequest('textile', localSelections, totalPrice, totalTime, {
      nom: form.nom,
      prenom: form.prenom,
      telephone: form.telephone,
      email: form.email,
      adresse: form.adresse,
      date: form.date,
      timeSlot: form.timeSlot,
      message: form.message,
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
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Overlay de succès amélioré */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl px-8 py-12 max-w-md w-full text-center relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light focus:outline-none transition-colors duration-200 hover:scale-110"
              onClick={() => setShowSuccessOverlay(false)}
              aria-label="Fermer"
            >
              ×
            </button>
            
            {/* Animation de succès */}
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h2>
            <p className="text-gray-600 mb-8">Nous vous recontacterons dans les plus brefs délais pour confirmer votre rendez-vous.</p>
            
            <button
              onClick={() => setShowSuccessOverlay(false)}
              className="bg-gradient-to-r from-[#0049ac] to-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-blue-600 hover:to-[#0049ac] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105"
            >
              Parfait !
            </button>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header avec navigation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Étape finale</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0049ac] to-blue-600">coordonnées</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Remplissez vos informations pour finaliser votre demande de nettoyage textile
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne de gauche - Résumé */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Récapitulatif</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {selections.map((sel, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-[#0049ac] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{sel.step}</p>
                        <p className="text-sm text-gray-600">
                          {Array.isArray(sel.value) ? sel.value.join(", ") : sel.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Prix total</span>
                    <span className="text-2xl font-bold text-[#0049ac]">{totalPrice} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Durée estimée</span>
                    <span className="text-lg font-semibold text-gray-900">{formatDuration(totalTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Informations personnelles
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom *</label>
                      <div className="relative">
                        <input 
                          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none transition-all duration-200 ${
                            fieldErrors.nom && isSubmitted
                              ? "border-red-400 focus:ring-red-300 bg-red-50"
                              : "border-gray-200 focus:ring-[#0049ac] focus:border-[#0049ac] hover:border-gray-300"
                          }`}
                          name="nom" 
                          placeholder="Votre nom" 
                          value={form.nom} 
                          onChange={handleChange} 
                        />
                        {fieldErrors.nom && isSubmitted && (
                          <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.nom}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Prénom *</label>
                      <div className="relative">
                        <input 
                          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none transition-all duration-200 ${
                            fieldErrors.prenom && isSubmitted
                              ? "border-red-400 focus:ring-red-300 bg-red-50"
                              : "border-gray-200 focus:ring-[#0049ac] focus:border-[#0049ac] hover:border-gray-300"
                          }`}
                          name="prenom" 
                          placeholder="Votre prénom" 
                          value={form.prenom} 
                          onChange={handleChange} 
                        />
                        {fieldErrors.prenom && isSubmitted && (
                          <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.prenom}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                      <div className="relative">
                        <input 
                          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none transition-all duration-200 ${
                            fieldErrors.telephone && isSubmitted
                              ? "border-red-400 focus:ring-red-300 bg-red-50"
                              : "border-gray-200 focus:ring-[#0049ac] focus:border-[#0049ac] hover:border-gray-300"
                          }`}
                          name="telephone"
                          placeholder="06 12 34 56 78"
                          value={displayPhone}
                          onChange={handleChange}
                          maxLength={14}
                          inputMode="numeric"
                          pattern="[0-9 ]*"
                        />
                        {fieldErrors.telephone && isSubmitted && (
                          <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.telephone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <div className="relative">
                        <input 
                          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none transition-all duration-200 ${
                            fieldErrors.email && isSubmitted
                              ? "border-red-400 focus:ring-red-300 bg-red-50"
                              : "border-gray-200 focus:ring-[#0049ac] focus:border-[#0049ac] hover:border-gray-300"
                          }`}
                          type="email" 
                          name="email" 
                          placeholder="votre@email.com" 
                          value={form.email} 
                          onChange={handleChange} 
                        />
                        {fieldErrors.email && isSubmitted && (
                          <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Adresse (facultatif)</label>
                    <input 
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] focus:outline-none transition-all duration-200 hover:border-gray-300"
                      name="adresse" 
                      placeholder="123 Rue de la Paix, 75001 Paris" 
                      value={form.adresse} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                {/* Planning */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Planning
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date souhaitée *</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleDateChange}
                          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:outline-none pl-12 transition-all duration-200 ${
                            fieldErrors.date && isSubmitted
                              ? "border-red-400 focus:ring-red-300 bg-red-50"
                              : "border-gray-200 focus:ring-[#0049ac] focus:border-[#0049ac] hover:border-gray-300"
                          }`}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {fieldErrors.date && isSubmitted && (
                          <div className="absolute -bottom-6 left-0 text-red-500 text-xs flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.date}
                          </div>
                        )}
                      </div>
                    </div>

                    {showTimeSlots && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Créneau horaire *</label>
                        <TimeSlotSelector
                          date={form.date}
                          serviceDuration={localTotalTime}
                          selectedSlot={form.timeSlot}
                          onSlotSelect={handleTimeSlotSelect}
                        />
                        {fieldErrors.timeSlot && isSubmitted && (
                          <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.timeSlot}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Message (optionnel)
                  </h3>
                  <textarea 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0049ac] focus:border-[#0049ac] focus:outline-none transition-all duration-200 hover:border-gray-300 resize-none"
                    rows={4} 
                    name="message" 
                    placeholder="Informations complémentaires, instructions spéciales..." 
                    value={form.message} 
                    onChange={handleChange} 
                  />
                </div>

                {/* RGPD */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      checked={rgpd} 
                      onChange={() => setRgpd(v => !v)} 
                      className="accent-[#0049ac] w-5 h-5 mt-0.5 flex-shrink-0" 
                      required 
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        J'accepte l'utilisation de mes données personnelles
                      </p>
                      <p className="text-xs text-gray-600">
                        Vos données sont collectées pour traiter votre demande et vous recontacter. 
                        Elles ne seront pas partagées avec des tiers.
                      </p>
                    </div>
                  </div>
                  {fieldErrors.rgpd && isSubmitted && (
                    <div className="text-red-500 text-xs flex items-center gap-1 mt-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.rgpd}
                    </div>
                  )}
                </div>

                {/* Messages d'erreur généraux */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-700 font-medium">Votre demande a bien été envoyée !</span>
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(initialForm);
                      setRgpd(false);
                      setError("");
                      setSuccess(false);
                      setShowTimeSlots(false);
                      setFieldErrors({});
                      setIsSubmitted(false);
                      if (typeof onReset === 'function') onReset();
                    }}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold rounded-xl px-6 py-3 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Recommencer
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0049ac] to-blue-600 text-white font-bold rounded-xl px-8 py-3 hover:from-blue-600 hover:to-[#0049ac] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextileContactStep; 