import axios from 'axios';

// Client for Geocoding Api
export const geoApiClient = axios.create({
    baseURL: 'https://geocoding-api.open-meteo.com/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
})


geoApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Geocoding API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)