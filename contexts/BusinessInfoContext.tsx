import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { BusinessInfo } from '../types';

// The GMB Location ID provided by the user.
const GMB_PLACE_ID = 'ChIJMeqEvlfbyEwRcwObeP5z2SA';

// FIX: Define the context that was being used without being declared.
const BusinessInfoContext = createContext<BusinessInfo | undefined>(undefined);

export const BusinessInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: 'MGC Réparation Inc.',
    address: 'Loading...',
    phone: 'Loading...',
    googleMapsUrl: '',
    operatingHours: [],
    reviews: [],
    rating: 5.0, // Default to 5.0 while loading
    userRatingCount: 0,
    isLoading: true,
    error: null,
  });

  // This effect will push an event to the dataLayer once the business
  // phone number has been loaded. This allows GTM to configure tags
  // that rely on this information, like dynamic call tracking.
  useEffect(() => {
    if (!businessInfo.isLoading && businessInfo.phone && businessInfo.phone !== 'Loading...') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'business_info_loaded',
        phone_number: businessInfo.phone
      });
      console.log('Business info loaded. Event pushed to dataLayer for GTM.');
    }
  }, [businessInfo.isLoading, businessInfo.phone]);


  useEffect(() => {
    const fetchBusinessInfo = async () => {
      // The API key is now expected to be in the environment variables
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

      if (!API_KEY || API_KEY.trim() === '') {
        console.error("API Key is missing.");
        setBusinessInfo(prev => ({ ...prev, isLoading: false, error: "Configuration error: API key is missing." }));
        return;
      }

      const trimmedApiKey = API_KEY.trim();
      const fields = 'displayName,formattedAddress,internationalPhoneNumber,regularOpeningHours,googleMapsUri,reviews,rating,userRatingCount';
      const url = `https://places.googleapis.com/v1/places/${GMB_PLACE_ID}?fields=${fields}&languageCode=fr`;

      try {
        const response = await fetch(url, {
          headers: {
            'X-Goog-Api-Key': trimmedApiKey,
          },
        });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (e) {
            errorData = { error: { message: `HTTP error! status: ${response.status}` } };
          }
          console.error('Google API Error Response:', errorData);
          throw new Error(`Failed to fetch GMB data: ${errorData?.error?.message || 'Unknown API error'}`);
        }
        const data = await response.json();

        const ratingMap: { [key: number]: string } = { 1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE' };

        const formatOperatingHours = (periods?: any[]): { en: string; fr: string }[] => {
          if (!periods) return [{ en: 'Hours not available', fr: 'Heures non disponibles' }];

          const daysOfWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const daysOfWeekFr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

          const formatTime = (time: { hour?: number; minute?: number }) => {
            const h = time.hour || 0;
            const m = time.minute || 0;
            let displayHour = h % 12 === 0 ? 12 : h % 12;
            const period = h >= 12 ? 'PM' : 'AM';
            const minuteStr = m < 10 ? `0${m}` : m;
            return `${displayHour}:${minuteStr} ${period}`;
          };

          const lines = daysOfWeekEn.map((_, dayIndex) => {
            const dayPeriods = periods.filter(p => p.open.day === dayIndex);
            if (dayPeriods.length === 0) {
              return { en: `${daysOfWeekEn[dayIndex]}: Closed`, fr: `${daysOfWeekFr[dayIndex]}: Fermé` };
            }
            const hoursStr = dayPeriods.map(p => `${formatTime(p.open)} - ${formatTime(p.close)}`).join(', ');
            return { en: `${daysOfWeekEn[dayIndex]}: ${hoursStr}`, fr: `${daysOfWeekFr[dayIndex]}: ${hoursStr}` };
          });

          return [...lines.slice(1), lines[0]]; // Start week with Monday
        };

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
          rating: data.rating || 5.0,
          userRatingCount: data.userRatingCount || 0,
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