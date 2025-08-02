import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Send, RotateCw, X, CalendarDays, AlertCircle, CheckCircle, ImagePlus } from "lucide-react";
import TimeSlotSelector, { TimeSlot, generateTimeSlots, formatDuration } from "../../voiture/components/TimeSlotSelector";

interface ContactStepProps {
  selectedFormule: string;
  selectedOptions: string[];
  onSubmit: (data: FormData) => void;
  allDemandes?: { formule: string; options: string[] }[];
  onAddCanape?: () => void;
  onFullReset?: () => void;
  onDeleteCanape?: (index: number) => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  date: string;
  timeSlot: string;
  message?: string; // Added for photos
};

const schema = yup.object({
  name: yup.string().required("Veuillez saisir votre nom complet"),
  email: yup.string().email("Adresse e-mail invalide").required("Adresse e-mail obligatoire"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Numéro de téléphone invalide (10 chiffres requis)")
    .required("Numéro de téléphone obligatoire"),
  city: yup.string(),
  date: yup.string().required("Veuillez sélectionner une date"),
  timeSlot: yup.string().required("Veuillez sélectionner un créneau horaire"),
  message: yup.string().optional(), // Added for photos
});

const ContactStep: React.FC<ContactStepProps> = ({
  selectedFormule,
  selectedOptions,
  onSubmit,
  allDemandes = [],
  onAddCanape,
  onDeleteCanape,
  onFullReset,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onSubmit', // Les erreurs ne s'affichent qu'après soumission
  });

  // Calculer la durée estimée pour les canapés (approximative)
  const getEstimatedDuration = () => {
    const baseDuration = 60; // 1h de base
    const optionDuration = selectedOptions.length * 15; // 15 min par option
    return baseDuration + optionDuration;
  };

  const estimatedDuration = getEstimatedDuration();

  // Fonction pour vérifier si une date est valide
  const isValidDate = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Date doit être dans le futur et pas un dimanche
    return date >= today && date.getDay() !== 0;
  };

  // Gérer le changement de date
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidDate(value)) {
      setSelectedDate(value);
      setValue("date", value);
      setShowTimeSlots(true);
      setSelectedTimeSlot("");
      setValue("timeSlot", "");
    } else {
      setSelectedDate("");
      setValue("date", "");
      setShowTimeSlots(false);
      setSelectedTimeSlot("");
      setValue("timeSlot", "");
    }
  };

  // Gérer la sélection de créneau
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    const slotValue = `${slot.start}-${slot.end}`;
    setSelectedTimeSlot(slotValue);
    setValue("timeSlot", slotValue);
  };

  // Fonction pour gérer la sélection de photos
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    // Validation des types de fichiers
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxFileSize = 10 * 1024 * 1024; // 10MB par fichier
    const maxTotalSize = 30 * 1024 * 1024; // 30MB total
    const maxFiles = 5;
    
    // Vérifier le nombre de fichiers
    if (files.length > maxFiles) {
      setUploadError(`Vous ne pouvez sélectionner que ${maxFiles} photos maximum.`);
      return;
    }
    
    let totalSize = 0;
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        setUploadError(`Le fichier ${file.name} n'est pas un format d'image valide. Utilisez JPG, PNG ou WebP.`);
        return false;
      }
      if (file.size > maxFileSize) {
        setUploadError(`Le fichier ${file.name} est trop volumineux. Taille maximum : 10MB.`);
        return false;
      }
      totalSize += file.size;
      if (totalSize > maxTotalSize) {
        setUploadError(`Le poids total des fichiers ne doit pas dépasser 30MB.`);
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
    setUploadError(""); // Clear any previous errors
  };

  // Fonction pour supprimer une photo
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Fonction pour uploader un fichier vers File.io
  const uploadToFileIO = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('https://file.io', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.link;
      } else {
        throw new Error('Échec de l\'upload vers File.io');
      }
    } catch (error) {
      console.error('Erreur upload File.io:', error);
      throw new Error('Impossible d\'uploader le fichier vers le service temporaire');
    }
  };

  // Fonction pour gérer la soumission avec upload de photos
  const handleFormSubmit = async (data: FormData) => {
    try {
      // Upload des photos vers File.io
      const photoLinks: string[] = [];
      
      if (photos.length > 0) {
        for (const file of photos) {
          try {
            const link = await uploadToFileIO(file);
            photoLinks.push(link);
          } catch (error) {
            setUploadError(`Impossible d'uploader ${file.name}. Veuillez réessayer.`);
            return;
          }
        }
      }
      
      // Ajouter les liens des photos au message
      let finalMessage = data.message || "";
      if (photoLinks.length > 0) {
        finalMessage += `\n\n📎 Photos envoyées :\n\n${photoLinks.join('\n\n')}\n\n⚠️ Note : Ces liens sont valables 24h et ne peuvent être téléchargés qu'une seule fois.`;
      }
      
      // Créer l'objet final avec le message enrichi
      const finalData = {
        ...data,
        message: finalMessage
      };
      
      // Appeler la fonction onSubmit du parent
      onSubmit(finalData);
      
      // Afficher l'overlay de succès
      setShowSuccessOverlay(true);
      
    } catch (error) {
      setUploadError("Erreur lors de l'upload des photos. Veuillez réessayer.");
    }
  };

  const fullDemandes = [...allDemandes, { formule: selectedFormule, options: selectedOptions }];

  const formulePrices: Record<string, number> = {
    "2 places": 40,
    "3 places": 50,
    "4 places": 60,
    "5 et +": 70,
  };

  const optionPrices: Record<string, number> = {
    antiacariens: 10,
    detachant: 10,
    desodorisant: 10,
  };

  const demandesWithTotal = fullDemandes.map((demande) => {
    const basePrice = formulePrices[demande.formule] || 0;
    const optionsTotal = demande.options.reduce((sum, opt) => sum + (optionPrices[opt] || 0), 0);
    return { ...demande, total: basePrice + optionsTotal };
  });

  const totalGlobal = demandesWithTotal.reduce((sum, d) => sum + d.total, 0);

  // Fonction pour afficher les erreurs avec style amélioré
  const renderFieldError = (fieldName: keyof FormData) => {
    const error = errors[fieldName];
    // N'afficher les erreurs que si le formulaire a été soumis
    if (!error || !isSubmitted) return null;
    
    return (
      <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
        <p className="text-red-600 text-sm font-medium">{error.message}</p>
      </div>
    );
  };

  // Fonction pour obtenir les classes CSS des champs
  const getFieldClasses = (fieldName: keyof FormData) => {
    const hasError = errors[fieldName] && isSubmitted; // Erreur seulement si soumis
    return `mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm transition-colors ${
      hasError
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
    }`;
  };

  // Fermer l'overlay automatiquement après 5s
  useEffect(() => {
    if (showSuccessOverlay) {
      const timer = setTimeout(() => setShowSuccessOverlay(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessOverlay]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
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
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 bg-white shadow rounded-xl p-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Finaliser ma demande</h2>

          {["name", "email", "phone", "city"].map((field) => {
            const fieldMap: Record<string, { label: string; type: string; placeholder?: string }> = {
              name: { label: "Nom *", type: "text", placeholder: "Votre nom complet" },
              email: { label: "Email *", type: "email", placeholder: "votre@email.com" },
              phone: { label: "Téléphone *", type: "tel", placeholder: "06XXXXXXXX" },
              city: { label: "Commune (facultatif)", type: "text", placeholder: "Ex : Fuveau, Aix-en-Provence..." },
            };

            return (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {fieldMap[field].label}
                </label>
                <input
                  id={field}
                  type={fieldMap[field].type}
                  placeholder={fieldMap[field].placeholder}
                  {...register(field as keyof FormData)}
                  className={getFieldClasses(field as keyof FormData)}
                />
                {renderFieldError(field as keyof FormData)}
              </div>
            );
          })}

          {/* Sélection de date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date souhaitée *
            </label>
            <div className="relative mt-1">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm pl-10 transition-colors ${
                  errors.date && isSubmitted
                    ? "border-red-400 focus:ring-red-300 bg-red-50"
                    : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {renderFieldError("date")}
          </div>

          {/* Sélection de créneau horaire */}
          {showTimeSlots && (
            <div>
              <TimeSlotSelector
                date={selectedDate}
                serviceDuration={estimatedDuration}
                selectedSlot={selectedTimeSlot}
                onSlotSelect={handleTimeSlotSelect}
              />
              {renderFieldError("timeSlot")}
            </div>
          )}

          {/* Upload de photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photos (max 5) - Facultatif
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="w-6 h-6 text-gray-400" />
              <span className="text-sm text-gray-500 text-center">
                {photos.length === 0 
                  ? "Cliquez ici pour ajouter jusqu'à 5 photos"
                  : `${photos.length}/5 photos sélectionnées`
                }
              </span>
              <span className="text-xs text-gray-400 text-center">
                Formats acceptés : JPG, PNG (max 10MB par fichier)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                multiple
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            
            {/* Aperçu des photos */}
            {photos.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {photos.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Photo ${idx + 1}`} 
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                        title="Supprimer cette photo"
                      >
                        ×
                      </button>
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Message d'erreur upload */}
            {uploadError && (
              <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">{uploadError}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              Envoyer ma demande <Send size={16} />
            </button>

            {onAddCanape && (
              <button
                type="button"
                onClick={onAddCanape}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2"
              >
                Ajouter un autre canapé <Plus size={16} />
              </button>
            )}

            {onFullReset && (
              <button
                type="button"
                onClick={onFullReset}
                className="w-full bg-red-50 border text-sm border-red-300 text-red-600 hover:bg-red-100 rounded-md py-2 px-4 flex items-center justify-center gap-2"
              >
                Supprimer tous les canapés <RotateCw size={16} />
              </button>
            )}
          </div>
        </form>

        <div className="bg-white border border-gray-100 rounded-xl shadow p-6 text-sm overflow-y-auto max-h-[600px]">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif de vos canapés</h3>
          <ul className="divide-y divide-gray-200 text-gray-700">
            {demandesWithTotal.map((demande, index) => (
              <li key={index} className="py-4 relative group">
                <p className="font-semibold text-blue-600">Canapé {index + 1}</p>
                <p>
                  <span className="font-medium text-gray-800">Formule :</span> {demande.formule}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Options :</span>{" "}
                  {demande.options.length ? demande.options.join(", ") : "Aucune"}
                </p>
                <p className="mt-2 text-sm font-bold text-gray-900">Total : {demande.total} €</p>

                {onDeleteCanape && (
                  <button
                    type="button"
                    onClick={() => onDeleteCanape(index)}
                    className="absolute top-2 right-2 text-red-500 text-xs opacity-0 group-hover:opacity-100 transition"
                    title="Supprimer ce canapé"
                  >
                    <X size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <p className="text-right font-bold text-blue-700 mt-6 text-lg">
            Total général : {totalGlobal} €
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactStep;
