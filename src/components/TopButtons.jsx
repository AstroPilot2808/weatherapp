import React from 'react'
// Defining Array "Cities" in JavaScript with 5 terms
function TopButtons({setQuery}) {
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
            title: 'Toronto'
        },
        {
            id:5,
            title: 'Paris'
        }
    ]
  return <div className="flex items-center justify-around mt-2 mb-6">
  {/* Render buttons only on screens wider than 768px */}
  {window.innerWidth > 768 &&
    cities.map((city) => (
      <button
        key={city.id}
        className="text-white text-xl font-thin hover:underline hover:scale-110 transition-all duration-300"
        onClick={() => setQuery({ q: city.title })}
        style={{ width: '160px', height: '48px' }}
      >
        {city.title}
      </button>
    ))}
</div>





}

export default TopButtons