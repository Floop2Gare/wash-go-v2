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

// Fallback minimal en cas d'échec total de l'API
const fallbackPosts: FacebookPost[] = [
  {
    id: 'fallback',
    message: 'Impossible de charger les publications Facebook pour le moment. Veuillez nous visiter directement sur Facebook pour voir nos dernières actualités.',
    permalink_url: 'https://www.facebook.com/profile.php?id=61571447229404',
    created_time: new Date().toISOString()
  }
];

// Fonction principale pour récupérer les posts Facebook
export async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  try {
    console.log('Récupération des vraies publications Facebook...');
    
    const response = await fetch('https://backendtrue-5an1.vercel.app/api/facebook-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`Erreur API: ${response.status} - ${response.statusText}`);
      throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Publications Facebook récupérées avec succès:', data);
    
    // Vérifier la structure des données et extraire les posts
    let posts: FacebookPost[] = [];
    
    if (data && data.posts && Array.isArray(data.posts)) {
      posts = data.posts;
    } else if (data && Array.isArray(data)) {
      posts = data;
    } else if (data && data.data && Array.isArray(data.data)) {
      posts = data.data;
    } else {
      console.warn('Structure de données inattendue:', data);
      throw new Error('Format de données non reconnu');
    }
    
    // Filtrer et formater les posts
    const validPosts = posts
      .filter(post => post && post.message && post.id)
      .map(post => ({
        id: post.id,
        message: post.message,
        full_picture: post.full_picture || undefined,
        permalink_url: post.permalink_url || 'https://www.facebook.com/profile.php?id=61571447229404',
        created_time: post.created_time || new Date().toISOString()
      }));
    
    console.log(`${validPosts.length} publications valides trouvées`);
    return validPosts;
    
  } catch (error) {
    console.error('Erreur lors de la récupération des publications Facebook:', error);
    console.warn('Utilisation du fallback minimal');
    return fallbackPosts;
  }
} 