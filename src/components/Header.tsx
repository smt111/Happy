import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Flower2 } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group"
        >
          <Flower2
            className={`w-8 h-8 transition-colors duration-300 ${
              scrolled ? 'text-rose-600' : 'text-white'
            }`}
          />
          <span
            className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-charcoal-900' : 'text-white'
            }`}
          >
            Happy Gift & Flowers
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Shop', id: 'shop' },
            { label: 'About', id: 'about' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-rose-500 ${
                scrolled ? 'text-charcoal-700' : 'text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className={`relative p-2 rounded-full transition-all duration-200 hover:bg-rose-50 ${
              scrolled ? 'text-charcoal-800' : 'text-white'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${scrolled ? 'text-charcoal-800' : 'text-white'}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-cream-200 shadow-lg animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {[
              { label: 'Shop', id: 'shop' },
              { label: 'About', id: 'about' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-charcoal-700 font-medium hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
