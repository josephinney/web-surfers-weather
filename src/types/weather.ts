// Types for UI state ===

export interface Location {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

export interface WeatherData {
    current: {
        temperature: number;
        weathercode: number;
        windspeed: number;
        is_day: number;
    },

    daily: {
        time: string[];
        weathercode: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
}

// Types for API payloads/responses

export interface GeoSearchResponse {
    results?: Location[]
}

export interface WeatherApiResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        weathercode: number;
        is_day: number;
        time: string;
    },
    daily: {
        time: string[];
        weathercode: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    }
}