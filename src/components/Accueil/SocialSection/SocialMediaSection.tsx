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
    fetchFacebookPosts().then((data) => {
      setPosts(data.slice(0, 3)); // 3 derniers posts
      setLoading(false);
      setError(null);
    }).catch((error) => {
      console.error('Erreur lors du chargement des posts:', error);
      setLoading(false);
      setError('Impossible de charger les publications depuis Facebook');
    });
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

        {/* Affichage des posts Facebook */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Chargement des publications...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ {error}. Affichage des publications de démonstration.
                </p>
              </div>
              {posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      {post.full_picture && (
                        <img
                          src={post.full_picture}
                          alt="Facebook post"
                          className="w-full h-60 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="p-4 text-left">
                        <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">
                          {post.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Publié le {new Date(post.created_time).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600">Aucune publication disponible pour le moment.</p>
            </div>
          ) : (
            posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {post.full_picture && (
                  <img
                    src={post.full_picture}
                    alt="Facebook post"
                    className="w-full h-60 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-4 text-left">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">
                    {post.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Publié le {new Date(post.created_time).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </a>
            ))
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
