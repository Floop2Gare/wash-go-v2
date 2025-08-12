import { useState, useEffect, useRef } from 'react';

interface UseStickyFooterOptions {
  offset?: number; // Distance en px avant le footer (défaut: 16)
  showThreshold?: number; // Seuil de scroll pour afficher (défaut: 20)
}

export const useStickyFooter = (options: UseStickyFooterOptions = {}) => {
  const { offset = 16, showThreshold = 20 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [stopPosition, setStopPosition] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Trouver le footer
    const findFooter = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        footerRef.current = footer;
        calculateStopPosition();
      }
    };

    // Calculer la position d'arrêt
    const calculateStopPosition = () => {
      if (!footerRef.current) return;
      
      const footerRect = footerRef.current.getBoundingClientRect();
      const footerTop = footerRect.top + window.scrollY;
      const stopPos = footerTop - offset;
      setStopPosition(stopPos);
    };

    // Gérer le scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Vérifier si on doit afficher
      setIsVisible(scrollY > showThreshold);
      
      // Vérifier si on doit s'arrêter avant le footer
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const shouldStopNow = footerRect.top <= (offset + 100); // 100px de marge pour anticiper
        setShouldStop(shouldStopNow);
        
        // Recalculer la position si nécessaire
        if (shouldStopNow && !shouldStop) {
          calculateStopPosition();
        }
      }
    };

    // Gérer le redimensionnement
    const handleResize = () => {
      calculateStopPosition();
    };

    // Initialisation
    findFooter();
    handleScroll();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Observer les changements du DOM pour détecter le footer
    const observer = new MutationObserver(() => {
      if (!footerRef.current) {
        findFooter();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [offset, showThreshold, shouldStop]);

  return {
    isVisible,
    shouldStop,
    stopPosition,
    footerRef
  };
};
