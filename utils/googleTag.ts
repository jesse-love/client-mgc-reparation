import {
  GTM_CONTACT_FORM_EVENT,
  GTM_WIZARD_FORM_EVENT,
  GTM_CLICK_TO_CALL_EVENT,
} from '../constants';

// Add this to allow TypeScript to recognize window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Pushes a page view event to the dataLayer for GTM to track.
 * Should be called on initial load and on route changes in a SPA.
 * @param path - The path of the page to track (e.g., '/about').
 */
export const trackPageView = (path: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_location: window.location.origin + path,
  });
  console.log(`GTM Event: page_view for ${path}`);
};

/**
 * Pushes a specific conversion event to the dataLayer for GTM.
 * @param type - The type of conversion to track.
 */
export const trackConversion = (type: 'contact_form' | 'wizard_form') => {
  let eventName = '';
  if (type === 'contact_form') {
    eventName = GTM_CONTACT_FORM_EVENT;
  } else if (type === 'wizard_form') {
    eventName = GTM_WIZARD_FORM_EVENT;
  }

  if (eventName) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      // You can add more data here if needed for GTM, e.g., form details
      lead_source: type,
    });
    console.log(`GTM Event: ${eventName}`);
  }
};

/**
 * Pushes a click-to-call event to the dataLayer for GTM.
 */
export const trackClickToCall = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: GTM_CLICK_TO_CALL_EVENT,
  });
  console.log(`GTM Event: ${GTM_CLICK_TO_CALL_EVENT}`);
};
