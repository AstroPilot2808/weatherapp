import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherService';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState} from "react";
import { DateTime } from 'luxon';

function App() {

  const [query, setQuery] = useState({q: 'pittsburgh'})
 // const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData("weather", { ...query });
        setWeather(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching weather data:");
        // Perform error handling here
      }
    };
  
    fetchWeather();
  }, [query]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-cyan-700 to-blue-700">
  <div className="flex justify-center space-x-4">
    <TopButtons query={query} setQuery={setQuery} />
  </div>
  <Inputs query={query} setQuery={setQuery} /> 

  {weather && (
    <div className="flex flex-col items-center">
      <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather} units='F'/>
      {/* <Forecast title="hourly forecast"/>
      <Forecast title="daily forecast"/> */}
    </div>
  )}
</div>
  );
}

export default App;
