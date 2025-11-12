import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200">
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-brand-dark text-white text-center py-4">
        <div className="container mx-auto text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} garageterrebonne.ca | {t.footer.rights} | <a href="/privacy-policy" className="underline hover:text-white">Politique de confidentialité</a></p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
