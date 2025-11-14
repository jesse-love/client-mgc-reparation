
import {
  GTM_CONTACT_FORM_EVENT,
  GTM_WIZARD_FORM_EVENT,
  GTM_CLICK_TO_CALL_EVENT,
  GTM_VIEW_LANDING_PAGE_EVENT,
  GTM_GENERATE_LEAD_EVENT,
} from '../constants';

// Add this to allow TypeScript to recognize window.dataLayer and window.fbq
declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
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
    page_title: document.title,
    page_location: window.location.origin + path,
  });
  console.log(`GTM Event: page_view for ${path} with title "${document.title}"`);
};

/**
 * Pushes a specific landing page view event to the dataLayer for GTM.
 * @param path - The path of the landing page (e.g., '/offre').
 */
export const trackLandingPageView = (path: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: GTM_VIEW_LANDING_PAGE_EVENT,
    page_path: path,
    page_title: document.title,
  });
  console.log(`GTM Event: ${GTM_VIEW_LANDING_PAGE_EVENT} for ${path} with title "${document.title}"`);
};

interface UserData {
    name?: string;
    email?: string;
    phone?: string;
}

interface LeadGenerationParams {
    avatarType: string;
    userData: UserData;
    vehicleType?: string;
}

/**
 * Pushes an enriched lead generation event from a landing page.
 * Includes user data for Enhanced Conversions and custom parameters for Facebook.
 * @param params - The lead generation data.
 */
export const trackLeadGeneration = ({ avatarType, userData, vehicleType }: LeadGenerationParams) => {
  window.dataLayer = window.dataLayer || [];

  const [firstName, ...lastNameParts] = (userData.name || '').split(' ');
  const lastName = lastNameParts.join(' ');

  window.dataLayer.push({
    event: GTM_GENERATE_LEAD_EVENT,
    avatar_type: avatarType,
    vehicle_type: vehicleType,
    user_data: {
      email: userData.email,
      phone_number: userData.phone,
      address: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  console.log(`GTM Event: ${GTM_GENERATE_LEAD_EVENT} with enriched data for avatar: ${avatarType}`);
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
