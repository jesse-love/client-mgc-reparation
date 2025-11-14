import React, { ReactNode } from 'react';

const LandingLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm px-4 bg-brand-dark">
        <p>
          &copy; {new Date().getFullYear()} MGCreparation.ca | Tous droits réservés | <a href="/politique-de-confidentialite" className="hover:text-slate-300 transition-colors">Politique de confidentialité</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingLayout;