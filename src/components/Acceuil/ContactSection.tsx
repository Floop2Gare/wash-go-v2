import { motion } from 'framer-motion';
import { Facebook, Instagram } from 'lucide-react';
import React from 'react';

const TikTokIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="h-5 w-5"
  >
    <path d="M12.75 2c.473 0 .856.383.856.856a5.15 5.15 0 0 0 5.143 5.144.857.857 0 0 1 .856.857v2.174a.857.857 0 0 1-.857.857 7.5 7.5 0 0 1-3.145-.7v6.595a5.429 5.429 0 1 1-5.429-5.428c.169 0 .336.01.5.027v2.093a2.571 2.571 0 1 0 2.571 2.572v-13A.857.857 0 0 1 12.75 2Z" />
  </svg>
);

const ContactSection: React.FC = () => {
  return (
    <section id="contact-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Contactez <span className="text-[#0F52BA]">Wash&Go</span>
          </h2>
          <p className="text-lg text-gray-600">
            Une question, une demande&nbsp;? On est là pour vous aider à redonner vie à votre voiture.
          </p>
        </motion.div>

        {/* Carte + infos */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-2xl border"
          >
            <iframe
              title="Zone d'intervention Wash&GO"
              className="w-full h-[400px] border-0"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44761.78255830745!2d5.12142015!3d43.4810434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c7016aa0d9a5%3A0x2a3c087b43e7e6ed!2sBouches-du-Rh%C3%B4ne!5e0!3m2!1sfr!2sfr!4v1712820000000!5m2!1sfr!2sfr"
            />
          </motion.div>

          {/* Infos contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0F52BA]">Zone d’intervention</h3>
              <p className="text-gray-700">Bouches-du-Rhône (13)</p>
            </div>

            <div className="text-gray-700 space-y-1 text-base">
              <p><strong>Téléphone :</strong> 06 22 70 60 00</p>
              <p><strong>Email :</strong> wash.go13@gmail.com</p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="tel:0622706000"
                className="py-3 px-5 bg-[#0F52BA] text-white rounded-full text-center hover:bg-[#093b85] transition"
              >
                📞 Nous appeler
              </a>
              <a
                href="mailto:wash.go13@gmail.com"
                className="py-3 px-5 border border-[#0F52BA] text-[#0F52BA] rounded-full text-center hover:bg-[#0F52BA] hover:text-white transition"
              >
                ✉️ Nous écrire
              </a>
            </div>

            <div className="pt-4">
              <h4 className="text-sm text-gray-600 mb-2">Retrouvez-nous sur :</h4>
              <div className="flex gap-4 items-center flex-wrap">
                <a
                  href="https://www.facebook.com/profile.php?id=61571447229404"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#0F52BA] hover:text-[#093b85] transition"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/washandgo13/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@washandgo13"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-black hover:text-gray-700 transition"
                >
                  <TikTokIcon />
                  <span className="text-sm font-medium">TikTok</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
