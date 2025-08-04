import React from 'react';
import CarteZones from './CarteZones';

const ZonesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Notre <span className="text-[#0049ac]">zone d'intervention</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wash&Go intervient dans plus de 25 communes des Bouches-du-Rhône et du Var. 
            Notre service de nettoyage professionnel est disponible dans votre secteur.
          </p>
        </div>

        {/* Carte interactive */}
        <div className="mb-8">
          <CarteZones />
        </div>

        {/* Informations complémentaires */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-[#0049ac] mb-3">
              🚗 Service mobile
            </h3>
            <p className="text-gray-700">
              Notre équipe se déplace directement chez vous avec tout le matériel nécessaire 
              pour un nettoyage professionnel de votre véhicule.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-700 mb-3">
              ⏰ Disponibilité
            </h3>
            <p className="text-gray-700">
              Nous intervenons du lundi au samedi, de 8h à 18h. 
              Réservation en ligne ou par téléphone pour un créneau adapté à vos besoins.
            </p>
          </div>
        </div>

        {/* Call-to-action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Vous ne voyez pas votre commune ? Contactez-nous !
          </p>
          <button className="bg-[#0049ac] text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default ZonesSection; 