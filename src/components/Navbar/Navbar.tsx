import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/voitures", label: "Voitures" },
  { to: "/canapes", label: "Canapés" },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleLogoClick} className="focus:outline-none p-2 -m-2">
          <img src={logo} alt="Wash&Go" className="h-8 sm:h-10 lg:h-12 transition duration-300" />
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-lg font-semibold tracking-wide">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 ${
                location.pathname === to ? "text-blue-500 bg-blue-50" : "hover:text-blue-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile burger icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-inherit focus:outline-none p-3 -m-3 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-6 text-white text-xl font-semibold tracking-wide md:hidden transition-all"
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
              className={`transition-colors px-8 py-4 rounded-xl min-w-[200px] text-center ${
                location.pathname === to ? "text-blue-400 bg-blue-900/20" : "hover:text-blue-300 hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Close icon top-right */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-3 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </nav>
  );
}
