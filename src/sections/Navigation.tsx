import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Servizi', id: 'tende' },
    { label: 'Perché noi', id: 'perche-noi' },
    { label: 'Processo', id: 'processo' },
    { label: 'Contatti', id: 'contatti' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F4F1EA]/95 backdrop-blur-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-heading font-black text-xl tracking-tight text-[#1B1F24]"
          >
            RV/LT
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-[#1B1F24] hover:text-[#D6A04A] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="tel:+393463018748"
              className="inline-flex items-center gap-2 bg-[#D6A04A] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#c2913f] transition-colors"
            >
              <Phone className="w-4 h-4" />
              Richiedi preventivo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1B1F24]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-[#F4F1EA] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-heading font-bold text-[#1B1F24] hover:text-[#D6A04A] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:+393463018748"
            className="mt-8 inline-flex items-center gap-2 bg-[#D6A04A] text-white px-8 py-4 rounded-full text-lg font-semibold"
          >
            <Phone className="w-5 h-5" />
            Chiama ora
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
