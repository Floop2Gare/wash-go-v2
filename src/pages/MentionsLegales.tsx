import LegalPageLayout from "../components/legal/LegalPageLayout";

export default function MentionsLegales() {
  return (
    <LegalPageLayout title="Mentions légales">
      {/* Informations générales */}
      <div className="space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Informations générales
          </h2>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6 mb-6">
            <p className="font-medium text-gray-900 mb-2">Site : Washngo.fr</p>
            <p className="font-medium text-gray-900 mb-4">Responsables :</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Adrien */}
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">ADRIEN ESTRUCH</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><span className="font-medium text-gray-700">SIREN :</span> 982 913 980</li>
                  <li><span className="font-medium text-gray-700">SIRET :</span> 982 913 980 00016</li>
                  <li><span className="font-medium text-gray-700">Adresse :</span> 182 CHE du Coulet, 13119 Saint-Savournin, FRANCE</li>
                  <li><span className="font-medium text-gray-700">Code APE :</span> 96.09Z - Autres services personnels n.c.a.</li>
                  <li><span className="font-medium text-gray-700">Statut :</span> Entrepreneur individuel</li>
                </ul>
              </div>

              {/* Clément */}
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-[#0049ac] mb-3">RIHET Clément</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><span className="font-medium text-gray-700">SIREN :</span> 942 248 352</li>
                  <li><span className="font-medium text-gray-700">SIRET :</span> 942 248 352 00018</li>
                  <li><span className="font-medium text-gray-700">Adresse :</span> Rousset, France</li>
                  <li><span className="font-medium text-gray-700">Code APE :</span> 45.20A - Entretien et réparation de véhicules automobiles légers</li>
                  <li><span className="font-medium text-gray-700">Statut :</span> Entrepreneur individuel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Activité */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Activité
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700">
              Wash&Go est un service de nettoyage automobile professionnel à domicile ou sur rendez-vous. 
              Les prestations sont réalisées exclusivement dans le département des Bouches-du-Rhône (13).
            </p>
          </div>
        </section>

        {/* Paiement */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Paiement
          </h2>
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <p className="text-gray-700 mb-3">Les prestations sont payables :</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-gray-700">En espèces</span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-[#0049ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <span className="text-gray-700">Par carte bancaire</span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-sm">Une facture peut être émise sur simple demande.</p>
          </div>
        </section>

        {/* RGPD */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Données personnelles / RGPD
          </h2>
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <p className="text-gray-700 mb-4">
                Les informations collectées via les formulaires du site ne sont jamais revendues ni transmises 
                à des tiers. Elles sont conservées uniquement dans le cadre de la relation client.
              </p>
              <p className="text-gray-700">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un 
                droit d'accès, de modification et de suppression de vos données personnelles en nous contactant à :
              </p>
              <a 
                href="mailto:wash.go13@gmail.com" 
                className="inline-flex items-center mt-3 text-[#0049ac] hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                wash.go13@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Assurance */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Assurance responsabilité civile professionnelle
          </h2>
          <div className="bg-green-50 rounded-xl p-4 sm:p-6">
            <div className="bg-white rounded-lg p-4 border border-green-100">
              <p className="text-gray-700 mb-4">
                Wash&Go est couvert par une assurance responsabilité civile professionnelle auprès de :
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Hiscox Assurances</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-medium">N° de contrat :</span> HSXIN320063418A</li>
                  <li><span className="font-medium">Catégorie :</span> Assurances professionnelles – Autres Services</li>
                  <li><span className="font-medium">Validité :</span> du 10 avril 2025 au 9 avril 2026</li>
                  <li><span className="font-medium">Couverture :</span> Monde entier hors USA/Canada</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Activité garantie :</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Services à la personne</li>
                  <li>• Nettoyage de véhicules (hors station de lavage)</li>
                </ul>
              </div>

              <p className="text-gray-600 text-sm">
                Cette attestation est consultable sur demande par toute autorité compétente ou client en cas de besoin.
              </p>
            </div>
          </div>
        </section>

        {/* Hébergement et nom de domaine */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#0049ac] mb-4">
            Hébergement et nom de domaine
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Hébergeur */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Hébergeur</h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 mb-2">
                  <strong>Vercel Inc.</strong>
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789<br />
                  États-Unis
                </p>
                <a 
                  href="https://vercel.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0049ac] hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  vercel.com
                </a>
              </div>
            </div>

            {/* Nom de domaine */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Nom de domaine</h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 mb-2">
                  <strong>OVH SAS</strong>
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  2 rue Kellermann<br />
                  59100 Roubaix<br />
                  France
                </p>
                <a 
                  href="https://www.ovh.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0049ac] hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  ovh.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}