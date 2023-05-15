import React from 'react';

function TimeAndLocation({ weather }) {
  if (!weather) {
    return <div>Loading...</div>; // or display an appropriate loading state
  }

  const { dt, name, sys, timezone } = weather;

  const toLocalInfo = (dt, timezone) => {
    const updatedDT = dt+14400+timezone
    const milliseconds = new Date(updatedDT*1000)
    const dateObject = new Date(milliseconds)
    let prevHr = dateObject.getHours()
    let updatedHr = null;
    if (prevHr===0){
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
  
    // let finalTime = dateObject.getHours()+":"+dateObject.getMinutes()
    const date = dateObject.toDateString()
    const finalResult = date + " " + finalTime
    return finalResult
  };

  return (
    <div>
  <div className="flex items-center justify-center my-6">
    <p className="text-white text-2xl font-extralight text-center">Local: {toLocalInfo(dt, timezone)}</p>
  </div>
  <div className="flex items-center justify-center my-3">
    <p className="text-white text-4xl font-thin text-center">{`${name}, ${sys.country}`}</p>
  </div>
</div>

  );
}

export default TimeAndLocation;
