import { geoApiClient } from "./apiClient";
import { fetchWeatherApi } from "openmeteo";
import { GeoSearchResponse, Location, WeatherData } from "@/types/weather";
import { range } from '@/utils/helpers'

const WeatherService = {

    /**
     * Find locations
     */
    async searchLocation(name: string): Promise<Location[]> {
        try {
            const response = await geoApiClient.get<GeoSearchResponse>('search', {
                params: {
                    name,
                    count: 5,
                    language: 'en',
                    format: 'json'
                }
            })

            return response.data.results?.filter(loc => loc.country === 'Germany') || []

        } catch (error) {
            console.error("Error in searchLocation:", error)
            throw new Error("We couldn't find locations.")
        }
    },


    /**
     * Gets the time forecast using Open-Meteo SDK
     */
    async getWeather(latitude: number, longitude: number): Promise<WeatherData> {
        try {
            const params = {
                latitude,
                longitude,
                current: "temperature_2m,weather_code,wind_speed_10m,is_day,apparent_temperature,relative_humidity_2m,uv_index",
                daily: "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max",
                timezone: 'auto',
            }

            const url = "https://api.open-meteo.com/v1/forecast";

            const responses = await fetchWeatherApi(url, params)

            const response = responses[0]

            const utcOffsetSeconds = response.utcOffsetSeconds()

            const current = response.current()!

            const daily = response.daily()!

            const transformedData: WeatherData = {

                current: {
                    temperature: current.variables(0)?.value() ?? 0,
                    weathercode: current.variables(1)?.value() ?? 0,
                    windspeed: current.variables(2)?.value() ?? 0,
                    is_day: current.variables(3)?.value() ?? 0,
                    apparent_temperature: current.variables(4)?.value() ?? 0,
                    humidity: current.variables(5)?.value() ?? 0,
                    uv_index: current.variables(6)?.value() ?? 0,
                },

                daily: {
                    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                        (t: number) => new Date((t + utcOffsetSeconds) * 1000).toISOString()
                    ),
                    weathercode: Array.from(daily.variables(0)?.valuesArray() ?? []),
                    temperature_2m_max: Array.from(daily.variables(1)?.valuesArray() ?? []),
                    temperature_2m_min: Array.from(daily.variables(2)?.valuesArray() ?? []),
                    uv_index_max: Array.from(daily.variables(3)?.valuesArray() ?? []),
                }
            };

            return transformedData;

        } catch (error) {
            console.error("Error in getWeather:", error);
            throw new Error("We couldn't get weather data.");
        }
    }

}

export default WeatherService;