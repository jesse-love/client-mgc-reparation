
import React from 'react';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../i18n';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../App';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';

const cleanPath = (path: string): string => {
  if (path.endsWith('/index.html')) {
    path = path.substring(0, path.length - 'index.html'.length);
  }
  if (path === '') {
    return '/';
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
}

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'fr') => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center bg-black/20 border border-white/20 rounded-full p-0.5">
      <button 
        onClick={() => switchLanguage('fr')} 
        className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${language === 'fr' ? 'bg-orange-500 text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}
      >
        FR
      </button>
      <button 
        onClick={() => switchLanguage('en')} 
        className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${language === 'en' ? 'bg-orange-500 text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}
      >
        EN
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const { openWizard } = useQuoteWizard();
  
  const isHomePage = cleanPath(window.location.pathname) === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleBookServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    openWizard();
  };

  const headerDynamicClass = (isScrolled || !isHomePage) 
    ? 'bg-gray-900/90 backdrop-blur-sm shadow-2xl border-b border-white/10' 
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerDynamicClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex-shrink-0" onClick={closeMenu}>
            <span className="text-3xl font-bold font-oswald tracking-wider text-white drop-shadow-md">MGC<span className="text-orange-500"> Réparation</span></span>
          </a>
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.name.en} className="relative group/nav">
                <a href={link.href} className="relative text-white group transition-colors duration-300 font-semibold uppercase tracking-wider text-sm">
                  <span className="flex items-center">
                    {link.name[language]}
                    {link.subLinks && <ChevronDownIcon className="h-4 w-4 ml-1 transition-transform group-hover/nav:rotate-180" />}
                  </span>
                  {!link.subLinks && <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>}
                </a>
                {link.subLinks && (
                  <div className="absolute top-full left-0 mt-4 w-60 bg-gray-800/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 invisible group-hover/nav:visible">
                    {link.subLinks.map((subLink) => (
                      <a key={subLink.name.en} href={subLink.href} className="block px-4 py-3 text-sm text-gray-300 hover:bg-orange-500/20 hover:text-white font-semibold transition-colors duration-200">{subLink.name[language]}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <button onClick={handleBookServiceClick} className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-md hover:from-orange-400 hover:to-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/40">
              {t.header.bookService}
            </button>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button onClick={toggleMenu} className="text-white focus:outline-none p-2">
              {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-900 absolute top-20 left-0 w-full shadow-2xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) => (
            <div key={link.name.en}>
              {link.subLinks ? (
                <div>
                  <button onClick={() => toggleDropdown(link.name.en)} className="w-full text-left text-white block px-3 py-3 rounded-md text-base font-semibold hover:bg-white/10 flex justify-between items-center uppercase tracking-wider">
                    {link.name[language]}
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${openDropdown === link.name.en ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`${openDropdown === link.name.en ? 'block' : 'hidden'} pl-4 border-l-2 border-orange-500 ml-3`}>
                    <a href={link.href} onClick={closeMenu} className="text-orange-400 block px-3 py-2 rounded-md text-sm font-semibold hover:bg-white/10">{t.header.allServices}</a>
                    {link.subLinks.map((subLink) => (
                      <a key={subLink.name.en} href={subLink.href} onClick={closeMenu} className="text-gray-300 block px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10">{subLink.name[language]}</a>
                    ))}
                  </div>
                </div>
              ) : (
                 <a href={link.href} onClick={closeMenu} className="text-white block px-3 py-3 rounded-md text-base font-semibold hover:bg-white/10 uppercase tracking-wider">{link.name[language]}</a>
              )}
            </div>
          ))}
          <div className="pt-4 px-3 pb-2">
            <button onClick={handleBookServiceClick} className="block w-full text-center bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-6 rounded-md hover:from-orange-400 hover:to-red-500 transition duration-300 text-lg">
              {t.header.bookService}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
