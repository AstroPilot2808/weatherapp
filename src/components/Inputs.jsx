import React, { useState, useEffect } from 'react';
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

//tempIndicator is a global variable that changes when units are converted

//var tempIndicator = 'C'

function Inputs({ setQuery }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== '') {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });

      navigator.permissions && navigator.permissions.query({ name: 'geolocation' })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state === 'granted') {
            // Location is enabled by the user, so no need to alert anything here.
          } else if (PermissionStatus.state === 'prompt') {
            alert("Please enable location to use this feature!");
          } else {
            alert("Please enable location to use this feature!");
          }
        });
    } else {
      alert("Please enable location to use this feature!");
    }
  };

//Event listener added so that when 'Enter' key is pressed, the handleSearchClick function is called

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearchClick();
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSearchClick]);

  // function tempChanger(temp){
  //   tempIndicator = temp
   // forceUpdate() //Triggers Re-render so that all weather values can be updated based on Celsius/Fahrenheit
  

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"
          placeholder="Search for city..."
        />

        <UilSearch
          onClick={handleSearchClick}
          size={25}
          className="text-white transition ease-out hover:scale-125"
          id="searchButton"
        />
        <UilLocationPoint
          onClick={handleLocationClick}
          size={25}
          className="text-white transition ease-out hover:scale-125"
        />
      </div>
    </div>
  );
  
}

export default Inputs;