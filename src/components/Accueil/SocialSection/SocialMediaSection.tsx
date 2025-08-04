import React from 'react';
import { Facebook, ExternalLink } from 'lucide-react';

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61571447229404";

const SocialMediaSection: React.FC = () => {
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

        {/* Conteneur prêt pour l'intégration du composant FacebookPosts */}
        <div className="facebook-posts-container">
          {/* Le composant FacebookPosts sera intégré ici */}
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
