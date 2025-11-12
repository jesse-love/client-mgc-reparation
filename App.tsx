import React, { useState, useEffect } from 'react';
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

/**
 * A quick note on how this application's routing works:
 * This is a Single-Page Application (SPA). That means index.html is the only HTML file.
 * React dynamically swaps out components to show different "pages" based on the URL path,
 * without a full page reload. This provides a fast, smooth user experience.
 * You don't need to "generate" separate HTML files for each service; this `App.tsx` component
 * acts as a router, deciding which page component to display. The issue was a small bug in how
 * the URL path was being read and handled.
 */

// Helper to normalize the pathname for consistent routing
const cleanPath = (path: string): string => {
  // If the path ends with index.html, remove it to treat it as the root.
  if (path.endsWith('/index.html')) {
    path = path.substring(0, path.length - 'index.html'.length);
  }
  // Ensure the path is not empty, defaulting to '/'
  if (path === '') {
    return '/';
  }
  // Remove trailing slash for consistency, but not from the root path itself.
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};


const App: React.FC = () => {
  const [route, setRoute] = useState(cleanPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(cleanPath(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);

    // This global click handler intercepts clicks on local links to prevent page reloads
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Find the closest 'a' tag to the clicked element
      const anchor = target.closest('a');
      
      // Ensure it's a valid, local link that isn't meant to open in a new tab
      if (
        anchor &&
        anchor.href &&
        anchor.target !== '_blank' &&
        !event.ctrlKey &&
        !event.metaKey
      ) {
        const url = new URL(anchor.href);
        // Only handle links to the same origin
        if (url.origin === window.location.origin) {
          event.preventDefault();
          const newPath = cleanPath(url.pathname);
          if (route !== newPath) {
            window.history.pushState({}, '', newPath);
            setRoute(newPath);
            window.scrollTo(0, 0);
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [route]); // Depend on `route` to ensure the click handler closure has the latest route value.

  const renderContent = () => {
    // Route for service detail pages
    if (route.startsWith('/services/')) {
      const slug = route.split('/services/')[1];
      const service = services.find((s: Service) => s.slug === slug);
      // If a matching service is found, show its detail page, otherwise default to the home page.
      return service ? <ServiceDetailPage service={service} /> : <HomePage />;
    }

    // Routes for other main pages
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
        // For any other path, we'll show the home page as a fallback (404).
        return <HomePage />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow pt-20">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
