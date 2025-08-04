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

// Données de test en cas d'échec de l'API
const mockPosts: FacebookPost[] = [
  {
    id: '1',
    message: 'Nouveau service de nettoyage de canapés disponible ! 🛋️✨\n\nProfitez de notre expertise pour redonner vie à vos canapés. Service disponible sur toute la région.\n\n📞 Contactez-nous pour un devis gratuit !',
    full_picture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    permalink_url: 'https://www.facebook.com/profile.php?id=61571447229404',
    created_time: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    message: '🚗 Nettoyage intérieur de voiture professionnel !\n\nNous utilisons des produits de qualité pour un résultat impeccable. Votre véhicule mérite le meilleur !\n\n💯 Satisfaction garantie',
    full_picture: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
    permalink_url: 'https://www.facebook.com/profile.php?id=61571447229404',
    created_time: '2024-01-10T14:20:00Z'
  },
  {
    id: '3',
    message: '🎉 Promotion spéciale ce mois-ci !\n\n-20% sur le nettoyage complet intérieur/extérieur\n\nOffre valable jusqu\'à la fin du mois. Réservez vite !',
    full_picture: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    permalink_url: 'https://www.facebook.com/profile.php?id=61571447229404',
    created_time: '2024-01-05T09:15:00Z'
  }
];

// Fonction principale pour récupérer les posts Facebook
export async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  try {
    // Headers pour éviter les problèmes CORS
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    const response = await fetch('https://backendtrue-5an1-git-main-floop2gares-projects.vercel.app/api/facebook-posts', {
      method: 'GET',
      headers,
      mode: 'cors', // Explicitement activer CORS
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur API Facebook:', response.status, errorData);
      
      // Gestion des erreurs spécifiques
      if (response.status === 401) {
        console.warn('Token Facebook expiré ou invalide - Utilisation des données de test');
        return mockPosts;
      } else if (response.status === 403) {
        console.warn('Permissions insuffisantes - Utilisation des données de test');
        return mockPosts;
      } else if (response.status === 404) {
        console.warn('Aucune publication trouvée - Utilisation des données de test');
        return mockPosts;
      } else if (response.status === 500) {
        console.warn('Erreur serveur backend - Utilisation des données de test');
        return mockPosts;
      }
      
      console.warn(`Erreur ${response.status} - Utilisation des données de test`);
      return mockPosts;
    }
    
    const data = await response.json();
    return data.data; // L'API externe retourne { data: [...] }
  } catch (error) {
    console.error('Erreur lors de la récupération des publications Facebook:', error);
    console.warn('Utilisation des données de test en raison d\'une erreur de connexion');
    return mockPosts;
  }
} 