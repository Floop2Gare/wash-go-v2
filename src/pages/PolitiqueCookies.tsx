import Footer from "../components/Accueil/Footer";

export default function PolitiqueCookies() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F52BA] mb-4 sm:mb-6">Politique d'utilisation des cookies</h1>

        <p className="mb-4 text-sm sm:text-base">
          Cette politique explique comment Wash&GO utilise les cookies sur son site web. En utilisant notre site, vous acceptez l'utilisation des cookies conformément à cette politique.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">1. Qu'est-ce qu'un cookie ?</h2>
        <p className="mb-4 text-sm sm:text-base">
          Un cookie est un petit fichier texte déposé sur votre ordinateur ou votre appareil mobile lors de votre visite sur un site web. Il permet au site de reconnaître votre appareil et de mémoriser certaines informations concernant vos préférences ou actions passées.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">2. Pourquoi utilisons-nous des cookies ?</h2>
        <p className="mb-4 text-sm sm:text-base">
          Nous utilisons des cookies pour :
        </p>
        <ul className="list-disc pl-4 sm:pl-6 mb-4 text-sm sm:text-base">
          <li>Améliorer la performance et la sécurité du site</li>
          <li>Analyser l'audience et les comportements de navigation</li>
          <li>Offrir une expérience utilisateur personnalisée</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">3. Types de cookies utilisés</h2>
        <ul className="list-disc pl-4 sm:pl-6 mb-4 text-sm sm:text-base">
          <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site.</li>
          <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du site.</li>
          <li><strong>Cookies de personnalisation :</strong> pour mémoriser vos préférences.</li>
          <li><strong>Cookies tiers :</strong> liés aux services comme Google Analytics ou les réseaux sociaux.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">4. Gérer les cookies</h2>
        <p className="mb-4 text-sm sm:text-base">
          Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter le bon fonctionnement du site.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-2">5. Contact</h2>
        <p className="text-sm sm:text-base">
          Pour toute question concernant notre politique de cookies, vous pouvez nous contacter à : <strong>wash.go13@gmail.com</strong>
        </p>
        <a href="/" className="text-[#0F52BA] underline hover:text-[#093b85] text-sm sm:text-base">Retour à l'accueil</a>
      </div>

      <Footer />
    </>
  );
}
