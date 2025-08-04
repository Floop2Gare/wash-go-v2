// Interface pour les posts Facebook
export interface FacebookPost {
  id: string;
  message: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

// Fonction pour formater les dates en français
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erreur de formatage de date:', error);
    return 'Date inconnue';
  }
}

// Fonction pour tronquer les messages trop longs
export function truncateMessage(message: string, maxLength: number = 150): string {
  if (!message) return '';
  
  if (message.length <= maxLength) {
    return message;
  }
  
  // Tronquer à la dernière espace pour éviter de couper un mot
  const truncated = message.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) { // Si on a trouvé un espace dans les 80% derniers caractères
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

// Fonction principale pour récupérer les posts Facebook
export async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  try {
    const response = await fetch('https://node-js-api-graph.onrender.com/api/facebook/posts');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur API Facebook:', response.status, errorData);
      
      // Gestion des erreurs spécifiques
      if (response.status === 401) {
        throw new Error('Token Facebook expiré ou invalide');
      } else if (response.status === 403) {
        throw new Error('Permissions insuffisantes pour accéder aux posts');
      } else if (response.status === 404) {
        throw new Error('Aucune publication trouvée');
      } else if (response.status === 500) {
        throw new Error('Erreur serveur backend');
      }
      
      throw new Error(`Erreur ${response.status}: ${errorData.error || 'Erreur inconnue'}`);
    }
    
    const data = await response.json();
    return data.data; // L'API externe retourne { data: [...] }
  } catch (error) {
    console.error('Erreur lors de la récupération des publications Facebook:', error);
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw new Error('Erreur de connexion à l\'API externe');
  }
} 