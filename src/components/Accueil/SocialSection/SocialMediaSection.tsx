import React, { useEffect, useState } from 'react';
import { Facebook, ExternalLink } from 'lucide-react';
import { fetchFacebookPosts } from "../../../services/fetchFacebookPosts";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61571447229404";

interface FacebookPost {
  id: string;
  message: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}

const SocialMediaSection: React.FC = () => {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchFacebookPosts();
        setPosts(data.slice(0, 4)); // Afficher seulement les 4 premières publications
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des posts:', err);
        setLoading(false);
        setError('Impossible de charger les publications Facebook');
      }
    };

    loadPosts();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Suivez-nous sur notre Facebook
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Découvrez nos dernières publications et conseils d'entretien
        </p>

        {/* Bouton de redirection vers Facebook */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Facebook className="mr-1" size={20} />
            <span>Wash&Go</span>
          </a>
        </div>

        {/* Grille fixe de 4 publications */}
        <div className="mt-10">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Chargement des publications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ {error}. Veuillez nous visiter directement sur Facebook.
                </p>
              </div>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Voir nos publications <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucune publication disponible pour le moment.</p>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors mt-4"
              >
                Voir nos publications <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col"
                >
                  {post.full_picture && (
                    <img
                      src={post.full_picture}
                      alt="Publication Facebook"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="p-4 text-left flex-1 flex flex-col">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4 mb-3 flex-1">
                      {post.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-auto">
                      Publié le {new Date(post.created_time).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bouton "Voir plus" */}
        <div className="mt-12">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Voir plus <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
