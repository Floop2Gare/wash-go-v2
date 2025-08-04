import { Facebook, Instagram, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.75 2c.473 0 .856.383.856.856a5.15 5.15 0 0 0 5.143 5.144.857.857 0 0 1 .856.857v2.174a.857.857 0 0 1-.857.857 7.5 7.5 0 0 1-3.145-.7v6.595a5.429 5.429 0 1 1-5.429-5.428c.169 0 .336.01.5.027v2.093a2.571 2.571 0 1 0 2.571 2.572v-13A.857.857 0 0 1 12.75 2Z" />
  </svg>
);

const ContactSection = () => {
  const villes = [
    "Aubagne", "Auriol", "Roquevaire", "La Destrousse", "Peypin",
    "La Bouilladisse", "Belcodène", "Cadolive", "Saint-Savournin", "Mimet",
    "Gréasque", "Gardanne", "Fuveau", "Meyreuil", "Rousset",
    "Trets", "Peynier", "Châteauneuf-le-Rouge", "Pourcieux", "Pourrières",
    "Saint-Zacharie", "Saint-Maximin-la-Sainte-Baume", "Gémenos", "Carnoux-en-Provence", "Allauch",
    "Plan-de-Cuques", "Château-Gombert", "Bouc-Bel-Air", "Simiane-Collongue", "Cabriès"
  ];

  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contactez <span className="text-[#0049ac]">Wash&Go</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Une question, une demande&nbsp;? On est là pour vous aider à redonner vie à votre voiture.
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-20">
          {/* Infos dans un bloc cadré à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border shadow-xl rounded-2xl p-8 space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0049ac]">Service mobile</h3>
              <p className="text-gray-700">
                Nous nous déplaçons chez vous avec tout le matériel nécessaire
              </p>
            </div>

            <div className="text-gray-800 space-y-1 text-base">
              <p>📞 06 22 70 60 00</p>
              <p>📧 wash.go13@gmail.com</p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="tel:0622706000"
                className="py-2.5 px-5 bg-[#0049ac] text-white rounded-full text-sm text-center hover:bg-blue-800 transition"
              >
                📞 Nous appeler
              </a>
              <a
                href="mailto:wash.go13@gmail.com"
                className="py-2.5 px-5 border border-[#0049ac] text-[#0049ac] rounded-full text-sm text-center hover:bg-[#0049ac] hover:text-white transition"
              >
                ✉️ Nous écrire
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Retrouvez-nous sur :</p>
              <div className="flex gap-4 items-center flex-wrap">
                <a
                  href="https://www.facebook.com/profile.php?id=61571447229404"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0049ac] hover:text-blue-800 transition flex items-center gap-1"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/washandgo13/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-600 hover:text-pink-700 transition flex items-center gap-1"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@washandgo13"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black hover:text-gray-700 transition flex items-center gap-1"
                >
                  <TikTokIcon />
                  <span className="text-sm">TikTok</span>
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
              height="400"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] border-0"
            ></iframe>
          </motion.div>
        </div>

        {/* Section des villes d'intervention - Design amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* En-tête de la section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0049ac] to-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                Notre zone d'intervention
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous intervenons à domicile dans un large périmètre autour d'Aubagne et des Bouches-du-Rhône
            </p>
          </div>

          {/* Grille des villes */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {villes.map((ville, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium leading-relaxed">
                      {ville}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note finale */}
            <div className="text-center mt-8 pt-6 border-t border-blue-200">
              <p className="text-sm text-gray-600">
                Et bien d'autres communes des Bouches-du-Rhône et du Var Sur Devis !
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Service mobile disponible dans votre secteur
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
