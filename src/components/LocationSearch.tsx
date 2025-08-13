'use client';

import { useState, useEffect } from 'react';
import { useWeatherManagement } from '@/hooks/useWeatherManagement';
import { Location } from '@/types/weather';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const LocationSearch = () => {
    const {
        searchLocations,
        locationSuggestions,
        isSearchingLocations,
        setSelectedLocation,
        selectedLocation
    } = useWeatherManagement();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm !== selectedLocation?.name) {
            searchLocations(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (selectedLocation) {
            setSearchTerm(selectedLocation.name);
        }
    }, [selectedLocation]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectLocation = (location: Location) => {
        setSelectedLocation(location);
    };

    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            {/* Input field */}
            <div className="relative">
                {/* Icon for search */}
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80 z-10" />

                <input
                    type="text"
                    placeholder="Search for a city in Germany..."
                    onChange={handleInputChange}
                    value={searchTerm}
                    className="
                        w-full p-3 pl-12
                        text-white font-medium placeholder:text-white/80
                        bg-white/15 backdrop-blur-xl
                        border border-white/20
                        rounded-2xl
                        shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-sky-400
                        transition-all duration-300
                    "
                    disabled={isSearchingLocations}
                />
                {isSearchingLocations && (
                    // Spinner
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                )}
            </div>

            {locationSuggestions.length > 0 && (
                // Suggestions dropdown
                <ul
                    className="
                        absolute z-20 w-full mt-2
                        bg-white/15 backdrop-blur-xl
                        border border-white/20
                        rounded-2xl
                        shadow-lg
                        overflow-hidden
                        animate-fade-in
                    "
                >
                    {locationSuggestions.map((loc) => (
                        <li
                            key={loc.id}
                            className="
                                p-3 pl-4
                                cursor-pointer
                                text-white/90
                                hover:bg-white/20
                                transition-colors duration-200
                                border-b border-white/10
                                last:border-b-0
                             "
                            onClick={() => handleSelectLocation(loc)}
                        >
                            {loc.name}, {loc.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationSearch;