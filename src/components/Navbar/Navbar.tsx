import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/voitures", label: "Voitures" },
  { to: "/canapes", label: "Canapés" },
  { to: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // — Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // — Reset scroll effect on route change
  useEffect(() => {
    if (window.scrollY <= 50) setIsScrolled(false);
  }, [location.pathname]);

  const navbarStyle = isScrolled
    ? "bg-white text-blue-600 shadow-md"
    : "bg-transparent text-white";

  const logo = isScrolled
    ? "/logo/logobleu.svg"
    : "/logo/logoblanc.svg";

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${navbarStyle} transition-all duration-300 ease-in-out`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleLogoClick} className="focus:outline-none">
          <img src={logo} alt="Wash&Go" className="h-6 sm:h-8 md:h-10 transition duration-300" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6 text-sm lg:text-lg font-semibold tracking-wide">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors duration-200 ${
                location.pathname === to ? "text-blue-500" : "hover:text-blue-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile burger icon - Taille augmentée pour meilleure accessibilité */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-inherit focus:outline-none p-2 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
        </button>
      </div>

      {/* Mobile navigation - Zones de clic élargies */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-4 sm:gap-6 text-white text-lg sm:text-xl font-semibold tracking-wide md:hidden transition-all"
          role="dialog"
          aria-modal="true"
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => {
                navigate(to);
                setMenuOpen(false);
              }}
              className={`transition-colors px-6 sm:px-8 py-4 sm:py-5 rounded-lg min-h-[48px] flex items-center justify-center w-full max-w-xs ${
                location.pathname === to ? "text-blue-400 bg-blue-900/20" : "hover:text-blue-300 hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Close icon top-right - Zone de clic élargie */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white p-2 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Fermer le menu"
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>
        </div>
      )}
    </nav>
  );
}
