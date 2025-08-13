import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Location, WeatherData } from '@/types/weather';

// Interface for global state
interface WeatherState {
    
    // State
    selectedLocation: Location | null;
    locationSuggestions: Location[];
    weatherData: WeatherData | null;
    isSearchingLocations: boolean;
    isFetchingWeather: boolean;
    error: string | null;

    // Actions 
    setSelectedLocation: (location: Location | null) => void;
    setLocationSuggestions: (locations: Location[]) => void;
    setWeatherData: (data: WeatherData | null) => void;
    setIsSearchingLocations: (loading: boolean) => void;
    setIsFetchingWeather: (loading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}


// Initial state
const initialState = {
    selectedLocation: null,
    locationSuggestions: [],
    weatherData: null,
    isSearchingLocations: false,
    isFetchingWeather: false,
    error: null
}

export const useWeatherStore = create<WeatherState>()(
    devtools(
        (set) => ({
            ...initialState,

            setSelectedLocation: (location) => set({
                selectedLocation: location,
                locationSuggestions: []
            }, false, 'setSelectedLocation'),

            setLocationSuggestions: (locations) => set({
                locationSuggestions: locations
            }, false, 'setLocationSuggestions'),

            setWeatherData: (data) => set({
                weatherData: data,
                isFetchingWeather: false
            }, false, 'setWeatherData'),

            setIsSearchingLocations: (loading) => set({
                isSearchingLocations: loading
            }, false, 'setIsSearchingLocations'),

            setIsFetchingWeather: (loading) => set({
                isFetchingWeather: loading,
                error: null
            }, false, 'setIsFetchingWeather'),

            setError: (error) => set({
                error,
                isFetchingWeather: false,
                isSearchingLocations: false
            }, false, 'setError'),

            reset: () => set(initialState, false, 'reset')
        }),

        {
            name: 'weather-store',
        }
    )
)