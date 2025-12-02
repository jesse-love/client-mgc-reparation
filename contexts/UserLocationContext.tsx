import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserLocationContextType {
    userCity: string;
    isLoading: boolean;
    error: string | null;
    detectLocation: () => void;
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userCity, setUserCity] = useState<string>('Mascouche'); // Default fallback
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const detectLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

                    if (!apiKey) {
                        throw new Error('Google Maps API Key is missing');
                    }

                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
                    );

                    const data = await response.json();

                    if (data.status === 'OK' && data.results?.[0]) {
                        // Find the 'locality' or 'administrative_area_level_2' (city/municipality)
                        const addressComponents = data.results[0].address_components;
                        const cityComponent = addressComponents.find((component: any) =>
                            component.types.includes('locality') ||
                            component.types.includes('administrative_area_level_3')
                        );

                        if (cityComponent) {
                            setUserCity(cityComponent.long_name);
                        } else {
                            // Fallback to a broader area if city not found
                            const areaComponent = addressComponents.find((component: any) =>
                                component.types.includes('administrative_area_level_2')
                            );
                            if (areaComponent) setUserCity(areaComponent.long_name);
                        }
                    } else {
                        throw new Error('Unable to determine city from coordinates');
                    }
                } catch (err) {
                    console.error('Reverse geocoding error:', err);
                    setError('Failed to detect location');
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError('Location access denied or unavailable');
                setIsLoading(false);
            }
        );
    };

    // Auto-detect on mount (optional, or trigger via UI)
    useEffect(() => {
        detectLocation();
    }, []);

    return (
        <UserLocationContext.Provider value={{ userCity, isLoading, error, detectLocation }}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = (): UserLocationContextType => {
    const context = useContext(UserLocationContext);
    if (context === undefined) {
        throw new Error('useUserLocation must be used within a UserLocationProvider');
    }
    return context;
};
