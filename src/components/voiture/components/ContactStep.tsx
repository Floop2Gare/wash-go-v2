import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ImagePlus, Send, Plus, Clock, AlertCircle } from "lucide-react";
import TimeSlotSelector, { TimeSlot, generateTimeSlots, formatDuration } from "./TimeSlotSelector";

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
  const [photos, setPhotos] = useState<File[]>([]);
  const [rgpd, setRgpd] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 3); // Max 3 photos
    
    // Validation des types de fichiers
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB par fichier
    const maxTotalSize = 30 * 1024 * 1024; // 30MB total
    
    let totalSize = 0;
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        setError(`Le fichier ${file.name} n'est pas un format d'image valide. Utilisez JPG, PNG ou WebP.`);
        return false;
      }
      if (file.size > maxFileSize) {
        setError(`Le fichier ${file.name} est trop volumineux. Taille maximum : 10MB.`);
        return false;
      }
      totalSize += file.size;
      if (totalSize > maxTotalSize) {
        setError(`Le poids total des fichiers ne doit pas dépasser 30MB.`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length !== files.length) {
      // Si des fichiers invalides, on ne met à jour que les valides
      setPhotos(validFiles);
      return;
    }
    
    setPhotos(files);
    setError(""); // Clear any previous errors
  };

  const handlePhotoZoneClick = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Fonction de fallback avec Cloudinary (gratuit, plus fiable)
  const uploadToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          
          const formData = new FormData();
          formData.append('file', base64);
          formData.append('upload_preset', 'ml_default'); // Preset public Cloudinary
          
          const response = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const result = await response.json();
            resolve(result.secure_url);
          } else {
            throw new Error('Échec de l\'upload vers Cloudinary');
          }
        } catch (error) {
          console.error('Erreur upload Cloudinary:', error);
          reject(new Error('Impossible d\'uploader le fichier vers Cloudinary'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsDataURL(file);
    });
  };

  const uploadToImgBB = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const base64Data = base64.split(',')[1]; // Enlever le préfixe data:image/...;base64,
          
          const formData = new FormData();
          formData.append('image', base64Data);
          formData.append('expiration', '86400'); // 1 jour
          
          const response = await fetch('https://api.imgbb.com/1/upload?key=913a666159bc972f4ff90aa5d88589', {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const result = await response.json();
            resolve(result.data.url);
          } else {
            const errorText = await response.text();
            console.error('Réponse ImgBB:', response.status, errorText);
            reject(new Error('Échec de l\'upload vers ImgBB'));
          }
        } catch (error) {
          console.error('Erreur upload ImgBB:', error);
          reject(new Error('Impossible d\'uploader le fichier vers ImgBB'));
        }
      };
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
      reader.readAsDataURL(file);
    });
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

    const message = `🚗 Nouvelle demande Wash&GO\n\n` +
      `Aspiration : ${getValue("Aspiration")}\n` +
      `Type de véhicule : ${getValue("Véhicule")}\n` +
      `Sièges à nettoyer : ${getValue("Pressing sièges")}\n` +
      `Options choisies : ${getValue("Options spéciales")}\n` +
      `Spécificités : ${getValue("Extras")}\n` +
      `Prix total : ${localTotalPrice} €\n` +
      `Temps estimé : ${formatTime(localTotalTime)}\n\n` +
      `📩 Contact client :\n` +
      `Nom : ${form.nom} ${form.prenom}\n` +
      `Téléphone : ${form.telephone}\n` +
      `Email : ${form.email}\n` +
      `Adresse : ${form.adresse}\n` +
      `Date souhaitée : ${form.date}\n` +
      `Créneau : ${form.timeSlot}\n` +
      `Message perso : ${form.message || "-"}\n\n` +
      `🔐 Code parrainage : Washgo`;

    try {
      // Upload de TOUS les fichiers avec fallback
      const photoLinks: string[] = [];
      
      if (photos.length > 0) {
        for (const file of photos) {
          try {
            // Essayer ImgBB d'abord
            const link = await uploadToImgBB(file);
            photoLinks.push(link);
          } catch (error) {
            console.error('Erreur upload ImgBB, essai Cloudinary:', error);
            try {
              // Fallback vers Cloudinary
              const link = await uploadToCloudinary(file);
              photoLinks.push(link);
            } catch (cloudinaryError) {
              console.error('Erreur upload Cloudinary:', cloudinaryError);
              // Continuer sans cette photo plutôt que d'échouer complètement
              setError(`Photo ${file.name} non envoyée (erreur technique). Le formulaire sera envoyé sans cette image.`);
              // On continue avec les autres photos
            }
          }
        }
      }
      
      // Ajouter les liens des photos au message (format compact)
      let finalMessage = message;
      if (photoLinks.length > 0) {
        finalMessage += `\n\n📎 Photos (${photoLinks.length}) : ${photoLinks.join(' | ')}`;
      }

      const formData = new FormData();
      formData.append('access_key', 'b1c483a3-32a0-4ab0-8382-f7b50840048f');
      formData.append('name', `${form.nom} ${form.prenom}`);
      formData.append('email', form.email);
      formData.append('message', finalMessage);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        setSuccess(true);
        setShowSuccessOverlay(true);
        setForm(initialForm);
        setPhotos([]);
        setRgpd(false);
        setShowTimeSlots(false);
        if (typeof onReset === 'function') onReset();
      } else {
        setError("Erreur lors de l'envoi, merci de réessayer.");
      }
    } catch (err) {
      setError("Erreur lors de l'envoi, merci de réessayer.");
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Photos de votre véhicule (max 5) - Facultatif
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={handlePhotoZoneClick}
              style={{ minHeight: 120 }}
            >
              <ImagePlus className="w-8 h-8 text-[#0049ac] mb-2" />
              <span className="text-xs text-gray-500 mb-1 text-center">
                {photos.length === 0 
                  ? "Cliquez ici pour ajouter jusqu'à 3 photos de votre véhicule"
                  : `${photos.length}/3 photos sélectionnées`
                }
              </span>
              <span className="text-xs text-gray-400 text-center">
                Formats acceptés : JPG, PNG, WebP (max 10MB par fichier, 30MB total)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handlePhotoChange}
                className="w-full hidden"
              />
            </div>
            {photos.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                  {photos.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Photo ${idx + 1}`} 
                        className="w-24 h-24 object-cover rounded-lg shadow border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                        title="Supprimer cette photo"
                      >
                        ×
                      </button>
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name}
                      </div>
                      <div className="text-xs text-gray-400 text-center">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Les photos vous aideront à mieux évaluer l'état de votre véhicule
                </p>
              </div>
            )}
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
                setPhotos([]);
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
