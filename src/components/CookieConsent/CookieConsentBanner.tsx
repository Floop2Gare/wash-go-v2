import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'washngo_cookie_consent';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    // Ici, on pourrait activer les cookies de tracking si nécessaire
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    // Ici, on pourrait désactiver les cookies non essentiels si nécessaire
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-200"
        >
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-4 md:mb-0 md:mr-8 text-sm sm:text-base text-gray-700">
                <p>
                  Ce site utilise des cookies pour améliorer votre expérience et mesurer l'audience.
                  Vous pouvez accepter ou refuser leur utilisation.{' '}
                  <Link 
                    to="/politique-cookies" 
                    className="text-[#0049ac] hover:text-blue-700 font-medium underline"
                    onClick={() => setIsVisible(false)}
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={handleDecline}
                  className="order-2 sm:order-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="order-1 sm:order-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#0049ac] to-blue-600 rounded-lg hover:from-blue-600 hover:to-[#0049ac] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0049ac] transition-all transform hover:scale-105"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
