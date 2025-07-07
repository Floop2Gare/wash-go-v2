import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/voitures', label: 'Voitures' },
  { to: '/canapes', label: 'Canapés' },
  { to: '/produits', label: 'Produits' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = isScrolled
    ? 'bg-white text-blue-600 shadow-md'
    : 'bg-transparent text-white';

  const logo = isScrolled
    ? '/2d/tout/logonavbarblue.svg'
    : '/2d/tout/logonavbarblanc.svg';

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navbarStyle}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={handleLogoClick} className="focus:outline-none">
          <img src={logo} alt="Wash&Go" className="h-10 transition duration-300" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 text-sm sm:text-lg font-semibold tracking-wide">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors duration-200 ${
                location.pathname === to ? 'text-grey-100' : 'hover:text-blue-500'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Burger icon (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-inherit focus:outline-none"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 text-white text-lg font-semibold tracking-wide md:hidden">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => {
                navigate(to);
                setMenuOpen(false);
              }}
              className={`transition-colors ${
                location.pathname === to ? 'text-blue-400' : 'hover:text-blue-300'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </nav>
  );
}
