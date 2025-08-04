import { Facebook, Instagram, MapPin, CheckCircle, Search, AlertTriangle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.75 2c.473 0 .856.383.856.856a5.15 5.15 0 0 0 5.143 5.144.857.857 0 0 1 .856.857v2.174a.857.857 0 0 1-.857.857 7.5 7.5 0 0 1-3.145-.7v6.595a5.429 5.429 0 1 1-5.429-5.428c.169 0 .336.01.5.027v2.093a2.571 2.571 0 1 0 2.571 2.572v-13A.857.857 0 0 1 12.75 2Z" />
  </svg>
);

// Données des villes par catégorie
const VILLES_DATA = {
  // Liste A : intervention standard
  standard: [
    "Auriol", "Roquevaire", "La Destrousse", "La Bouilladisse", "Belcodène", "Cadolive", "Saint-Savournin",
    "Mimet", "Gréasque", "Gardanne", "Fuveau", "Meyreuil", "Rousset", "Trets", "Peynier", "Châteauneuf-le-Rouge",
    "Pourcieux", "Pourrières", "Plan-de-Cuques", "Château-Gombert", "Bouc-Bel-Air", "Simiane-Collongue",
    "Cabriès", "Gémenos", "Carnoux-en-Provence", "Allauch", "Saint-Maximin-la-Sainte-Baume"
  ],
  // Liste B : intervention dès 2 véhicules
  deuxVehicules: [
    "Aubagne", "Saint-Zacharie", "Marseille"
  ]
};

// Fonction pour normaliser le nom d'une ville (supprimer accents, majuscules, etc.)
const normalizeCityName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
};

// Fonction pour vérifier si une ville est dans une liste
const checkCityInList = (cityName: string, cityList: string[]): boolean => {
  const normalizedSearch = normalizeCityName(cityName);
  return cityList.some(city => normalizeCityName(city) === normalizedSearch);
};

// Fonction pour obtenir le type d'intervention d'une ville
const getInterventionType = (cityName: string): 'standard' | 'deuxVehicules' | 'devis' => {
  if (checkCityInList(cityName, VILLES_DATA.standard)) {
    return 'standard';
  } else if (checkCityInList(cityName, VILLES_DATA.deuxVehicules)) {
    return 'deuxVehicules';
  } else {
    return 'devis';
  }
};

const ContactSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<{
    type: 'standard' | 'deuxVehicules' | 'devis' | null;
    city: string;
  }>({ type: null, city: "" });

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResult({ type: null, city: "" });
      return;
    }

    const interventionType = getInterventionType(searchTerm.trim());
    setSearchResult({
      type: interventionType,
      city: searchTerm.trim()
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getResultMessage = () => {
    if (!searchResult.type) return null;

    switch (searchResult.type) {
      case 'standard':
        return {
          message: `Oui, nous intervenons à ${searchResult.city}`,
          icon: "✅",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        };
      case 'deuxVehicules':
        return {
          message: `Oui, nous intervenons à ${searchResult.city} dès 2 véhicules`,
          icon: "⚠️",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200"
        };
      case 'devis':
        return {
          message: `Nous intervenons sur devis à ${searchResult.city}`,
          icon: "💬",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200"
        };
      default:
        return null;
    }
  };

  const resultMessage = getResultMessage();

  return (
    <section id="contact" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Contactez <span className="text-[#0049ac]">Wash&Go</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Une question, une demande&nbsp;? On est là pour vous aider à redonner vie à votre voiture.
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start mb-12 sm:mb-16 md:mb-20">
          {/* Infos dans un bloc cadré à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6"
          >
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0049ac]">Service mobile</h3>
              <p className="text-sm sm:text-base text-gray-700">
                Nous nous déplaçons chez vous avec tout le matériel nécessaire
              </p>
            </div>

            <div className="text-gray-800 space-y-1 text-sm sm:text-base">
              <p>📞 06 22 70 60 00</p>
              <p>📧 wash.go13@gmail.com</p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <a
                href="tel:0622706000"
                className="py-2 sm:py-2.5 px-4 sm:px-5 bg-[#0049ac] text-white rounded-full text-xs sm:text-sm text-center hover:bg-blue-800 transition"
              >
                📞 Nous appeler
              </a>
              <a
                href="mailto:wash.go13@gmail.com"
                className="py-2 sm:py-2.5 px-4 sm:px-5 border border-[#0049ac] text-[#0049ac] rounded-full text-xs sm:text-sm text-center hover:bg-[#0049ac] hover:text-white transition"
              >
                ✉️ Nous écrire
              </a>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Retrouvez-nous sur :</p>
              <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                <a
                  href="https://www.facebook.com/profile.php?id=61571447229404"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0049ac] hover:text-blue-800 transition flex items-center gap-1"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/washandgo13/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-600 hover:text-pink-700 transition flex items-center gap-1"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@washandgo13"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-gray-700 transition flex items-center gap-1"
                >
                  <TikTokIcon />
                  <span className="text-xs sm:text-sm">TikTok</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Carte Google Maps à droite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-xl border bg-white"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46338.30571121762!2d5.512469848209386!3d43.45758855864135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c990845409b1db%3A0x40819a5fd970310!2s13710%20Fuveau!5e0!3m2!1sfr!2sfr!4v1754316697481!5m2!1sfr!2sfr"
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] sm:h-[400px] border-0"
            ></iframe>
          </motion.div>
        </div>

        {/* Section de recherche interactive - Zone d'intervention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* En-tête de la section */}
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Vérifiez notre zone d'intervention
              </h3>
            </motion.div>
            <p className="text-sm sm:text-base text-gray-600">
              Entrez le nom de votre commune pour vérifier si nous intervenons chez vous
            </p>
          </motion.div>

          {/* Barre de recherche améliorée */}
          <motion.div 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex gap-3">
                <div className="flex-1 relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#0049ac] transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Entrez le nom de votre commune..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0049ac]/20 focus:border-[#0049ac] outline-none transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                  />
                </div>
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#0049ac] to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg"
                >
                  Vérifier
                </motion.button>
              </div>

              {/* Résultat animé */}
              {resultMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  className={`mt-4 p-4 rounded-xl border ${resultMessage.bgColor} ${resultMessage.borderColor} shadow-sm`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                      className="text-2xl"
                    >
                      {resultMessage.icon}
                    </motion.div>
                    <motion.p 
                      className={`text-sm font-semibold ${resultMessage.color}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {resultMessage.message}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
