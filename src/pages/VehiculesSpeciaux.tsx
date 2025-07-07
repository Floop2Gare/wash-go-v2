import { useEffect, useRef, useState } from "react";
import { ChevronDown, Truck, Shield, Sparkles } from "lucide-react";

// Composants
import Navbar from "../components/Navbar/Navbar";
import VerticalProgressBar from "../components/Vehiculesspeciaux/VerticalProgressBar";
import FormuleStepSpecial from "../components/Vehiculesspeciaux/FormuleStepSpecial";
import CarcleanSpecialStep from "../components/Vehiculesspeciaux/CarcleanSpecialStep";
import OptionsStepSpecial from "../components/Vehiculesspeciaux/OptionsStepSpecial";
import ContactStepSpecial from "../components/Vehiculesspeciaux/ContactStepSpecial";

export default function VehiculesSpeciaux() {
  const [selectedFormule, setSelectedFormule] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [demandes, setDemandes] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToNextSection = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    if (!selectedFormule || !selectedCategory || selectedOptions.length === 0) {
      setFormError("Veuillez compléter chaque étape avant de poursuivre.");
      setShowErrorModal(true);
      return;
    }
    setFormError(null);
    setShowErrorModal(false);
    scrollToNextSection(3);
  };

  const handleAddAnother = () => {
    const currentDemande = {
      formule: selectedFormule,
      category: selectedCategory,
      options: selectedOptions,
    };
    setDemandes((prev) => [...prev, currentDemande]);
    resetFilters();
  };

  const handleFinalSubmit = (contactData: any) => {
    const finalDemande = {
      formule: selectedFormule,
      category: selectedCategory,
      options: selectedOptions,
    };
    const toutesDemandes = [...demandes, finalDemande];
    console.log("Demandes :", toutesDemandes);
    console.log("Contact :", contactData);
  };

  const resetFilters = () => {
    setSelectedFormule(undefined);
    setSelectedCategory(undefined);
    setSelectedOptions([]);
    scrollToNextSection(0);
  };

  const handleDeleteVehicle = (index: number) => {
    const updated = [...demandes];
    updated.splice(index, 1);
    setDemandes(updated);
  };

  const handleFullReset = () => {
    setDemandes([]);
    resetFilters();
  };

  const steps = ["Formule", "Véhicule", "Options", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      const contactRef = sectionRefs.current[3];
      const contactTop = contactRef?.getBoundingClientRect().top || 0;

      if (contactTop < window.innerHeight && (!selectedFormule || !selectedCategory || selectedOptions.length === 0)) {
        window.scrollTo({ top: (sectionRefs.current[2]?.offsetTop || 0), behavior: 'smooth' });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedFormule, selectedCategory, selectedOptions]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <VerticalProgressBar
          activeStep={activeSection}
          selectedFormule={selectedFormule}
          selectedCategory={selectedCategory}
          selectedOptions={selectedOptions}
        />

        {showErrorModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Vous avez oublié !</h2>
              <p className="text-gray-700 mb-6">{formError}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        <div
          className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-white text-center"
          style={{ backgroundImage: "url('/2d/vehicule_special.svg')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-6">Nettoyage Véhicules Spéciaux</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Camping-cars, utilitaires, engins... un service sur-mesure.
            </p>
            <button
              onClick={() => scrollToNextSection(0)}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto"
            >
              Découvrir nos formules
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Adapté à tous types", desc: "Camping-car, utilitaire, camionnette..." },
              { icon: Shield, title: "Garantie Satisfaction", desc: "Service pro et résultat au rendez-vous" },
              { icon: Sparkles, title: "Nettoyage en profondeur", desc: "Pour l'extérieur comme l'intérieur" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-6">
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
          {[<FormuleStepSpecial
              key="formule"
              selected={selectedFormule}
              onSelect={(formule) => {
                setSelectedFormule(formule);
                scrollToNextSection(1);
              }}
            />,
            <CarcleanSpecialStep
              key="vehicule"
              selected={selectedCategory}
              onSelect={(category) => {
                setSelectedCategory(category);
                scrollToNextSection(2);
              }}
            />,
            <OptionsStepSpecial
              key="options"
              selectedOptions={selectedOptions}
              onToggleOption={(optionId) =>
                setSelectedOptions((prev) =>
                  prev.includes(optionId)
                    ? prev.filter((id) => id !== optionId)
                    : [...prev, optionId]
                )
              }
              onContinue={scrollToContact}
            />,
            <ContactStepSpecial
              key="contact"
              selectedFormule={selectedFormule || ""}
              selectedCategory={selectedCategory || ""}
              selectedOptions={selectedOptions}
              onSubmit={handleFinalSubmit}
              allDemandes={demandes}
              onAddVehicle={handleAddAnother}
              onResetFilters={resetFilters}
              onDeleteVehicle={handleDeleteVehicle}
              onFullReset={handleFullReset}
            />,
          ].map((Component, i) => (
            <section
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="section scroll-mt-24 bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h2 className="text-3xl font-bold">{steps[i]}</h2>
              </div>
              {Component}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
