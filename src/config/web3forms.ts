// Configuration Web3Forms
export const WEB3FORMS_CONFIG = {
  accessKey: 'b1c483a3-32a0-4ab0-8382-f7b50840048f',
  endpoint: 'https://api.web3forms.com/submit',
  timeout: 10000, // 10 secondes
};

// Types pour les réponses Web3Forms
export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    email: string;
    message: string;
  };
}

// Fonction utilitaire pour envoyer un email via Web3Forms
export const sendEmailViaWeb3Forms = async (
  name: string,
  email: string,
  message: string
): Promise<Web3FormsResponse> => {
  try {
    console.log('🚀 Envoi email via Web3Forms...');
    console.log('📧 Destinataire:', email);
    console.log('👤 Nom:', name);
    console.log('📝 Message:', message.substring(0, 100) + '...');

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_CONFIG.accessKey);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEB3FORMS_CONFIG.timeout);

    const response = await fetch(WEB3FORMS_CONFIG.endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('📡 Réponse reçue:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur HTTP:', response.status, errorText);
      throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
    }

    const result: Web3FormsResponse = await response.json();
    console.log('✅ Réponse Web3Forms:', result);

    if (!result.success) {
      throw new Error(result.message || 'Erreur inconnue de Web3Forms');
    }

    return result;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Délai d\'attente dépassé. Veuillez réessayer.');
      }
      throw error;
    }
    
    throw new Error('Erreur de connexion. Veuillez vérifier votre connexion internet.');
  }
};

// Fonction pour formater un message de demande de service
export const formatServiceRequest = (
  serviceType: 'voiture' | 'canape' | 'textile',
  selections: { step: string; value: string | string[] }[],
  totalPrice: number,
  totalTime: number,
  contactInfo: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    adresse?: string;
    date: string;
    timeSlot: string;
    message?: string;
  }
): string => {
  const getValue = (stepLabel: string) => {
    const found = selections.find(sel => sel.step === stepLabel);
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

  const emoji = serviceType === 'voiture' ? '🚗' : serviceType === 'canape' ? '🛋️' : '🧺';
  const serviceName = serviceType === 'voiture' ? 'Voiture' : serviceType === 'canape' ? 'Canapé' : 'Textile';

  let message = `${emoji} Nouvelle demande Wash&GO ${serviceName}\n\n`;

  if (serviceType === 'voiture') {
    message += `Aspiration : ${getValue("Aspiration")}\n`;
    message += `Type de véhicule : ${getValue("Véhicule")}\n`;
    message += `Sièges à nettoyer : ${getValue("Pressing sièges")}\n`;
    message += `Options choisies : ${getValue("Options spéciales")}\n`;
    message += `Spécificités : ${getValue("Extras")}\n`;
  } else if (serviceType === 'canape') {
    message += `Type de tissu : ${getValue("Type de tissu")}\n`;
    message += `Nombre de places : ${getValue("Nombre de places")}\n`;
    message += `Options supplémentaires : ${getValue("Options supplémentaires")}\n`;
  } else {
    message += `Type de textile : ${getValue("Type de textile")}\n`;
    
    // Gérer les différents cas selon le type de textile
    const textileType = getValue("Type de textile");
    if (textileType === "Matelas") {
      message += `Taille du matelas : ${getValue("Taille du matelas")}\n`;
    } else if (textileType === "Chaises") {
      message += `Nombre de chaises : ${getValue("Nombre de chaises")}\n`;
      message += `Matière des chaises : ${getValue("Matière des chaises")}\n`;
    } else if (textileType === "Tapis") {
      message += `Surface du tapis : ${getValue("Surface du tapis")}\n`;
      message += `Matière : ${getValue("Matière")}\n`;
    } else {
      message += `Matière : ${getValue("Matière")}\n`;
    }
    
    message += `Options supplémentaires : ${getValue("Options supplémentaires")}\n`;
  }

  message += `Prix total : ${totalPrice} €\n`;
  message += `Temps estimé : ${formatTime(totalTime)}\n\n`;
  message += `📩 Contact client :\n`;
  message += `Nom : ${contactInfo.nom} ${contactInfo.prenom}\n`;
  message += `Téléphone : ${contactInfo.telephone}\n`;
  message += `Email : ${contactInfo.email}\n`;
  message += `Adresse : ${contactInfo.adresse || "Non renseignée"}\n`;
  message += `Date souhaitée : ${contactInfo.date}\n`;
  message += `Créneau : ${contactInfo.timeSlot}\n`;
  message += `Message perso : ${contactInfo.message || "Aucun message"}\n\n`;
  message += `🔐 Code parrainage : Washgo`;

  return message;
}; 