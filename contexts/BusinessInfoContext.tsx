
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { BusinessInfo } from '../types';

// The Google Place ID for MGC Réparation Inc. This is required by the Places API.
const PLACE_ID = 'ChIJMeqEvlfbyEwRcwObeP5z2SA';
// The API key is assumed to be in the environment variables
const API_KEY = 'AIzaSyCGujd97_lW9TAK4Q4Z9ces06wk5MvMupg';

// Create the context with a default value
const BusinessInfoContext = createContext<BusinessInfo | undefined>(undefined);

// Helper function to format operating hours from GMB API response
const formatOperatingHours = (periods: any[]): { en: string; fr: string }[] => {
  if (!periods) return [];
  
  const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOfWeekFr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  
  const formatTime = (time: { hours?: number; minutes?: number }) => {
    const h = time.hours || 0;
    const m = time.minutes || 0;
    // Simple 24h format for clarity in French/English
    const hourStr = h < 10 ? `0${h}` : h;
    const minuteStr = m < 10 ? `0${m}` : m;
    return `${hourStr}:${minuteStr}`;
  };

  const lines = daysOfWeekEn.map((_, dayIndex) => {
    const dayPeriods = periods.filter(p => p.openDay === dayIndex);
    if (dayPeriods.length === 0) {
      return { en: `${daysOfWeekEn[dayIndex]}: Closed`, fr: `${daysOfWeekFr[dayIndex]}: Fermé` };
    }
    const hoursStr = dayPeriods.map(p => `${formatTime(p.openTime)} - ${formatTime(p.closeTime)}`).join(', ');
    return { en: `${daysOfWeekEn[dayIndex]}: ${hoursStr}`, fr: `${daysOfWeekFr[dayIndex]}: ${hoursStr}` };
  });

  // Reorder to start with Monday for display
  const mondayFirst = [...lines.slice(1), lines[0]];
  return mondayFirst;
};


export const BusinessInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: 'MGC Réparation Inc.',
    address: 'Loading...',
    phone: 'Loading...',
    googleMapsUrl: '',
    operatingHours: [],
    reviews: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!API_KEY) {
        console.error("API Key is missing.");
        setBusinessInfo(prev => ({ ...prev, isLoading: false, error: "Configuration error: API key is missing." }));
        return;
      }

      // Using the v1 Places API format with field mask
      const fields = 'displayName,formattedAddress,internationalPhoneNumber,regularOpeningHours,googleMapsUri,reviews';
      const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=${fields}&key=${API_KEY}&languageCode=fr`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch GMB data: ${errorData?.error?.message || 'Unknown error'}`);
        }
        const data = await response.json();
        
        const ratingMap: { [key: number]: string } = { 1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE' };

        setBusinessInfo({
          name: data.displayName?.text || 'MGC Réparation Inc.',
          address: data.formattedAddress || 'N/A',
          phone: data.internationalPhoneNumber || 'N/A',
          googleMapsUrl: data.googleMapsUri || '',
          operatingHours: formatOperatingHours(data.regularOpeningHours?.periods),
          reviews: (data.reviews || []).map((r: any) => ({
            reviewer: {
              displayName: r.authorAttribution?.displayName || 'Anonymous',
              profilePhotoUrl: r.authorAttribution?.photoUri || '',
            },
            starRating: ratingMap[r.rating] || 'FIVE',
            comment: r.text?.text || '',
            createTime: r.publishTime || new Date().toISOString(),
          })),
          isLoading: false,
          error: null,
        });

      } catch (error: any) {
        console.error("GMB Fetch Error:", error);
        setBusinessInfo(prev => ({ ...prev, isLoading: false, error: error.message || "Could not load business information." }));
      }
    };

    fetchBusinessInfo();
  }, []);

  return (
    <BusinessInfoContext.Provider value={businessInfo}>
      {children}
    </BusinessInfoContext.Provider>
  );
};

export const useBusinessInfo = (): BusinessInfo => {
  const context = useContext(BusinessInfoContext);
  if (context === undefined) {
    throw new Error('useBusinessInfo must be used within a BusinessInfoProvider');
  }
  return context;
};
