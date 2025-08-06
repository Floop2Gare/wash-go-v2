import { Facebook, Instagram, MapPin, Phone, Mail, Clock, Star, ArrowRight, CheckCircle, MessageCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.75 2c.473 0 .856.383.856.856a5.15 5.15 0 0 0 5.143 5.144.857.857 0 0 1 .856.857v2.174a.857.857 0 0 1-.857.857 7.5 7.5 0 0 1-3.145-.7v6.595a5.429 5.429 0 1 1-5.429-5.428c.169 0 .336.01.5.027v2.093a2.571 2.571 0 1 0 2.571 2.572v-13A.857.857 0 0 1 12.75 2Z" />
  </svg>
);

// Données des villes par catégorie
const VILLES_DATA = {
  standard: [
    "Auriol", "Roquevaire", "La Destrousse", "La Bouilladisse", "Belcodène", "Cadolive", "Saint-Savournin",
    "Mimet", "Gréasque", "Gardanne", "Fuveau", "Meyreuil", "Rousset", "Trets", "Peynier", "Châteauneuf-le-Rouge",
    "Pourcieux", "Pourrières", "Plan-de-Cuques", "Château-Gombert", "Bouc-Bel-Air", "Simiane-Collongue",
    "Cabriès", "Gémenos", "Carnoux-en-Provence", "Allauch", "Saint-Maximin-la-Sainte-Baume","Peypin"
  ],
  deuxVehicules: [
    "Aubagne", "Saint-Zacharie", "Marseille"
  ]
};

const normalizeCityName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
};

const checkCityInList = (cityName: string, cityList: string[]): boolean => {
  const normalizedSearch = normalizeCityName(cityName);
  return cityList.some(city => normalizeCityName(city) === normalizedSearch);
};

const getInterventionType = (cityName: string): 'standard' | 'deuxVehicules' | 'devis' => {
  if (checkCityInList(cityName, VILLES_DATA.standard)) {
    return 'standard';
  } else if (checkCityInList(cityName, VILLES_DATA.deuxVehicules)) {
    return 'deuxVehicules';
  } else {
    return 'devis';
  }
};

const ContactSectionUltra = () => {
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
          icon: CheckCircle,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200"
        };
      case 'deuxVehicules':
        return {
          message: `Oui, nous intervenons à ${searchResult.city} dès 2 véhicules`,
          icon: AlertTriangle,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200"
        };
      case 'devis':
        return {
          message: `Nous intervenons sur devis à ${searchResult.city}`,
          icon: MessageCircle,
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
    <section id="contact" className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#0049ac]/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-600/10 to-[#0049ac]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Optimisé */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-2xl mb-4 shadow-xl"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Contactez{" "}
            <span className="bg-gradient-to-r from-[#0049ac] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wash&Go
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Une question, une demande ? Notre équipe est là pour vous accompagner 
            et redonner vie à votre véhicule avec un service premium.
          </p>
        </motion.div>

        {/* Main Content Grid - Espacements optimisés */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Contact Info Cards - Alignement amélioré */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-1 flex flex-col h-full gap-4"
          >
                         {/* Phone Card - Design amélioré */}
             <motion.div
               whileHover={{ y: -3, scale: 1.02 }}
               transition={{ duration: 0.3 }}
               className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex-shrink-0 relative overflow-hidden"
             >
               {/* Background decorative elements */}
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10"></div>
               <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-indigo-500/20 rounded-full translate-y-8 -translate-x-8"></div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg relative">
                     <Phone className="w-6 h-6 text-white" />
                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                   </div>
                   <div>
                     <h3 className="text-lg font-bold text-gray-900">Téléphone</h3>
                     <p className="text-sm text-gray-600">Service client disponible</p>
                   </div>
                 </div>
                 
                 <div className="space-y-3 mb-4">
                   <motion.div 
                     className="bg-white rounded-xl p-3 border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.2 }}
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                         <span className="text-sm font-semibold text-gray-700">Adrien</span>
                       </div>
                       <a 
                         href="tel:0622706000" 
                         className="text-lg font-bold text-gray-900 hover:text-green-600 transition-colors flex items-center gap-1 group"
                       >
                         06 22 70 60 00
                         <Phone className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </a>
                     </div>
                   </motion.div>
                   
                   <motion.div 
                     className="bg-white rounded-xl p-3 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.2 }}
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                         <span className="text-sm font-semibold text-gray-700">Clément</span>
                       </div>
                       <a 
                         href="tel:0623034700" 
                         className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 group"
                       >
                         06 23 03 47 00
                         <Phone className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </a>
                     </div>
                   </motion.div>
                 </div>
                 
                 <div className="flex gap-2">
                   <a
                     href="tel:0622706000"
                     className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm group"
                   >
                     <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                     Appeler Adrien
                   </a>
                   <a
                     href="tel:0623034700"
                     className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm group"
                   >
                     <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                     Appeler Clément
                   </a>
                 </div>
               </div>
             </motion.div>

            {/* Email Card - Alignement cohérent */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-[#0049ac] rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Email</h3>
                  <p className="text-xs text-gray-600">Support technique</p>
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900 mb-3">wash.go13@gmail.com</p>
              <a
                href="mailto:wash.go13@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-[#0049ac] text-white rounded-xl font-semibold hover:from-blue-600 hover:to-[#0049ac] transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Envoyer un email
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Service Info Card - Taille harmonisée */}
            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-2xl p-5 shadow-xl text-white flex-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Service Mobile</h3>
                  <p className="text-xs text-blue-100">Intervention à domicile</p>
                </div>
              </div>
              <p className="text-xs text-blue-100 mb-3">
                Nous nous déplaçons chez vous avec tout le matériel professionnel nécessaire pour un nettoyage parfait.
              </p>
              <div className="flex items-center gap-1 text-yellow-300">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs text-blue-100 ml-2">Service premium</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Map Section - Hauteur harmonisée */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
              <div className="p-5 border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#0049ac]" />
                  <h3 className="text-lg font-bold text-gray-900">Zone d'intervention</h3>
                </div>
                <p className="text-sm text-gray-600">Nous intervenons dans toute la région Provence-Alpes-Côte d'Azur</p>
              </div>
              <div className="flex-1 min-h-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46338.30571121762!2d5.512469848209386!3d43.45758855864135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c990845409b1db%3A0x40819a5fd970310!2s13710%20Fuveau!5e0!3m2!1sfr!2sfr!4v1754316697481!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Zone Checker - Espacements optimisés */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Social Media - Padding réduit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Suivez-nous</h3>
              <p className="text-sm text-gray-600">Découvrez nos réalisations et conseils sur nos réseaux sociaux</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61571447229404"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-semibold">Facebook</span>
              </motion.a>
              
              <motion.a
                href="https://www.instagram.com/washandgo13/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-semibold">Instagram</span>
              </motion.a>
              
              <motion.a
                href="https://www.tiktok.com/@washandgo13"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                <TikTokIcon />
                <span className="font-semibold">TikTok</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Zone Checker - Alignement cohérent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Vérifiez notre zone d'intervention
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Entrez le nom de votre commune pour vérifier si nous intervenons chez vous
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative group">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#0049ac] transition-colors duration-300" />
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#0049ac] to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-sm"
                >
                  Vérifier
                </motion.button>
              </div>

              {resultMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  className={`p-3 rounded-xl border ${resultMessage.bgColor} ${resultMessage.borderColor} shadow-sm`}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                      className={`p-1.5 rounded-lg ${resultMessage.bgColor}`}
                    >
                      <resultMessage.icon className={`w-4 h-4 ${resultMessage.color}`} />
                    </motion.div>
                    <motion.p 
                      className={`text-sm font-semibold ${resultMessage.color}`}
                      initial={{ opacity: 0, x: -8 }}
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
        </div>
      </div>
    </section>
  );
};

export default ContactSectionUltra; 