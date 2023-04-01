import React from 'react'
// Defining Array "Cities" in JavaScript with 5 terms
function TopButtons() {
    const cities = [
        {
            id:1,
            title: 'London'
        },
        {
            id:2,
            title: 'Sydney'
        },
        {
            id:3,
            title: 'Tokyo'
        },
        {
            id:4,
            title: 'Toroto'
        },
        {
            id:5,
            title: 'Paris'
        }
    ]
  return <div className="flex items-center justify-around my-6">
    {/* Iterating each element of the array one my one */}
    {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-thin">{city.title}</button>
    ))}
  </div>
}

export default TopButtons