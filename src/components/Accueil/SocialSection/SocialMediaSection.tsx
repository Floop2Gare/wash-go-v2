import React, { useEffect, useState } from 'react';
import { Facebook, ExternalLink, Calendar, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* En-tête avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-gray-900">Suivez-nous sur </span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Facebook</span>
            </h2>
          </motion.div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Découvrez nos dernières publications et conseils d'entretien
          </p>
        </motion.div>

        {/* Bouton de redirection vers Facebook */}
        <motion.div 
          className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base font-medium"
          >
            <Facebook className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            <span>Wash&Go</span>
          </a>
        </motion.div>

        {/* Grille fixe de 4 publications - Design amélioré */}
        <div className="mt-8 sm:mt-10">
          {loading ? (
            <motion.div 
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block w-8 h-8 sm:w-10 sm:h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-sm sm:text-base text-gray-600">Chargement des publications...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-6 max-w-md mx-auto shadow-lg">
                <p className="text-yellow-800 text-sm sm:text-base font-medium">
                  ⚠️ {error}. Veuillez nous visiter directement sur Facebook.
                </p>
              </div>
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Voir nos publications <ExternalLink size={16} className="ml-2" />
              </motion.a>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div 
              className="text-center py-8 sm:py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm sm:text-base text-gray-600 mb-4">Aucune publication disponible pour le moment.</p>
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Voir nos publications <ExternalLink size={16} className="ml-2" />
              </motion.a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {posts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.permalink_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col min-h-[300px] sm:min-h-[350px] border border-gray-100"
                >
                  {/* Image avec overlay */}
                  {post.full_picture && (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.full_picture}
                        alt="Publication Facebook"
                        className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Badge Facebook */}
                      <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1 shadow-lg">
                        <Facebook className="w-3 h-3" />
                      </div>
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Titre de la publication avec couleur */}
                    <div className="mb-3">
                      <h3 className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Publication Wash&Go
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap line-clamp-4 mb-3 sm:mb-4 flex-1 leading-relaxed">
                      {post.message}
                    </p>
                    
                    {/* Footer avec date et icônes */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.created_time).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>❤️</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>💬</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Bouton "Voir plus" amélioré */}
        <motion.div 
          className="mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
          >
            Voir plus de publications <ExternalLink size={16} className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
