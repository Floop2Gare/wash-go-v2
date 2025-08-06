import Footer from "../components/Accueil/Footer";

export default function RgpdPage() {
    return (
      <>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 text-gray-800">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#0F52BA]">Respect du RGPD</h1>
    
          <p className="mb-4 text-sm sm:text-base">
            Chez Wash&Go, nous nous engageons à respecter vos données personnelles conformément au
            Règlement Général sur la Protection des Données (RGPD).
          </p>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">1. Finalités de la collecte</h2>
          <p className="mb-4 text-sm sm:text-base">
            Nous collectons uniquement les données nécessaires à la gestion de notre activité :
          </p>
          <ul className="list-disc pl-4 sm:pl-6 mb-4 text-sm sm:text-base">
            <li>Prise de rendez-vous</li>
            <li>Gestion des paiements</li>
            <li>Communication avec le client (email, SMS, téléphone)</li>
            <li>Facturation et comptabilité</li>
          </ul>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">2. Données collectées</h2>
          <p className="mb-4 text-sm sm:text-base">
            Les données personnelles collectées peuvent inclure : nom, prénom, numéro de téléphone, adresse
            email, plaque d'immatriculation, adresse postale et moyen de paiement.
          </p>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">3. Durée de conservation</h2>
          <p className="mb-4 text-sm sm:text-base">
            Vos données sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités pour
            lesquelles elles ont été collectées, soit 3 ans maximum après la dernière interaction.
          </p>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">4. Droits des utilisateurs</h2>
          <p className="mb-4 text-sm sm:text-base">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-4 sm:pl-6 mb-4 text-sm sm:text-base">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition ou de limitation</li>
          </ul>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">5. Sécurité des données</h2>
          <p className="mb-4 text-sm sm:text-base">
            Vos données sont hébergées en France sur des serveurs sécurisés et ne sont jamais revendues ni
            partagées sans votre consentement explicite.
          </p>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">6. Paiement sécurisé</h2>
          <p className="mb-4 text-sm sm:text-base">
            Les paiements sont réalisés en espèces ou par carte bancaire via des terminaux sécurisés. Une
            facture peut être émise sur demande.
          </p>
    
          <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">7. Contact</h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-[#0F52BA] mb-4">Contact pour vos droits RGPD</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-[#0F52BA] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email :</span>
                  <a href="mailto:wash.go13@gmail.com" className="text-[#0F52BA] hover:underline font-semibold ml-2">wash.go13@gmail.com</a>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Téléphone :</span>
                  </div>
                </div>
                
                <div className="ml-11 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Adrien :</span>
                    <a href="tel:0622706000" className="text-[#0F52BA] hover:underline font-semibold">06 22 70 60 00</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Clément :</span>
                    <a href="tel:0623034700" className="text-[#0F52BA] hover:underline font-semibold">06 23 03 47 00</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/" className="text-[#0F52BA] underline hover:text-[#093b85] text-sm sm:text-base">Retour à l'accueil</a>
        </div>

        <Footer />
      </>
    );
  }
  