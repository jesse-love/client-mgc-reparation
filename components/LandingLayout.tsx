import StickyActionButtons from './StickyActionButtons';

const LandingLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col relative">
      {/* Mobile Sticky Bar */}
      <StickyActionButtons />

      <main className="flex-grow flex flex-col pb-20 md:pb-0"> {/* Add padding-bottom to prevent content hidden behind sticky bar */}
        {children}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm px-4 bg-brand-dark pb-24 md:pb-6"> {/* Footer padding for mobile */}
        <p>
          &copy; {new Date().getFullYear()} MGCreparation.ca | Tous droits réservés | <a href="/politique-de-confidentialite" className="hover:text-slate-300 transition-colors">Politique de confidentialité</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingLayout;