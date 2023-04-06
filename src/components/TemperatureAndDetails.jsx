import React from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";
import { iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({weather: {main, sys, weather, wind}}) {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
            <p>{`${weather[0].description}`}°</p>
        </div>
        <div className="flex floex row items-center justify-between text-white py-3">
            <img src= {iconUrl(weather[0].icon)}alt="" className="w-20"/>
            <p className="text-5xl">{`${main.temp}`}°</p>
            <div className="flex flex-col space-y-2">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature size={18} className="mr-1"/>
                    Real Feel:
                    <span className="font-medium ml-1">{`${main.feels_like}`}°</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1"/>
                    Humidity: 
                    <span className="font-medium ml-1">{`${main.humidity}`}%</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1"/>
                    Wind: 
                    <span className="font-medium ml-1">{`${wind.speed}`} mph</span>
                </div>
            </div>
        </div>
        <div className="flex flex-row items center justify-center space-x-2 text-white text-sm py-3">
            <UilSun />
            <p className="font-light">Rise: <span className="font-medium ml-1">{toHHMM(sys.sunrise)}</span></p>
            <UilSunset />
            <p className="font-light">Set: <span className="font-medium ml-1">{toHHMM(sys.sunset)}</span></p>
            <UilArrowUp />
            <p className="font-light">High: <span className="font-medium ml-1">{`${main.temp_max}`}°</span></p>
            <UilArrowDown />
            <p className="font-light">Low: <span className="font-medium ml-1">{`${main.temp_min}`}°</span></p>
        </div>
    </div>
  )
}
function iconUrl(icon){
    const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    return url
}

function toHHMM (unix) {
    const dt = unix
    const milliseconds = new Date(dt*1000)
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
    let meridiem = null;
    if (dateObject.getHours()<12){
        meridiem = "AM"
    }else {
        meridiem = "PM"
    }

    let finalTime = updatedHr+":"+dateObject.getMinutes()+" "+meridiem

    // let finalTime = dateObject.getHours()+":"+dateObject.getMinutes()
    return finalTime
  
  }

export default TemperatureAndDetails