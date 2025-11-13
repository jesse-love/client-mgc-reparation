import React, { ReactNode } from 'react';

const LandingLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
      <main className="flex-grow flex flex-col justify-center py-12">
        {children}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm px-4">
        <p>&copy; {new Date().getFullYear()} garageterrebonne.ca | Tous droits réservés | Politique de confidentialité</p>
        <p className="mt-1 opacity-75">Propulsé par [Votre Agence]</p>
      </footer>
    </div>
  );
};

export default LandingLayout;