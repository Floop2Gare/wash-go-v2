import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Accueil/Footer";
import TextileTypeStep from "../components/textile/components/TextileTypeStep";
import TextileMaterialStep from "../components/textile/components/TextileMaterialStep";
import TextileMatelasSizeStep from "../components/textile/components/TextileMatelasSizeStep";
import TextileOptionsStep from "../components/textile/components/TextileOptionsStep";
import TextileContactStep from "../components/textile/components/TextileContactStep";
import TextileChairsQuantityStep from "../components/textile/components/TextileChairsQuantityStep";
import TextileChairsMaterialStep from "../components/textile/components/TextileChairsMaterialStep";
import TextileTapisSurfaceStep from "../components/textile/components/TextileTapisSurfaceStep";

import TextileVerticalProgressBar from "../components/textile/components/TextileVerticalProgressBar";
import TextileTotalSummary from "../components/textile/components/TextileTotalSummary";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Textile() {
  const heroRef = useRef(null);
  const [textileType, setTextileType] = useState(null);
  const [textileMaterial, setTextileMaterial] = useState(null);
  const [textileMatelasSize, setTextileMatelasSize] = useState(null);
  const [textileChairsQuantity, setTextileChairsQuantity] = useState(null);
  const [textileChairsMaterial, setTextileChairsMaterial] = useState(null);
  const [textileTapisSurface, setTextileTapisSurface] = useState(null);

  const [textileOptions, setTextileOptions] = useState({ value: [], price: 0, time: 0 });
  const [showMaterialStep, setShowMaterialStep] = useState(false);
  const [showMatelasSizeStep, setShowMatelasSizeStep] = useState(false);
  const [showChairsQuantityStep, setShowChairsQuantityStep] = useState(false);
  const [showChairsMaterialStep, setShowChairsMaterialStep] = useState(false);
  const [showTapisSurfaceStep, setShowTapisSurfaceStep] = useState(false);

  const [showOptionsStep, setShowOptionsStep] = useState(false);
  const [showContactStep, setShowContactStep] = useState(false);
  const [summaryMobileOpen, setSummaryMobileOpen] = useState(false);

  const handleTextileTypeSelect = (data) => {
    // Vérifier si l'utilisateur change réellement de type textile
    const isChangingType = !textileType || textileType.value !== data.value;
    
    if (isChangingType) {
      // 🔄 RÉINITIALISATION COMPLÈTE de tous les états pour éviter les parcours parallèles
      console.log("🔄 Réinitialisation complète - changement de type:", textileType?.value, "→", data.value);
      
            // Réinitialiser TOUS les états de données des autres parcours
      setTextileMaterial(null);
      setTextileMatelasSize(null);
      setTextileChairsQuantity(null);
      setTextileChairsMaterial(null);
      setTextileTapisSurface(null);

      setTextileOptions({ value: [], price: 0, time: 0 });
      
      // Réinitialiser TOUS les états d'affichage
      setShowMaterialStep(false);
      setShowMatelasSizeStep(false);
      setShowChairsQuantityStep(false);
      setShowChairsMaterialStep(false);
      setShowTapisSurfaceStep(false);
  
      setShowOptionsStep(false);
      setShowContactStep(false);
      setSummaryMobileOpen(false); // Fermer le mobile summary si ouvert
    }
    
    // Maintenant, définir le nouveau type textile sélectionné
    setTextileType(data);
    
    console.log("🔍 Sélection type textile:", data.value);
    
    // Logique conditionnelle selon le type sélectionné
    if (data.value === "Matelas") {
      // Pour Matelas : afficher la sélection de taille
      setShowMatelasSizeStep(true);
      
      // Scroll automatique vers l'étape suivante après un délai
      setTimeout(() => {
        const matelasSizeElement = document.getElementById('textile-matelas-size');
        if (matelasSizeElement) {
          matelasSizeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else if (data.value === "Chaises") {
      // Pour Chaises : afficher la sélection du nombre de chaises
      setShowChairsQuantityStep(true);
      
      // Scroll automatique vers l'étape suivante après un délai
      setTimeout(() => {
        const chairsQuantityElement = document.getElementById('textile-chairs-quantity');
        if (chairsQuantityElement) {
          chairsQuantityElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else if (data.value === "Tapis") {
      // Pour Tapis : afficher la sélection de surface
      setShowTapisSurfaceStep(true);
      
      // Scroll automatique vers l'étape suivante après un délai
      setTimeout(() => {
        const tapisSurfaceElement = document.getElementById('textile-tapis-surface');
        if (tapisSurfaceElement) {
          tapisSurfaceElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const handleTextileMaterialSelect = (data) => {
    setTextileMaterial(data);
    
    // Pour Tapis : passer directement aux options
    setShowOptionsStep(true);
    
    // Scroll automatique vers l'étape des options après un délai
    setTimeout(() => {
      const optionsElement = document.getElementById('textile-options');
      if (optionsElement) {
        optionsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTextileMatelasSizeSelect = (data) => {
    setTextileMatelasSize(data);
    // Passer directement aux options pour les matelas
    setShowOptionsStep(true);
    
    // Scroll automatique vers l'étape des options après un délai
    setTimeout(() => {
      const optionsElement = document.getElementById('textile-options');
      if (optionsElement) {
        optionsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTextileChairsQuantitySelect = (data) => {
    setTextileChairsQuantity(data);
    // Passer à la sélection de matière pour les chaises
    setShowChairsMaterialStep(true);
    
    // Scroll automatique vers l'étape de sélection de matière après un délai
    setTimeout(() => {
      const chairsMaterialElement = document.getElementById('textile-chairs-material');
      if (chairsMaterialElement) {
        chairsMaterialElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTextileChairsMaterialSelect = (data) => {
    setTextileChairsMaterial(data);
    // Passer directement aux options pour les chaises
    setShowOptionsStep(true);
    
    // Scroll automatique vers l'étape des options après un délai
    setTimeout(() => {
      const optionsElement = document.getElementById('textile-options');
      if (optionsElement) {
        optionsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTextileTapisSurfaceSelect = (data) => {
    setTextileTapisSurface(data);
    setShowMaterialStep(true);
    
    // Scroll automatique vers l'étape matière après un délai
    setTimeout(() => {
      const materialElement = document.getElementById('textile-material');
      if (materialElement) {
        materialElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleTextileOptionsSelect = (data) => {
    setTextileOptions(data);
    // Passer au formulaire de contact
    setShowContactStep(true);
    
    // Scroll automatique vers l'étape de contact après un délai
    setTimeout(() => {
      const contactElement = document.getElementById('textile-contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleStartClick = () => {
    // Scroll vers la première étape
    const firstStepElement = document.getElementById('textile-steps');
    if (firstStepElement) {
      firstStepElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setTextileType(null);
    setTextileMaterial(null);
    setTextileMatelasSize(null);
    setTextileChairsQuantity(null);
    setTextileChairsMaterial(null);
    setTextileTapisSurface(null);

    setTextileOptions({ value: [], price: 0, time: 0 });
    setShowMaterialStep(false);
    setShowMatelasSizeStep(false);
    setShowChairsQuantityStep(false);
    setShowChairsMaterialStep(false);
    setShowTapisSurfaceStep(false);

    setShowOptionsStep(false);
    setShowContactStep(false);
    setSummaryMobileOpen(false); // Fermer le mobile summary si ouvert
    
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculer le prix et temps total
  const chairsQuantityPrice = textileChairsQuantity ? (textileChairsQuantity.price || 0) : 0;
  const chairsMaterialPrice = textileChairsMaterial && textileChairsQuantity ? 
    (textileChairsMaterial.price || 0) * (textileChairsQuantity.quantity || 1) : 0;
  const chairsQuantityTime = textileChairsQuantity ? (textileChairsQuantity.time || 0) : 0;
  const chairsMaterialTime = textileChairsMaterial && textileChairsQuantity ? 
    (textileChairsMaterial.time || 0) * (textileChairsQuantity.quantity || 1) : 0;

  // Calculs pour les tapis
  const tapisSurfacePrice = textileTapisSurface ? (textileTapisSurface.price || 0) : 0;
  const tapisSurfaceTime = textileTapisSurface ? (textileTapisSurface.time || 0) : 0;




  const totalPrice = (textileType?.price || 0) + (textileMaterial?.price || 0) + (textileMatelasSize?.price || 0) + 
    chairsQuantityPrice + chairsMaterialPrice + tapisSurfacePrice + textileOptions.price;
  const totalTime = (textileType?.time || 0) + (textileMaterial?.time || 0) + (textileMatelasSize?.time || 0) + 
    chairsQuantityTime + chairsMaterialTime + tapisSurfaceTime + textileOptions.time;

  // Préparer les sélections pour le formulaire de contact et la progress bar
  const selections = [
    textileType ? { step: "Type de textile", value: textileType.value } : null,
    textileMaterial ? { step: "Matière", value: textileMaterial.value } : null,
    textileMatelasSize ? { step: "Taille du matelas", value: textileMatelasSize.value } : null,
    textileChairsQuantity ? { step: "Nombre de chaises", value: `${textileChairsQuantity.quantity} chaise${textileChairsQuantity.quantity > 1 ? 's' : ''}` } : null,
    textileChairsMaterial ? { step: "Matière des chaises", value: textileChairsMaterial.value } : null,
    textileTapisSurface ? { step: "Surface du tapis", value: textileTapisSurface.value } : null,

    textileOptions.value.length ? { step: "Options supplémentaires", value: textileOptions.value } : null,
  ].filter(Boolean);

  // Déterminer le nombre total d'étapes selon le type de textile
  const totalSteps = textileType?.value === "Matelas" ? 3 : textileType?.value === "Chaises" ? 4 : textileType?.value === "Tapis" ? 4 : 3; // Matelas: Type → Taille → Options, Chaises: Type → Quantité → Matière → Options, Tapis: Type → Surface → Matière → Options

  return (
    <>
      <Navbar />

      {/* Progress Bar et Summary */}
      {selections.length > 0 && (
        <>
          <TextileVerticalProgressBar selections={selections} totalSteps={totalSteps} />
          <TextileTotalSummary 
            price={totalPrice} 
            time={totalTime} 
            onReset={handleReset}
            mobileOpen={summaryMobileOpen}
            setMobileOpen={setSummaryMobileOpen}
          />
        </>
      )}

      <div ref={heroRef} className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 text-white text-center" style={{ backgroundImage: "url('/canapé/canape.jpg')" }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6 sm:space-y-8 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl leading-tight">
            Nettoyage Professionnel de{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Textiles
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl mx-auto drop-shadow px-2">
            Offrez à vos textiles une expérience de propreté haut de gamme
          </p>
          <motion.button
            onClick={handleStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg group transition-all duration-300 hover:from-blue-600 hover:to-blue-800 text-sm sm:text-base"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
            <span className="relative z-10 flex items-center space-x-2">
              <span>Commencer ma demande sur mesure</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-1" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Section des étapes - Affichage cumulatif */}
      <div id="textile-steps" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Étape 1 - Type de textile (toujours visible) */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Étape 1 : Type de textile
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sélectionnez le type de textile que vous souhaitez nettoyer
              </p>
            </div>
            
            <TextileTypeStep 
              onSelect={handleTextileTypeSelect}
              selected={textileType?.value}
            />
          </div>

          {/* Étape 2T - Calcul de surface (pour Tapis) - ORDRE CORRIGÉ */}
          {showTapisSurfaceStep && (
            <motion.div 
              id="textile-tapis-surface"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape 2 : Surface du tapis
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Indiquez les dimensions pour calculer automatiquement le prix
                </p>
              </div>
              
              <TextileTapisSurfaceStep 
                onSelect={handleTextileTapisSurfaceSelect}
                selected={textileTapisSurface}
              />
            </motion.div>
          )}

          {/* Étape 2A/3 - Sélection de la matière (pour tous les textiles) */}
          {showMaterialStep && (
            <motion.div 
              id="textile-material"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape {textileType?.value === "Tapis" ? "3" : "2"} : Matière
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choisissez la matière de votre {textileType?.value.toLowerCase()}
                </p>
              </div>
              
              <TextileMaterialStep 
                onSelect={handleTextileMaterialSelect}
                selected={textileMaterial?.value}
              />
            </motion.div>
          )}

          {/* Étape 2B - Sélection de la taille du matelas (pour Matelas) */}
          {showMatelasSizeStep && (
            <motion.div 
              id="textile-matelas-size"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape 2 : Taille du matelas
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sélectionnez la taille de votre matelas
                </p>
              </div>
              
              <TextileMatelasSizeStep 
                onSelect={handleTextileMatelasSizeSelect}
                selected={textileMatelasSize?.value}
              />
            </motion.div>
          )}

          {/* Étape 2C - Sélection du nombre de chaises (pour Chaises) */}
          {showChairsQuantityStep && (
            <motion.div 
              id="textile-chairs-quantity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape 2 : Nombre de chaises
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sélectionnez le nombre de chaises à nettoyer
                </p>
              </div>
              
              <TextileChairsQuantityStep 
                onSelect={handleTextileChairsQuantitySelect}
                selected={textileChairsQuantity?.value}
              />
            </motion.div>
          )}

          {/* Étape 2D - Sélection de la matière des chaises (pour Chaises) */}
          {showChairsMaterialStep && (
            <motion.div 
              id="textile-chairs-material"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape 3 : Matière des chaises
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choisissez la matière de vos chaises
                </p>
              </div>
              
              <TextileChairsMaterialStep 
                onSelect={handleTextileChairsMaterialSelect}
                selected={textileChairsMaterial?.value}
              />
            </motion.div>
          )}



          {/* Étape 3/4 - Options supplémentaires (affichage conditionnel) */}
          {showOptionsStep && (
            <motion.div 
              id="textile-options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape {textileType?.value === "Chaises" ? "4" : textileType?.value === "Tapis" ? "4" : "3"} : Options supplémentaires
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sélectionnez les options supplémentaires pour votre nettoyage
                </p>
              </div>
              
              <TextileOptionsStep 
                onSelect={handleTextileOptionsSelect}
                selected={textileOptions.value}
                nextSectionId="textile-contact"
              />
            </motion.div>
          )}

          {/* Étape 4 - Formulaire de contact (affichage conditionnel) */}
          {showContactStep && (
            <motion.div 
              id="textile-contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Étape {textileType?.value === "Chaises" ? "5" : textileType?.value === "Tapis" ? "5" : "4"} : Contact
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Remplissez vos informations pour finaliser votre demande
                </p>
              </div>
              
              <TextileContactStep 
                selections={selections}
                totalPrice={totalPrice}
                totalTime={totalTime}
                onReset={handleReset}
              />
            </motion.div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
} 