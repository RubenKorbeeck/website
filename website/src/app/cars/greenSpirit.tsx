import React from 'react';

export default function GreenSpirit() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-sans">

      {/* Hero Section */}
      <section className="relative text-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-4 py-2 rounded text-2xl">
          Green Spirit
        </div>
      </section>

      {/* Specifications */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl mb-6">The specifications</h2>
        <div className="flex flex-wrap gap-4">
          <ul className="flex-1 min-w-[300px] list-none p-0">
            <li className="mb-2"><strong>Year of Construction:</strong> 2021</li>
            <li className="mb-2"><strong>Weight:</strong> 200 kg</li>
            <li className="mb-2"><strong>Dimensions:</strong> 1.3 m × 1.1 m × 5 m</li>
            <li className="mb-2"><strong>Top Speed:</strong> 110 km/h</li>
            <li className="mb-2"><strong>Solar Cells Type:</strong> Silicon Heterojunction Cells</li>
            <li className="mb-2"><strong>Solar Area:</strong> 4 m²</li>
            <li className="mb-2"><strong>Motor Power:</strong> 1 kW nominal, 10 kW peak</li>
            <li className="mb-2"><strong>Motor Efficiency:</strong> 97.8 %</li>
          </ul>
          <img
            src="/path/to/specs-render.jpg"
            alt="Specifications graphic"
            className="flex-1 min-w-[300px] max-w-md self-center"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl mb-6">The story</h2>

        {/* Story Item 1 */}
        <div className="flex flex-wrap items-center mb-8">
          <img
            src="/path/to/story1.jpg"
            alt="Story 1"
            className="flex-1 min-w-[300px] max-w-md"
          />
          <p className="flex-1 min-w-[300px] p-4">
            With the Bridgestone World Solar Challenge 2021 being cancelled, 
            there was an uncertainty whether or not to build a solar car. Luckily,
             a large group of teams put their heads together and managed to organize the Moroccan Solar Challenge 2021!
          </p>
        </div>

        {/* Story Item 2 */}
        <div className="flex flex-wrap items-center mb-8 flex-row-reverse">
          <img
            src="/path/to/story2.jpg"
            alt="Story 2"
            className="flex-1 min-w-[300px] max-w-md"
          />
          <p className="flex-1 min-w-[300px] p-4">
           Racing in this challenge was our beloved Green Spirit, the second Top Dutch solar car.
            It is a 4-wheeled mono-hull solar car, hand-build from scratch with carbon and glass fibre.
          </p>
        </div>

        {/* Story Item 3 */}
        <div className="flex flex-wrap items-center mb-8">
          <img
            src="/path/to/story3.jpg"
            alt="Story 3"
            className="flex-1 min-w-[300px] max-w-md"
          />
          <p className="flex-1 min-w-[300px] p-4">
           With an 100% self-made electrical system and a nearly 100% self developed mechanical system, 
           we put all our knowledge and skills into this car.
          </p>
        </div>
      </section>
    </div>
  );
}