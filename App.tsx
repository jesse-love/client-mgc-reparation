import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import LandingOfferPage from './pages/LandingOfferPage';
import LandingHealthCheckPage from './pages/LandingHealthCheckPage';
import LandingTiresPage from './pages/LandingTiresPage';
import ThankYouPage from './pages/ThankYouPage';

import { services } from './i18n';
import type { Service } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuoteWizardProvider, useQuoteWizard } from './contexts/QuoteWizardContext';
import { BusinessInfoProvider } from './contexts/BusinessInfoContext';
import QuoteWizard from './components/QuoteWizard';
import { trackPageView, trackClickToCall, trackLandingPageView } from './utils/googleTag';

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
        // For any unknown paths, show the home page.
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
  const landingPages = ['/offre', '/bilan', '/pneus'];
  
  // Track initial page view
  useEffect(() => {
    if (landingPages.includes(route) || route === '/merci') {
      trackLandingPageView(route);
    } else {
      trackPageView(route);
    }
  }, []); // Only runs once on initial load

  useEffect(() => {
    const handlePopState = () => {
      const newPath = cleanPath(window.location.pathname);
      setRoute(newPath);
      window.scrollTo(0, 0);
      if (landingPages.includes(newPath) || newPath === '/merci') {
        trackLandingPageView(newPath);
      } else {
        trackPageView(newPath);
      }
    };

    window.addEventListener('popstate', handlePopState);

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

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
             if (landingPages.includes(newPath) || newPath === '/merci') {
                trackLandingPageView(newPath);
            } else {
                trackPageView(newPath);
            }
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [route]); // Reruns if route changes

  const renderAppContent = () => {
    switch (route) {
      case '/offre':
        return <LandingOfferPage />;
      case '/bilan':
        return <LandingHealthCheckPage />;
      case '/pneus':
        return <LandingTiresPage />;
      case '/merci':
        return <ThankYouPage />;
      default:
        return (
          <QuoteWizardProvider>
            <MainLayout route={route} />
          </QuoteWizardProvider>
        );
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <BusinessInfoProvider>
          {renderAppContent()}
        </BusinessInfoProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
