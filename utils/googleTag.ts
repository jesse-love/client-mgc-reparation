import {
  AW_CONVERSION_ID,
  ADS_CONTACT_FORM_CONVERSION_LABEL,
  ADS_WIZARD_CONVERSION_LABEL,
  ADS_CLICK_TO_CALL_CONVERSION_LABEL,
  GA_MEASUREMENT_ID,
} from '../constants';

// Add this to allow TypeScript to recognize window.gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Type guard wrapper for the gtag function
const gtag = (...args: any[]) => {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    console.warn('gtag function not found. Google Analytics may be blocked or not initialized.');
  }
};

/**
 * Tracks a page view for the given path.
 * Should be called on initial load and on route changes in a SPA.
 * @param path - The path of the page to track (e.g., '/about').
 */
export const trackPageView = (path: string) => {
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    send_to: GA_MEASUREMENT_ID,
  });
};

/**
 * Tracks a specific conversion event for Google Ads.
 * @param type - The type of conversion to track.
 */
export const trackConversion = (type: 'contact_form' | 'wizard_form') => {
  let conversionLabel = '';
  if (type === 'contact_form') {
    conversionLabel = ADS_CONTACT_FORM_CONVERSION_LABEL;
  } else if (type === 'wizard_form') {
    conversionLabel = ADS_WIZARD_CONVERSION_LABEL;
  }

  const send_to = `${AW_CONVERSION_ID}/${conversionLabel}`;

  if (conversionLabel && conversionLabel.indexOf('Y') === -1) { // Basic check for placeholder
    gtag('event', 'conversion', { 'send_to': send_to });
    console.log(`Conversion event sent: ${type}`);
  }
};

/**
 * Tracks a click on a telephone link as a conversion for Google Ads.
 */
export const trackClickToCall = () => {
  const conversionLabel = ADS_CLICK_TO_CALL_CONVERSION_LABEL;
  const send_to = `${AW_CONVERSION_ID}/${conversionLabel}`;

  if (conversionLabel && conversionLabel.indexOf('A') === -1) { // Basic check for placeholder
     gtag('event', 'conversion', { 'send_to': send_to });
     console.log('Click-to-call conversion event sent.');
  }
};
