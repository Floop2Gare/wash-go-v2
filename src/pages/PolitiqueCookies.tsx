import LegalPageLayout from "../components/legal/LegalPageLayout";

export default function PolitiqueCookies() {
  return (
    <LegalPageLayout title="Politique d'utilisation des cookies">
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700">
              Cette politique explique comment Wash&GO utilise les cookies sur son site web. 
              En utilisant notre site, vous acceptez l'utilisation des cookies conformément à cette politique.
            </p>
          </div>
        </section>

        {/* Qu'est-ce qu'un cookie ? */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            1. Qu'est-ce qu'un cookie ?
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3 mt-1">
                <svg className="w-6 h-6 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700">
                Un cookie est un petit fichier texte déposé sur votre ordinateur ou votre appareil mobile 
                lors de votre visite sur un site web. Il permet au site de reconnaître votre appareil et 
                de mémoriser certaines informations concernant vos préférences ou actions passées.
              </p>
            </div>
          </div>
        </section>

        {/* Pourquoi utilisons-nous des cookies ? */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            2. Pourquoi utilisons-nous des cookies ?
          </h2>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700 mb-4">Nous utilisons des cookies pour :</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-100 rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  Améliorer la performance et la sécurité du site
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-100 rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  Analyser l'audience et les comportements de navigation
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-100 rounded-full p-2 mb-3 w-10 h-10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  Offrir une expérience utilisateur personnalisée
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types de cookies utilisés */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            3. Types de cookies utilisés
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-[#0049ac] mb-3 flex items-center">
                <span className="bg-blue-100 rounded-full p-2 mr-2">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                Cookies essentiels
              </h3>
              <p className="text-gray-600 text-sm">
                Nécessaires au fonctionnement du site.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-[#0049ac] mb-3 flex items-center">
                <span className="bg-blue-100 rounded-full p-2 mr-2">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Cookies de performance
              </h3>
              <p className="text-gray-600 text-sm">
                Pour analyser l'utilisation du site.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-[#0049ac] mb-3 flex items-center">
                <span className="bg-blue-100 rounded-full p-2 mr-2">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
                Cookies de personnalisation
              </h3>
              <p className="text-gray-600 text-sm">
                Pour mémoriser vos préférences.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-[#0049ac] mb-3 flex items-center">
                <span className="bg-blue-100 rounded-full p-2 mr-2">
                  <svg className="w-4 h-4 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </span>
                Cookies tiers
              </h3>
              <p className="text-gray-600 text-sm">
                Liés aux services comme Google Analytics ou les réseaux sociaux.
              </p>
            </div>
          </div>
        </section>

        {/* Gérer les cookies */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            4. Gérer les cookies
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700 mb-6">
              Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur. 
              Notez que la désactivation de certains cookies peut affecter le bon fonctionnement du site.
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-[#0049ac] mb-3">Contact</h3>
              <p className="text-gray-700 mb-2">
                Pour toute question concernant notre politique de cookies, vous pouvez nous contacter à :
              </p>
              <a 
                href="mailto:wash.go13@gmail.com" 
                className="text-[#0049ac] hover:text-blue-700 font-medium transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                wash.go13@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}