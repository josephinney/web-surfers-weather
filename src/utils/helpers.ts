// Helper function from open-meteo docs
export const range = (start: number, stop: number, step: number) => {

    return Array.from(
        {
            length: (stop - start) / step
        },

        (_, i) => start + i * step)
}


/**
 * Helper function to get an icon and description for weather based on WMO code
 */
export const getWeatherInfo = (code: number): { icon: string; description: string } => {

    const weatherMap: Record<number, { icon: string; description: string }> = {

        0: { icon: '☀️', description: 'Clear sky' },
        1: { icon: '🌤️', description: 'Mainly clear' },
        2: { icon: '⛅️', description: 'Partly cloudy' },
        3: { icon: '☁️', description: 'Overcast' },
        45: { icon: '🌫️', description: 'Fog' },
        48: { icon: '🌫️', description: 'Depositing rime fog' },
        51: { icon: '🌧️', description: 'Light drizzle' },
        53: { icon: '🌧️', description: 'Moderate drizzle' },
        55: { icon: '🌧️', description: 'Dense drizzle' },
        61: { icon: '💧', description: 'Slight rain' },
        63: { icon: '💧', description: 'Moderate rain' },
        65: { icon: '💧', description: 'Heavy rain' },
        71: { icon: '❄️', description: 'Slight snow fall' },
        73: { icon: '❄️', description: 'Moderate snow fall' },
        75: { icon: '❄️', description: 'Heavy snow fall' },
        80: { icon: '🌦️', description: 'Slight rain showers' },
        81: { icon: '🌦️', description: 'Moderate rain showers' },
        82: { icon: '⛈️', description: 'Violent rain showers' },
        95: { icon: '🌩️', description: 'Thunderstorm' },

    };


    return weatherMap[code] ?? { icon: '❓', description: 'Unknown' };
};


/**
 * Returns the weather background based on the weather code.
 */
export const getSurfBackgroundGradient = (weathercode: number): string => {
  const surfGradientMap: { [key: number]: string } = {
    // Perfect surf conditions - Ocean blues
    0: 'bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600',
    1: 'bg-gradient-to-br from-sky-300 via-blue-400 to-cyan-500',
    
    // Good conditions with some clouds
    2: 'bg-gradient-to-br from-slate-300 via-sky-400 to-blue-500',
    3: 'bg-gradient-to-br from-slate-400 via-sky-500 to-blue-600',
    
    // Foggy conditions - Mysterious ocean
    45: 'bg-gradient-to-br from-gray-200 via-slate-300 to-blue-300',
    48: 'bg-gradient-to-br from-gray-300 via-slate-400 to-blue-400',
    
    // Light rain - Still surfable
    51: 'bg-gradient-to-br from-slate-400 via-cyan-500 to-teal-600',
    53: 'bg-gradient-to-br from-slate-500 via-cyan-600 to-teal-700',
    55: 'bg-gradient-to-br from-slate-600 via-cyan-700 to-teal-800',
    
    // Heavy rain - Rough seas
    61: 'bg-gradient-to-br from-slate-600 via-blue-700 to-indigo-800',
    63: 'bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-900',
    65: 'bg-gradient-to-br from-slate-800 via-blue-900 to-black',
    
    // Storms - Epic but dangerous
    95: 'bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900',
    96: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black',
    99: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black'
  };

  return surfGradientMap[weathercode] || 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600';
};


/**
 * Returns a UV index description based on the value.
 */
export const getUvDescription = (uvIndex: number): string => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
};