import React, { useEffect, useState } from 'react';
import { Facebook, ExternalLink, Calendar, User } from 'lucide-react';
import { fetchFacebookPosts, formatDate, truncateMessage, FacebookPost } from '../services/fetchFacebookPosts';

const FACEBOOK_URL = "https://www.facebook.com/WashAndGo";
const PAGE_AVATAR_URL = "https://graph.facebook.com/522086294323345/picture?type=square";

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
        setPosts(data.slice(0, 3)); // Limiter à 3 posts
      } catch (err) {
        console.error('Erreur lors du chargement des posts:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
          Suivez-nous sur Facebook 🚗✨
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Découvrez nos dernières publications et conseils d'entretien
        </p>

        {/* Lien vers la page Facebook */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <Facebook className="mr-2" size={20} />
            <span>Wash&Go</span>
          </a>
        </div>

        {/* Grille des posts */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Chargement des publications...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 font-medium mb-2">Erreur de chargement</p>
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <p className="text-gray-500 text-xs">
                  Vérifiez que le serveur backend fonctionne sur le port 3001
                </p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-600 font-medium mb-2">Aucune publication disponible</p>
                <p className="text-gray-500 text-sm">
                  Aucun post Facebook récent à afficher pour le moment.
                </p>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image du post */}
                {post.full_picture && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.full_picture}
                      alt="Publication Facebook"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                {/* Contenu du post */}
                <div className="p-6">
                  {/* En-tête avec avatar et nom */}
                  <div className="flex items-center mb-4">
                    <img
                      src={PAGE_AVATAR_URL}
                      alt="Wash&Go"
                      className="w-10 h-10 rounded-full mr-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Wash&Go</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(post.created_time)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message du post */}
                  <div className="mb-4">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                      {truncateMessage(post.message)}
                    </p>
                  </div>

                  {/* Bouton vers Facebook */}
                  <a
                    href={post.permalink_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Voir sur Facebook
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bouton "Voir plus" */}
        <div className="mt-12">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Facebook className="mr-2" size={18} />
            Voir plus de publications
            <ExternalLink size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection; 