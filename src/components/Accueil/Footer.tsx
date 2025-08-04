import { Facebook, Instagram } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F52BA] text-white py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Suivez-nous</h4>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-start sm:items-center">
            <a
              href="https://www.facebook.com/profile.php?id=61571447229404"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur Facebook"
              className="flex items-center gap-2 hover:text-gray-300 transition text-sm sm:text-base"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/washandgo13/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur Instagram"
              className="flex items-center gap-2 hover:text-gray-300 transition text-sm sm:text-base"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@washandgo13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Wash&GO sur TikTok"
              className="flex items-center gap-2 hover:text-gray-300 transition text-sm sm:text-base"
            >
              <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Liens légaux */}
        <div>
          <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">Informations</h4>
          <ul className="text-xs sm:text-sm space-y-1 sm:space-y-2">
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
    </footer>
  );
};

export default Footer;
