
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../i18n';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'fr') => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center space-x-1 text-white">
      <button 
        onClick={() => switchLanguage('fr')} 
        className={`px-2 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'fr' ? 'bg-orange-500 text-brand-dark' : 'hover:bg-gray-700'}`}
      >
        FR
      </button>
      <span>/</span>
      <button 
        onClick={() => switchLanguage('en')} 
        className={`px-2 py-1 text-sm font-semibold rounded-md transition-colors ${language === 'en' ? 'bg-orange-500 text-brand-dark' : 'hover:bg-gray-700'}`}
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex-shrink-0" onClick={closeMenu}>
            <span className="text-2xl font-black text-white">MGC<span className="text-orange-500"> Réparation</span></span>
          </a>
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.name.en} className="relative group">
                {link.subLinks ? (
                  <>
                    <a href={link.href} className="text-white hover:text-orange-500 transition duration-300 flex items-center">
                      {link.name[language]}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </a>
                    <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                      {link.subLinks.map((subLink) => (
                        <a key={subLink.name.en} href={subLink.href} className="block px-4 py-2 text-sm text-brand-dark hover:bg-gray-100">{subLink.name[language]}</a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a href={link.href} className="text-white hover:text-orange-500 transition duration-300">{link.name[language]}</a>
                )}
              </div>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <a href="/contact" className="inline-block bg-orange-500 text-brand-dark font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300">
              {t.header.bookService}
            </a>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-brand-dark absolute top-20 left-0 w-full`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAV_LINKS.map((link) => (
            <div key={link.name.en}>
              {link.subLinks ? (
                <div>
                  <button onClick={() => toggleDropdown(link.name.en)} className="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 flex justify-between items-center">
                    {link.name[language]}
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${openDropdown === link.name.en ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`${openDropdown === link.name.en ? 'block' : 'hidden'} pl-4`}>
                    <a href={link.href} onClick={closeMenu} className="text-orange-500 block px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-700">{t.header.allServices}</a>
                    {link.subLinks.map((subLink) => (
                      <a key={subLink.name.en} href={subLink.href} onClick={closeMenu} className="text-gray-300 block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">{subLink.name[language]}</a>
                    ))}
                  </div>
                </div>
              ) : (
                 <a href={link.href} onClick={closeMenu} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">{link.name[language]}</a>
              )}
            </div>
          ))}
          <div className="pt-4 px-3">
            <a href="/contact" onClick={closeMenu} className="block w-full text-center bg-orange-500 text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300">
              {t.header.bookService}
            </a>
          </div>
           <div className="mt-4 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;