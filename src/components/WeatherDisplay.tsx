'use client';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useWeatherManagement } from '@/hooks/useWeatherManagement';
import { getWeatherInfo, getUvDescription } from '@/utils/helpers';
import { Calendar, Sun, Droplets } from 'lucide-react';

const WeatherDisplay = () => {
    
    const { weatherData, selectedLocation, isFetchingWeather, error } = useWeatherManagement();

    const prevIsFetching = useRef(isFetchingWeather);

    useEffect(() => {
        
        // If we were previously fetching and now we are not, show a success message
        if (prevIsFetching.current && !isFetchingWeather && weatherData && !error) {
            toast.success('Weather data loaded!');
        }
        // If there was an error and we are no longer fetching, show the error message
        if (error) {
            toast.error(error);
        }

        // Update the ref value at the end of each render.
        prevIsFetching.current = isFetchingWeather;
    }, [isFetchingWeather, weatherData, error]);

    if (isFetchingWeather) {
        return (
            <div className="flex flex-col items-center justify-center p-10">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-white/80 text-lg">Loading weather data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mx-4 border border-white/20">
                <p className="text-center text-red-300 font-medium">{error}</p>
            </div>
        );
    }

    // If no weather data or location is selected, show a message
    if (!weatherData || !selectedLocation) {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mx-4 border border-white/20">
                <p className="text-center text-white/80 text-lg">
                    Select a location to see the weather data
                </p>
            </div>
        );
    }

    const { current, daily } = weatherData;
    const { icon: currentIcon, description: currentDescription } = getWeatherInfo(current.weathercode);

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Main Layout */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Main Weather Card */}
                <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {/* Location Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-white/90 text-lg font-medium mb-1">
                            {selectedLocation.name}
                        </h2>
                        <p className="text-white/70 text-sm capitalize">{currentDescription}</p>
                    </div>

                    {/* Main Temperature Display */}
                    <div className="text-center mb-8">
                        <div className="text-8xl mb-4">{currentIcon}</div>
                        <div className="text-7xl md:text-8xl font-thin text-white mb-2">
                            {Math.round(current.temperature)}°C
                        </div>
                    </div>

                    {/* Additional Info Row */}
                    <div className="flex justify-center items-center space-x-8 text-white/80">
                        <div className="text-center">
                            <p className="text-sm opacity-70 mb-1">Wind</p>
                            <p className="text-lg font-medium">{current.windspeed.toFixed(1)} km/h</p>
                        </div>
                        <div className="w-px h-8 bg-white/20"></div>
                        <div className="text-center">
                            <p className="text-sm opacity-70 mb-1">Feels like</p>
                            <p className="text-lg font-medium">{Math.round(current.apparent_temperature)}°C</p>
                        </div>
                    </div>
                </div>

                {/* 7-Day Forecast */}
                <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center mb-4">
                        <Calendar className="w-5 h-5 text-white/70 mr-2" />
                        <h3 className="text-white/90 text-lg font-medium">7-Day Forecast</h3>
                    </div>

                    <div className="space-y-3">
                        {daily.time.map((day, index) => {
                            const { icon: dailyIcon } = getWeatherInfo(daily.weathercode[index]);
                            const date = new Date(day);
                            const isToday = index === 0;
                            const dayName = isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
                            
                            return (
                                <div key={day} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                                    {/* Day */}
                                    <div className="flex-1 text-left">
                                        <p className={`${isToday ? 'text-white font-medium' : 'text-white/80'} text-base`}>
                                            {dayName}
                                        </p>
                                    </div>

                                    {/* Weather Icon */}
                                    <div className="flex-1 text-center">
                                        <span className="text-2xl">{dailyIcon}</span>
                                    </div>

                                    {/* Temperature Range */}
                                    <div className="flex-1 text-right">
                                        <span className="text-white/60 text-base mr-2">
                                            {Math.round(daily.temperature_2m_min[index])}°C
                                        </span>
                                        <span className="text-white text-base font-medium">
                                            {Math.round(daily.temperature_2m_max[index])}°C
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Additional Weather Details */}
            <div className="grid grid-cols-2 gap-4">
                {/* UV Index Card */}
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 transform-gpu">
                    <div className="flex items-center mb-2">
                        <Sun className="w-4 h-4 text-white/70 mr-2" />
                        <p className="text-white/70 text-sm">UV Index</p>
                    </div>
                    <p className="text-white text-2xl font-light">{current.uv_index.toFixed(1)}</p>
                    <p className="text-white/60 text-xs mt-1">{getUvDescription(current.uv_index)}</p>
                </div>

                {/* Humidity Card */}
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/20 transform-gpu">
                    <div className="flex items-center mb-2">
                        <Droplets className="w-4 h-4 text-white/70 mr-2" />
                        <p className="text-white/70 text-sm">Humidity</p>
                    </div>
                    <p className="text-white text-2xl font-light">{Math.round(current.humidity)}%</p>
                    <p className="text-white/60 text-xs mt-1">
                        {current.humidity > 70 ? 'Very humid' : 'Comfortable'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;