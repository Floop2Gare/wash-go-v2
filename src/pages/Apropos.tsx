import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Users, Heart, Award, Target, Zap, MapPin } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Accueil/Footer";

// Icônes SVG personnalisées dans le style de la page Accueil
const TeamIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ValuesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const QualityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const Apropos: React.FC = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Style immersif comme les autres pages */}
        <section className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 text-white text-center" 
                 style={{ backgroundImage: "url('/about/nous.png')" }}>
          <div className="absolute inset-0 bg-black/70 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-4 sm:space-y-6 md:space-y-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
                À propos de{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Wash&Go
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
                Découvrez notre équipe et notre vision pour révolutionner le nettoyage automobile à domicile.
              </p>
              
              {/* Bouton CTA */}
              <motion.button
                onClick={scrollToTeam}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-sm sm:text-base md:text-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Découvrir notre équipe</span>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-1" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Section Pourquoi choisir Wash&GO ? */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-white to-slate-300">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Pourquoi choisir{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Wash&GO
                </span>{" "}?
              </h2>
                          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2">
              Wash&GO est fondé et géré par deux étudiants sérieux et motivés, avec une vraie culture du service et de la qualité.
              Notre approche humaine et professionnelle garantit une proximité et un engagement total envers chaque client.
            </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                          {[
              { icon: TeamIcon, title: "Équipe Étudiante", desc: "Jeunes entrepreneurs motivés et sérieux", bg: "bg-gradient-to-br from-blue-500 to-blue-600" },
              { icon: ValuesIcon, title: "Valeurs Humaines", desc: "Proximité et engagement client", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
              { icon: QualityIcon, title: "Culture Qualité", desc: "Excellence et professionnalisme", bg: "bg-gradient-to-br from-purple-500 to-purple-600" },
            ].map(({ icon: Icon, title, desc, bg }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center h-full border border-gray-100"
                >
                  <div className={`h-12 h-12 sm:w-14 sm:h-14 ${bg} rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-inner`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Notre Équipe */}
        <section id="team-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 via-white to-slate-300">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Notre{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Équipe
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2">
                Deux jeunes entrepreneurs passionnés qui ont décidé de révolutionner le nettoyage automobile
              </p>
            </motion.div>

            {/* Clément */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20"
            >
              {/* Image Clément */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3 group-hover:rotate-4 sm:group-hover:rotate-6 transition-transform duration-300"></div>
                  <img
                    src="/about/clement.png"
                    alt="Clément - Co-fondateur Wash&Go"
                    className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"
                  />
                </div>
              </motion.div>

              {/* Texte Clément */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl border border-gray-100">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Clément
                    </span>
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    Clément, 22 ans, est actuellement en BTS Professions Immobilières à Aix-en-Provence. Rigoureux et impliqué, 
                    il combine ses études avec son engagement terrain chez Wash&Go, où il met son sens du service et de l'organisation 
                    au service des clients. Cette double expérience lui a forgé un œil redoutable pour les détails et un vrai sens 
                    du contact humain. Co-fondateur de Wash&Go, il est le moteur de nos opérations terrain : c'est lui qui s'assure 
                    que chaque client vive une expérience impeccable. Son approche ? Allier l'exigence du secteur immobilier à la 
                    proximité du service à domicile.
                  </p>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Co-fondateur</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Adrien */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
            >
              {/* Texte Adrien */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl border border-gray-100">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Adrien
                    </span>
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                    Adrien, 20 ans, étudie les Techniques de Commercialisation à l'IUT d'Aix-Marseille tout en évoluant comme commercial 
                    dans le secteur BTP. Cette immersion dans l'univers du bâtiment lui a donné une vision pragmatique des besoins clients. 
                    Entrepreneur dans l'âme, il a imaginé Wash&Go comme bien plus qu'un simple service : une vraie révolution du nettoyage à domicile. 
                    Son rôle ? Développer la stratégie commerciale et porter la vision long terme qui fera de Wash&Go la référence de demain.
                  </p>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Co-fondateur</span>
                  </div>
                </div>
              </motion.div>

              {/* Image Adrien */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl transform -rotate-2 sm:-rotate-3 group-hover:-rotate-4 sm:group-hover:-rotate-6 transition-transform duration-300"></div>
                  <img
                    src="/about/adrien.png"
                    alt="Adrien - Co-fondateur Wash&Go"
                    className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section Notre Vision - Refonte complète */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 sm:mb-6">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Notre{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>
            </motion.div>
            
            {/* Citation inspirante */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-lg sm:shadow-xl">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-4 sm:mb-6 text-blue-200" />
                <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed max-w-3xl sm:max-w-4xl mx-auto">
                  "Rendre le nettoyage automobile plus simple, plus flexible, plus humain"
                </blockquote>
              </div>
            </motion.div>

            {/* Grille des valeurs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Simplicité</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Une approche directe et efficace, sans complication inutile. 
                  Nous rendons le nettoyage automobile accessible à tous.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-indigo-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Flexibilité</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Service à domicile, créneaux adaptés, solutions sur-mesure. 
                  Nous nous adaptons à vos besoins, pas l'inverse.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-purple-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Humain</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Une équipe locale, des étudiants passionnés, un service personnalisé. 
                  L'humain au cœur de notre démarche.
                </p>
              </div>
            </motion.div>

            {/* Section Ambition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Notre{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Ambition
                  </span>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Créer un modèle duplicable</h4>
                      <p className="text-sm sm:text-base text-gray-700">Développer un concept qui peut être reproduit à l'échelle nationale, 
                      permettant à d'autres étudiants de travailler avec nous.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Répondre à un besoin réel</h4>
                      <p className="text-sm sm:text-base text-gray-700">Proposer une alternative flexible, humaine et qualitative 
                      au nettoyage de véhicules à domicile.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Approche locale et sur-mesure</h4>
                      <p className="text-sm sm:text-base text-gray-700">Une solution adaptée aux besoins spécifiques de chaque client, 
                      avec une présence locale et un service personnalisé.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-lg sm:shadow-xl">
                <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Notre Mission</h4>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                  Notre ambition est double : proposer une solution de nettoyage sur-mesure réellement adaptée aux besoins des clients, 
                  tout en permettant à d'autres étudiants de travailler avec nous.
                </p>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6" />
                  <span className="font-semibold text-sm sm:text-base">À terme, nous voulons développer ce modèle à l'échelle nationale</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Apropos; 