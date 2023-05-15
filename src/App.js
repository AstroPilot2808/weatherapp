import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

function App() {
  const [query, setQuery] = useState({ q: 'pittsburgh' });
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData('weather', { ...query });
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching weather data:');
        // Perform error handling here
      }
    };

    fetchWeather();
  }, [query]);

  const isPC = window.innerWidth > 768; // Define the width threshold for PC screens
  const isMobile = !isPC; // Determine if it's a mobile screen

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-cyan-700 to-blue-700">
      {isMobile && <h1 className="text-3xl font-semibold text-white mb-4">Mobile Weather App</h1>}
      {isPC && (
        <div className="flex justify-center space-x-4">
          <TopButtons query={query} setQuery={setQuery} />
        </div>
      )}
      <div className="container mx-auto max-w-xl"> {/* Apply maximum width on mobile screens */}
        <Inputs query={query} setQuery={setQuery} />

        {weather && (
          <div className="flex flex-col items-center">
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units="F" />
            {/* <Forecast title="hourly forecast"/>
            <Forecast title="daily forecast"/> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;