import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { services } from './i18n';
import type { Service } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuoteWizardProvider, useQuoteWizard } from './contexts/QuoteWizardContext';
import { BusinessInfoProvider } from './contexts/BusinessInfoContext';
import QuoteWizard from './components/QuoteWizard';
import { trackPageView, trackClickToCall } from './utils/googleTag';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme as Theme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      return 'light';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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

const MainLayout: React.FC<{ route: string }> = ({ route }) => {
  const { openWizard, isOpen } = useQuoteWizard();

  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && route !== '/' && !isOpen && !sessionStorage.getItem('exitIntentShown')) {
        openWizard();
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [route, isOpen, openWizard]);

  const renderContent = () => {
    if (route.startsWith('/services/')) {
      const slug = route.split('/services/')[1];
      const service = services.find((s: Service) => s.slug === slug);
      return service ? <ServiceDetailPage service={service} /> : <HomePage />;
    }

    switch (route) {
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/services':
        return <ServicesPage />;
      case '/':
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-brand-dark text-slate-800 dark:text-slate-200">
      <Header />
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      <Footer />
      <QuoteWizard />
    </div>
  );
};


const App: React.FC = () => {
  const [route, setRoute] = useState(cleanPath(window.location.pathname));

  // Track initial page view
  useEffect(() => {
    trackPageView(route);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const newPath = cleanPath(window.location.pathname);
      setRoute(newPath);
      window.scrollTo(0, 0);
      trackPageView(newPath); // Track on back/forward
    };

    window.addEventListener('popstate', handlePopState);

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      // Handle call tracking
      if (anchor?.href.startsWith('tel:')) {
        trackClickToCall();
      }
      
      if (
        anchor &&
        anchor.href &&
        anchor.target !== '_blank' &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin) {
          event.preventDefault();
          const newPath = cleanPath(url.pathname);
          if (route !== newPath) {
            window.history.pushState({}, '', newPath);
            setRoute(newPath);
            window.scrollTo(0, 0);
            trackPageView(newPath); // Track on internal navigation
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [route]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BusinessInfoProvider>
          <QuoteWizardProvider>
            <MainLayout route={route} />
          </QuoteWizardProvider>
        </BusinessInfoProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;