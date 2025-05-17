import React from 'react';

export default function GreenLightning() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-sans">

      {/* Hero Section */}
      <section className="relative text-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-4 py-2 rounded text-2xl">
          Green Lightning
        </div>
      </section>

      {/* Specifications */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl mb-6">The specifications</h2>
        <div className="flex flex-wrap gap-4">
          <ul className="flex-1 min-w-[300px] list-none p-0">
            <li className="mb-2"><strong>Year of Construction:</strong> 2019</li>
            <li className="mb-2"><strong>Weight:</strong> 150 kg</li>
            <li className="mb-2"><strong>Dimensions:</strong> 1.20 m × 1 m × 5 m</li>
            <li className="mb-2"><strong>Top Speed:</strong> 140 km/h</li>
            <li className="mb-2"><strong>Solar Cells Type:</strong> Single junction GaAs</li>
            <li className="mb-2"><strong>Solar Area:</strong> 3.56 m²</li>
            <li className="mb-2"><strong>Motor Power:</strong> 2 kW nominal, 15 kW peak</li>
            <li className="mb-2"><strong>Motor Efficiency:</strong> 96 %</li>
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
            Green Lightning was the first Top Dutch solar car and was the result of two years of engineering, from 2017 until 2019
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
            The light, mono-hulled, carbon body has enough space for innovative parts that have been built from scratch.
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
            Two examples of these custom parts are the four wheel steering system and composite leaf springs. 
            By using the four wheel steering system, the solar car can drive at an angle,
             which reduces aerodynamical resistance. The composite leaf springs contribute to the stability of the vehicle.
          </p>
        </div>
      </section>
    </div>
  );
}