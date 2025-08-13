'use client';
import LocationSearch from '@/components/LocationSearch'
import WeatherDisplay from '@/components/WeatherDisplay';
import { useWeatherManagement } from '@/hooks/useWeatherManagement';
import { getSurfBackgroundGradient } from '@/utils/helpers';

export default function Home() {

  const { weatherData } = useWeatherManagement();

  const backgroundGradient = weatherData?.current
    ? getSurfBackgroundGradient(weatherData.current.weathercode)
    : 'bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600';


  return (

    <div
      className={`flex min-h-screen flex-col items-center p-4 md:p-8 transition-all duration-1000 ease-in-out bg-no-repeat bg-cover ${backgroundGradient}`}
    >
      <div className="w-full flex flex-col items-center">

        <div className="w-full max-w-2xl text-center mb-10 md:mb-12">
          <p className="text-xl text-white max-w-lg mx-auto">
            Your essential surf forecast for Germany's top spots.
          </p>
        </div>

        <LocationSearch />
        <WeatherDisplay />
      </div>
    </div>
  );
}
