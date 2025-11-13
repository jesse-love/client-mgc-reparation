declare global {
  interface Window {
    // GTM dataLayer
    dataLayer: any[];
  }
}

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * @param event - The name of the event.
 * @param data - An object containing data to send with the event.
 */
const pushToDataLayer = (event: string, data: object) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
  });
  console.log(`GTM Event: ${event}`, data);
};

/**
 * Tracks a page view by pushing a custom event to the dataLayer.
 * This can be used to trigger pageview tags in GTM for a Single Page Application.
 * @param path - The path of the page to track (e.g., '/about').
 */
export const trackPageView = (path: string) => {
  pushToDataLayer('custom_page_view', {
    page_path: path,
  });
};

/**
 * Tracks a lead generation conversion event.
 * @param type - The type of form that was submitted.
 */
export const trackConversion = (type: 'contact_form' | 'wizard_form') => {
  // We push a generic 'generate_lead' event and specify the form type.
  // In GTM, you can create a trigger for the 'generate_lead' event
  // and use the 'form_type' variable to fire specific conversion tags.
  pushToDataLayer('generate_lead', {
    form_type: type,
  });
};

/**
 * Tracks a click on a telephone link.
 */
export const trackClickToCall = () => {
  // Push a specific event for call clicks that can be used as a GTM trigger.
  pushToDataLayer('click_to_call', {});
};
