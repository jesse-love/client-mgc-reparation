
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

const ThemeToggle: React.FC<{ isScrolledOrNotHome: boolean }> = ({ isScrolledOrNotHome }) => {
  const { theme, toggleTheme } = useTheme();

  const iconColorClass = isScrolledOrNotHome
    ? "text-slate-800 dark:text-slate-200"
    : "text-slate-200";

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-slate-200/70 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-orange-500 transition-colors ${iconColorClass}`}
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

const LanguageSwitcher: React.FC<{ isScrolledOrNotHome: boolean }> = ({ isScrolledOrNotHome }) => {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'fr') => {
    setLanguage(lang);
  };

  const switcherClass = isScrolledOrNotHome
    ? 'bg-slate-200/60 dark:bg-slate-900/50 border border-slate-300 dark:border-white/20'
    : 'bg-slate-900/50 border border-white/20';

  const inactiveButtonClass = isScrolledOrNotHome
    ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-white/10'
    : 'text-slate-300 hover:bg-white/10';

  return (
    <div className={`flex items-center rounded-full p-0.5 transition-colors ${switcherClass}`}>
      <button 
        onClick={() => switchLanguage('fr')} 
        className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${language === 'fr' ? 'bg-orange-500 text-slate-900' : inactiveButtonClass}`}
      >
        FR
      </button>
      <button 
        onClick={() => switchLanguage('en')} 
        className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${language === 'en' ? 'bg-orange-500 text-slate-900' : inactiveButtonClass}`}
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
    handleScroll(); // Check on initial render
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
  
  const isScrolledOrNotHome = isScrolled || !isHomePage;

  const headerDynamicClass = isScrolledOrNotHome
    ? 'bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm shadow-lg border-b border-slate-200 dark:border-slate-700'
    : 'bg-transparent border-b border-transparent';
    
  const contentColorClass = isScrolledOrNotHome
    ? 'text-slate-900 dark:text-white'
    : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerDynamicClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex-shrink-0" onClick={closeMenu}>
            <span className={`text-3xl font-bold font-oswald tracking-wider drop-shadow-md transition-colors ${contentColorClass}`}>MGC<span className="text-orange-500"> RÉPARATION</span></span>
          </a>
          <nav className="hidden lg:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <div key={link.name.en} className="relative group/nav">
                <a href={link.href} className={`relative group transition-colors duration-300 font-semibold uppercase tracking-wider text-sm hover:text-orange-400 ${contentColorClass}`}>
                  <span className="flex items-center">
                    {link.name[language]}
                    {link.subLinks && <ChevronDownIcon className="h-4 w-4 ml-1.5 transition-transform group-hover/nav:rotate-180" />}
                  </span>
                  {!link.subLinks && <span className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>}
                </a>
                {link.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 invisible group-hover/nav:visible">
                    <div className="p-2">
                    {link.subLinks.map((subLink) => (
                      <a key={subLink.name.en} href={subLink.href} className="block px-4 py-3 text-sm text-slate-300 hover:bg-orange-500/10 hover:text-orange-400 font-semibold transition-colors duration-200 rounded-md">{subLink.name[language]}</a>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher isScrolledOrNotHome={isScrolledOrNotHome} />
            <ThemeToggle isScrolledOrNotHome={isScrolledOrNotHome} />
            <button onClick={handleBookServiceClick} className="inline-block bg-orange-500 text-slate-900 font-bold py-3 px-6 rounded-md hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/40">
              {t.header.bookService}
            </button>
          </div>
          <div className="lg:hidden flex items-center gap-2">
             <LanguageSwitcher isScrolledOrNotHome={isScrolledOrNotHome} />
             <ThemeToggle isScrolledOrNotHome={isScrolledOrNotHome} />
            <button onClick={toggleMenu} className={`p-2 focus:outline-none ${contentColorClass}`}>
              {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-brand-dark absolute top-20 left-0 w-full shadow-2xl border-t border-slate-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) => (
            <div key={link.name.en}>
              {link.subLinks ? (
                <div>
                  <button onClick={() => toggleDropdown(link.name.en)} className="w-full text-left text-white block px-3 py-3 rounded-md text-base font-semibold hover:bg-slate-800 flex justify-between items-center uppercase tracking-wider">
                    {link.name[language]}
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${openDropdown === link.name.en ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`${openDropdown === link.name.en ? 'block' : 'hidden'} pl-4 border-l-2 border-orange-500 ml-3`}>
                    <a href={link.href} onClick={closeMenu} className="text-orange-400 block px-3 py-2 rounded-md text-sm font-semibold hover:bg-slate-800">{t.header.allServices}</a>
                    {link.subLinks.map((subLink) => (
                      <a key={subLink.name.en} href={subLink.href} onClick={closeMenu} className="text-slate-300 block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">{subLink.name[language]}</a>
                    ))}
                  </div>
                </div>
              ) : (
                 <a href={link.href} onClick={closeMenu} className="text-white block px-3 py-3 rounded-md text-base font-semibold hover:bg-slate-800 uppercase tracking-wider">{link.name[language]}</a>
              )}
            </div>
          ))}
          <div className="pt-4 px-3 pb-2">
            <button onClick={handleBookServiceClick} className="block w-full text-center bg-orange-500 text-slate-900 font-bold py-3 px-6 rounded-md hover:bg-orange-400 transition duration-300 text-lg">
              {t.header.bookService}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;