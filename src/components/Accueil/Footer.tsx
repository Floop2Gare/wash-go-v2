import { Facebook, Instagram, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0049ac] text-white">
      {/* Section principale */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Grille principale */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Logo et description */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <img 
                  src="/logo/logophrase.svg" 
                  alt="Wash & Go" 
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                Service de nettoyage professionnel à domicile dans les Bouches-du-Rhône. 
                Spécialisés dans le nettoyage de véhicules et canapés.
              </p>
              <div className="flex items-center text-sm text-gray-200">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Intervention à domicile dans les Bouches-du-Rhône</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
              <div className="space-y-4">
                {/* Adrien */}
                <div className="flex items-start space-x-3">
                  <div className="bg-white/10 rounded-full p-2 flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Adrien</p>
                    <a 
                      href="tel:0622706000" 
                      className="text-sm text-gray-200 hover:text-white transition-colors"
                    >
                      06 22 70 60 00
                    </a>
                  </div>
                </div>

                {/* Clément */}
                <div className="flex items-start space-x-3">
                  <div className="bg-white/10 rounded-full p-2 flex-shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Clément</p>
                    <a 
                      href="tel:0623034700" 
                      className="text-sm text-gray-200 hover:text-white transition-colors"
                    >
                      06 23 03 47 00
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="bg-white/10 rounded-full p-2 flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <a 
                      href="mailto:contact@washandgo.fr" 
                      className="text-sm text-gray-200 hover:text-white transition-colors"
                    >
                      contact@washandgo.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Horaires</h3>
              <div className="flex items-start space-x-3 mb-4">
                <div className="bg-white/10 rounded-full p-2 flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="space-y-2 text-sm text-gray-200">
                  <div>
                    <p className="font-medium">Lundi - Vendredi</p>
                    <p>8h00 - 19h00</p>
                  </div>
                  <div>
                    <p className="font-medium">Samedi</p>
                    <p>9h00 - 17h00</p>
                  </div>
                  <div>
                    <p className="font-medium">Dimanche</p>
                    <p>Sur rendez-vous</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux et liens légaux */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Suivez-nous</h3>
              <div className="space-y-3 mb-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61571447229404"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Wash&GO sur Facebook"
                  className="flex items-center space-x-3 hover:text-gray-300 transition-colors text-sm"
                >
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/washandgo13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Wash&GO sur Instagram"
                  className="flex items-center space-x-3 hover:text-gray-300 transition-colors text-sm"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@washandgo13"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Wash&GO sur TikTok"
                  className="flex items-center space-x-3 hover:text-gray-300 transition-colors text-sm"
                >
                  <SiTiktok className="h-4 w-4" />
                  <span>TikTok</span>
                </a>
              </div>

              <h4 className="text-sm font-bold mb-3 text-white">Informations légales</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="/mentions-legales"
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="/politique-cookies"
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    Politique de cookies
                  </a>
                </li>
                <li>
                  <a
                    href="/rgpd"
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    Respect du RGPD
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-white/20 bg-[#003d8f] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-200 text-center sm:text-left">
              © 2024 Wash & Go. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-200 text-center sm:text-right">
              Intervention à domicile dans les Bouches-du-Rhône
            </p>
          </div>
          
          {/* Mention assurance */}
          <div className="mt-3 flex items-center justify-center space-x-2">
            <ShieldCheck className="h-3 w-3 text-gray-300" />
            <p className="text-xs text-gray-300 text-center">
              Wash&Go est couvert par une assurance responsabilité civile professionnelle chez Hiscox Assurances.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
