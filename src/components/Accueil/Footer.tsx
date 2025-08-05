import { Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F52BA] text-white py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Version mobile - centrée */}
        <div className="md:hidden text-center space-y-6">
          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-bold mb-4">Suivez-nous</h4>
            <div className="flex flex-col items-center space-y-3">
              <a
                href="https://www.facebook.com/profile.php?id=61571447229404"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur Facebook"
                className="flex items-center gap-3 hover:text-gray-300 transition text-base"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/washandgo13/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur Instagram"
                className="flex items-center gap-3 hover:text-gray-300 transition text-base"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@washandgo13"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur TikTok"
                className="flex items-center gap-3 hover:text-gray-300 transition text-base"
              >
                <SiTiktok className="h-5 w-5" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Séparateur visuel */}
          <div className="w-16 h-px bg-white/30 mx-auto"></div>

          {/* Liens légaux */}
          <div>
            <h4 className="text-lg font-bold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/mentions-legales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition text-sm"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="/politique-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition text-sm"
                >
                  Politique de cookies
                </a>
              </li>
              <li>
                <a
                  href="/rgpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition text-sm"
                >
                  Respect du RGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Version desktop - grille */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-bold mb-3">Suivez-nous</h4>
            <div className="flex flex-row gap-6 items-center">
              <a
                href="https://www.facebook.com/profile.php?id=61571447229404"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur Facebook"
                className="flex items-center gap-2 hover:text-gray-300 transition text-base"
              >
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/washandgo13/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur Instagram"
                className="flex items-center gap-2 hover:text-gray-300 transition text-base"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@washandgo13"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wash&GO sur TikTok"
                className="flex items-center gap-2 hover:text-gray-300 transition text-base"
              >
                <SiTiktok className="h-5 w-5" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Liens légaux */}
          <div>
            <h4 className="text-lg font-bold mb-3">Informations</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="/mentions-legales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="/politique-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition"
                >
                  Politique de cookies
                </a>
              </li>
              <li>
                <a
                  href="/rgpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-300 transition"
                >
                  Respect du RGPD
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
