import { ShoppingCart, Star, CheckCircle, Truck } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

export default function Produits() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-24 px-6 text-center text-white"
          style={{ backgroundImage: "url('/2d/produit.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-extrabold mb-4">Nos produits professionnels</h1>
            <p className="text-xl text-gray-100 mb-6">
              Découvrez notre sélection de produits haut de gamme pour l'entretien automobile.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
              <ShoppingCart size={20} /> Acheter maintenant
            </button>
          </div>
        </section>

        {/* Produits */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={`/products/produit${i}.jpg`}
                  alt={`Produit ${i}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Produit Professionnel {i}</h3>
                    <p className="text-gray-600 mb-4">
                      Nettoie efficacement sans abîmer les surfaces. Formule biodégradable et concentrée.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-lg">19,90 €</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Garantie / Livraison / Avis */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold">Garantie satisfait ou remboursé</h4>
              <p className="text-gray-600 text-sm mt-2">
                14 jours pour changer d'avis après réception.
              </p>
            </div>
            <div>
              <Truck className="w-10 h-10 text-blue-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold">Livraison rapide</h4>
              <p className="text-gray-600 text-sm mt-2">
                Livraison en 48h en France métropolitaine.
              </p>
            </div>
            <div>
              <Star className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold">Note moyenne 4,8/5</h4>
              <p className="text-gray-600 text-sm mt-2">
                Plus de 500 clients satisfaits partout en France.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}