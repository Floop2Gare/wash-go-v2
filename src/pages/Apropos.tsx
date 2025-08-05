import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Accueil/Footer";
import { Users, Target, Heart, Award, ArrowRight, Sparkles, Zap, MapPin } from "lucide-react";

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
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6 sm:space-y-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 sm:space-y-6"
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
                className="relative inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-base sm:text-lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Découvrir notre équipe</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Section Notre Équipe */}
        <section id="team-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Notre{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Équipe
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Deux jeunes entrepreneurs passionnés qui ont décidé de révolutionner le nettoyage automobile
              </p>
            </motion.div>

            {/* Clément */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <img
                    src="/about/clement.png"
                    alt="Clément - Co-fondateur Wash&Go"
                    className="relative w-full h-96 sm:h-[500px] object-cover rounded-3xl shadow-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"
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
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Clément
                    </span>
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Clément, 21 ans, est étudiant en école d'agent immobilier et en alternance dans une agence immobilière. 
                    Il a décidé de se lancer dans Wash&Go car il aime l'entrepreneuriat, et le fait de répondre à des besoins 
                    concrets avec des solutions simples et efficaces.
                  </p>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Co-fondateur</span>
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
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Texte Adrien */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Adrien
                    </span>
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Adrien, 20 ans, est étudiant à l'IUT d'Aix-Marseille en BUT Techniques de Commercialisation. 
                    Il est en alternance dans une entreprise du bâtiment en tant que commercial. Passionné par l'entrepreneuriat, 
                    il a co-fondé Wash&Go avec Clément pour développer un projet utile, professionnel, et formateur.
                  </p>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Co-fondateur</span>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
                  <img
                    src="/about/adrien.png"
                    alt="Adrien - Co-fondateur Wash&Go"
                    className="relative w-full h-96 sm:h-[500px] object-cover rounded-3xl shadow-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section Notre Vision - Refonte complète */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
              className="text-center mb-16"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-blue-200" />
                <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed max-w-4xl mx-auto">
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
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-100 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simplicité</h3>
                <p className="text-gray-700 leading-relaxed">
                  Une approche directe et efficace, sans complication inutile. 
                  Nous rendons le nettoyage automobile accessible à tous.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-lg border border-indigo-100 text-center">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Flexibilité</h3>
                <p className="text-gray-700 leading-relaxed">
                  Service à domicile, créneaux adaptés, solutions sur-mesure. 
                  Nous nous adaptons à vos besoins, pas l'inverse.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-purple-100 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Humain</h3>
                <p className="text-gray-700 leading-relaxed">
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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Ambition
                  </span>
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Créer un modèle duplicable</h4>
                      <p className="text-gray-700">Développer un concept qui peut être reproduit à l'échelle nationale, 
                      permettant à d'autres étudiants de travailler avec nous.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Répondre à un besoin réel</h4>
                      <p className="text-gray-700">Proposer une alternative flexible, humaine et qualitative 
                      au nettoyage de véhicules à domicile.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Approche locale et sur-mesure</h4>
                      <p className="text-gray-700">Une solution adaptée aux besoins spécifiques de chaque client, 
                      avec une présence locale et un service personnalisé.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
                <h4 className="text-2xl font-bold mb-6">Notre Mission</h4>
                <p className="text-lg leading-relaxed mb-6">
                  Notre ambition est double : proposer une solution de nettoyage sur-mesure réellement adaptée aux besoins des clients, 
                  tout en permettant à d'autres étudiants de travailler avec nous.
                </p>
                <div className="flex items-center space-x-2">
                  <Target className="w-6 h-6" />
                  <span className="font-semibold">À terme, nous voulons développer ce modèle à l'échelle nationale</span>
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