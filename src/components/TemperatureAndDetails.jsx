import React, { useState } from 'react';
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons';
import { iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({ weather: weatherData, units }) {
  const [currentUnit, setCurrentUnit] = useState(units);

  const toggleUnit = () => {
    setCurrentUnit(currentUnit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = (value) => {
    if (currentUnit === 'C') {
      return Math.round((value - 32) * (5 / 9));
    } else {
      return value;
    }
  };

  if (!weatherData) {
    return <div>Loading...</div>; // or display an appropriate loading state
  }
  const { main, sys, weather, wind, timezone } = weatherData;

  return (
    <div>
    <div className="flex items-center justify-center py-6 text-4xl text-cyan-300">
      <p>{`${weather[0].description}`}</p>
    </div>
    <div className="flex items-center justify-center py-1 text-2xl text-cyan-300">
      <button className="text-white border-white border-2 rounded-lg hover:scale-105 transition-all duration-300" onClick={toggleUnit}>
        Current Units: {currentUnit}°
      </button>
    </div>
  
    <div className="flex floex row items-center justify-between text-white py-3 mr-8">
      <img src={iconUrl(weather[0].icon)} alt="" className="w-24" />
      <p className="text-6xl sm:text-=7xl">{convertTemperature(toF(main.temp))}°</p>
      <div className="flex flex-col space-y-4">
        <div className="flex font-light text-lg items-center justify-center">
          <UilTemperature size={24} className="mr-2" />
          Real Feel:
          <span className="font-medium ml-2">{convertTemperature(toF(main.feels_like))}°</span>
        </div>
        <div className="flex font-light text-lg items-center justify-center">
          <UilTear size={24} className="mr-2" />
          Humidity:
          <span className="font-medium ml-2">{`${main.humidity}`}%</span>
        </div>
        <div className="flex font-light text-lg items-center justify-center">
          <UilWind size={24} className="mr-2" />
          Wind:
          <span className="font-medium ml-2">{toMPH(wind.speed)} mph</span>
        </div>
      </div>
    </div>
    <div className="flex flex-row items-center justify-center space-x-1 text-white text-lg py-3">
      <UilSun size={24} />
      <p className="font-light">Rise: <span className="font-medium ml-2">{toHHMM(sys.sunrise)}</span></p>
      <UilSunset size={24} />
      <p className="font-light">Set: <span className="font-medium ml-2">{toHHMM(sys.sunset)}</span></p>
      <UilArrowUp size={24} />
      <p className="font-light">High: <span className="font-medium ml-2">{convertTemperature(toF(main.temp_max))}°</span></p>
      <UilArrowDown size={24} />
      <p className="font-light">Low: <span className="font-medium ml-2">{convertTemperature(toF(main.temp_min))}°</span></p>
    </div>
  </div>
  
  )


function toF(kelvin){
    var firstOperation = kelvin-273.15
    var secondOperation = 9/5
    var f = firstOperation*secondOperation+32
    return Math.round(f)
}
function toMPH(metersPerSecond){
    var mph = metersPerSecond*2.237
    return Math.round(mph)
}
function iconUrl(icon){
    const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    return url
}

function toHHMM (unix) {
    const updatedDT = unix+14400+timezone
    const milliseconds = new Date(updatedDT*1000)
    const dateObject = new Date(milliseconds)
    let prevHr = dateObject.getHours()
    let updatedHr = null;
    if (prevHr==0){
        updatedHr = 12
     }else if(prevHr>0 && prevHr<=12){
         updatedHr=prevHr
     }else{
         updatedHr=prevHr-12
     }
    let updateMin = null;
    if (dateObject.getMinutes()<10) {
        updateMin = "0"+dateObject.getMinutes()
        console.log("Minutes is less than 10")
    } else {
        updateMin = dateObject.getMinutes()
    }
    let meridiem = null;
    if (dateObject.getHours()<12){
        meridiem = "AM"
    }else {
        meridiem = "PM"
    }
  
    let finalTime = updatedHr+":"+updateMin+" "+meridiem
    return finalTime
  
  }
}
export default TemperatureAndDetails