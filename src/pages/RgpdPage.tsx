import LegalPageLayout from "../components/legal/LegalPageLayout";

export default function RgpdPage() {
  return (
    <LegalPageLayout title="Respect du RGPD">
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700">
              Chez Wash&Go, nous nous engageons à respecter vos données personnelles conformément au
              Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>
        </section>

        {/* Finalités de la collecte */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            1. Finalités de la collecte
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <p className="text-gray-700 mb-4">
              Nous collectons uniquement les données nécessaires à la gestion de notre activité :
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-700">Prise de rendez-vous</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-gray-700">Gestion des paiements</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-gray-700">Communication avec le client</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-gray-700">Facturation et comptabilité</span>
              </div>
            </div>
          </div>
        </section>

        {/* Données collectées */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            2. Données collectées
          </h2>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-gray-700 mb-3">
                Les données personnelles collectées peuvent inclure :
              </p>
              <ul className="grid gap-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Nom et prénom</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Numéro de téléphone</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adresse email</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Plaque d'immatriculation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adresse postale</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Moyen de paiement</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Durée de conservation */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            3. Durée de conservation
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3 mt-1">
                <svg className="w-6 h-6 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">
                  Vos données sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités pour
                  lesquelles elles ont été collectées, soit 3 ans maximum après la dernière interaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Droits des utilisateurs */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            4. Droits des utilisateurs
          </h2>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">Droit d'accès</h3>
                <p className="text-gray-600 text-sm">
                  Vous pouvez obtenir une copie de vos données personnelles que nous détenons.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">Droit de rectification</h3>
                <p className="text-gray-600 text-sm">
                  Vous pouvez demander la correction de vos données si elles sont inexactes.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">Droit à l'effacement</h3>
                <p className="text-gray-600 text-sm">
                  Vous pouvez demander la suppression de vos données dans certains cas.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">Droit à la portabilité</h3>
                <p className="text-gray-600 text-sm">
                  Vous pouvez recevoir vos données dans un format structuré.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact DPO */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            5. Contact DPO
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700">Pour exercer vos droits ou pour toute question :</p>
                <a 
                  href="mailto:wash.go13@gmail.com" 
                  className="text-[#0049ac] hover:text-blue-700 font-medium transition-colors"
                >
                  wash.go13@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}