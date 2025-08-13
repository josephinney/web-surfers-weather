import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useWeatherStore } from '@/store/weatherStore';
import weatherService from '@/services/weatherService';


export const useWeatherManagement = () => {

    const store = useWeatherStore();

    /**
     * Mutation to find Locations
     */
    const locationSearchMutation = useMutation({

        mutationFn: (query: string) => weatherService.searchLocation(query),

        onMutate: () => {
            store.setIsSearchingLocations(true)
        },

        onSuccess: (data) => {
            store.setLocationSuggestions(data)
            store.setIsSearchingLocations(false)
        },

        onError: (error) => {
            console.error("Location search failed:", error)
            store.setError("We couldn't find locations")
        }
    });

    /**
     * Mutation to fetch Weather Data
     */
    const weatherFetchMutation = useMutation({
        
        mutationFn: ({ lat, lon}: {lat: number; lon: number}) => weatherService.getWeather(lat, lon),

        onMutate: () => {
            store.setIsFetchingWeather(true)
        },

        onSuccess: (data) => {
            store.setWeatherData(data)
        },

        onError: (error) => {
            console.error("Weather fetch failed:", error)
            store.setError("We couldn't fetch weather data")
        }

    })

    /**
     * Effect to fetch weather data when a location is selected
     */
    useEffect(() => {
        
        if (store.selectedLocation) {
            weatherFetchMutation.mutate({
                lat: store.selectedLocation.latitude,
                lon: store.selectedLocation.longitude
            })
        }
    }, [store.selectedLocation])

    
    
    /**
     * Function to start the location search
    */
    const searchLocations = useCallback((query: string) => {
        
        if (query && query.length > 3) {
            
            locationSearchMutation.mutate(query);
        
        } else {

            store.setLocationSuggestions([])
        }
    }, [locationSearchMutation, store.setLocationSuggestions])


    return {
        ...store,
        searchLocations
    }


}