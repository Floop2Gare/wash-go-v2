// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/Acceuil/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Acceuil/Herosection';
import FeaturesSection from './components/Acceuil/FeaturesSection';
import SocialMediaSection from './components/Acceuil/SocialSection/SocialMediaSection';
import PricingSection from './components/Acceuil/ChoixSection';
import ContactSection from './components/Acceuil/ContactSection';
import TestimonialsSection from './components/Acceuil/TestimonialsSection';
import Footer from './components/Acceuil/footer';

import Voitures from './pages/Voitures';
import Canapes from './pages/Canapes';
import Produits from './pages/Produits';
import MentionsLegales from './pages/MentionsLegales';
import PolitiqueCookies from './pages/PolitiqueCookies';
import RgpdPage from './pages/RgpdPage';

const App: React.FC = () => {
  const scrollTo = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main className="min-h-screen bg-white">
                <HeroSection onCTAClick={() => scrollTo('choix-section')} />
                <FeaturesSection onNextClick={() => scrollTo('social-section')} />

                <div id="social-section">
                  <SocialMediaSection />
                </div>

                <div id="choix-section">
                  <PricingSection onContactClick={() => scrollTo('contact-section')} />
                </div>

                <div id="contact-section">
                  <ContactSection />
                </div>

                <TestimonialsSection />
                <Footer />
              </main>
            </>
          }
        />
        <Route path="/voitures" element={<Voitures />} />
        <Route path="/canapes" element={<Canapes />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-cookies" element={<PolitiqueCookies />} />
        <Route path="/rgpd" element={<RgpdPage />} />
      </Routes>
    </Router>
  );
};

export default App;
