import React from 'react'

function TimeAndLocation({weather: {dt, name, sys}}) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">{dateFormatter(dt)}</p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-thin">{`${name}, ${sys.country}`}</p>
      </div>
    </div>
  )
}

function dateFormatter (unix) {
  const dt = unix
  const milliseconds = new Date(dt*1000)
  const dateObject = new Date(milliseconds)
  return dateObject.toString()

}

export default TimeAndLocation