
import React, { useState, useEffect, createContext, useContext, ReactNode, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage'));
const LandingOfferPage = React.lazy(() => import('./pages/LandingOfferPage'));
const LandingHealthCheckPage = React.lazy(() => import('./pages/LandingHealthCheckPage'));
const LandingTiresPage = React.lazy(() => import('./pages/LandingTiresPage'));
const LandingTruckPage = React.lazy(() => import('./pages/LandingTruckPage'));
const LandingGeneratorPage = React.lazy(() => import('./pages/LandingGeneratorPage'));
const ThankYouPage = React.lazy(() => import('./pages/ThankYouPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const SubServicePage = React.lazy(() => import('./pages/SubServicePage'));
const LocationLandingPage = React.lazy(() => import('./pages/LocationLandingPage'));
const DynamicFAQPage = React.lazy(() => import('./pages/DynamicFAQPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

import UrgencyTopbar from './components/UrgencyTopbar';
import SEO from './components/SEO';

import { services } from './i18n';
import StickyActionButtons from './components/StickyActionButtons';
import type { Service } from './types';
import { LanguageProvider } from './contexts/LanguageContext';
import { QuoteWizardProvider, useQuoteWizard } from './contexts/QuoteWizardContext';
import { UserLocationProvider } from './contexts/UserLocationContext';
import { BusinessInfoProvider } from './contexts/BusinessInfoContext';
import { ContentProvider } from './contexts/ContentContext';
import { PrequalificationFormProvider } from './contexts/PrequalificationFormContext';
import QuoteWizard from './components/QuoteWizard';
import PrequalificationForm from './components/PrequalificationForm';
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
    const path = window.location.pathname;

    if (path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/services') return <ServicesPage />;
    if (path === '/politique-de-confidentialite') return <PrivacyPolicyPage />;
    if (path === '/dashboard') return <DashboardPage />;

    // Check for location pages (e.g., /mechanic-terrebonne)
    if (path.startsWith('/mechanic-')) {
      const citySlug = path.replace('/mechanic-', '');
      return <LocationLandingPage citySlug={citySlug} />;
    }

    // Check for service detail pages
    if (path.startsWith('/services/')) {
      const parts = path.split('/').filter(Boolean); // ['services', 'category', 'subcategory']
      const categorySlug = parts[1];
      const subcategorySlug = parts[2];

      const service = services.find(s => s.slug === categorySlug);

      if (service) {
        if (subcategorySlug) {
          // Find subservice
          const subService = service.subServices?.find(s => s.slug === subcategorySlug);
          if (subService) {
            return <SubServicePage service={service} subService={subService} />;
          }
        }
        return <ServiceDetailPage service={service} />;
      }
    }

    // [NEW] Dynamic FAQ Pages (pSEO)
    if (path.startsWith('/faq/')) {
      return <DynamicFAQPage />;
    }

    return <HomePage />;
  };

  const isFaqPage = window.location.pathname.startsWith('/faq/');

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-brand-dark text-slate-800 dark:text-slate-200 relative">
      {/* Mobile Sticky Bar */}
      <StickyActionButtons />

      {isFaqPage && <UrgencyTopbar />}
      <Header hasUrgencyBanner={isFaqPage} />
      <main className="flex-grow pb-20 md:pb-0"> {/* Padding for mobile sticky bar */}
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
    const landingPageMap: { [key: string]: React.ComponentType } = {
      '/offre': LandingOfferPage,
      '/bilan': LandingHealthCheckPage,
      '/pneus': LandingTiresPage,
      '/camion': LandingTruckPage,
      '/generatrice': LandingGeneratorPage,
    };

    return (
      <BusinessInfoProvider>
        <PrequalificationFormProvider>
          <UserLocationProvider>
            <ContentProvider>
              <SEO />
              {(() => {
                const LandingComponent = landingPageMap[route];
                if (LandingComponent) {
                  return (
                    <QuoteWizardProvider>
                      <LandingComponent />
                      <PrequalificationForm />
                      <QuoteWizard />
                    </QuoteWizardProvider>
                  );
                }

                if (route === '/merci') {
                  return (
                    <QuoteWizardProvider>
                      <ThankYouPage />
                      {/* QuoteWizard might not be needed on Thank You, but Context is needed for StickyButtons */}
                    </QuoteWizardProvider>
                  );
                }

                return (
                  <QuoteWizardProvider>
                    <MainLayout route={route} />
                  </QuoteWizardProvider>
                );
              })()}
            </ContentProvider>
          </UserLocationProvider>
        </PrequalificationFormProvider>
      </BusinessInfoProvider>
    );
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <HelmetProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-brand-dark"><div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div></div>}>
            {renderAppContent()}
          </Suspense>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
