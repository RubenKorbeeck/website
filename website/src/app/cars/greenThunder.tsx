import React from 'react';

export default function GreenThunder() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-white font-sans">

      {/* Hero Section */}
      <section className="relative text-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 px-4 py-2 rounded text-2xl">
          Green Thunder
        </div>
      </section>

      {/* Specifications */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl mb-6">The specifications</h2>
        <div className="flex flex-wrap gap-4">
          <ul className="flex-1 min-w-[300px] list-none p-0">
            <li className="mb-2"><strong>Year of Construction:</strong> 2023</li>
            <li className="mb-2"><strong>Weight:</strong> 160 kg</li>
            <li className="mb-2"><strong>Dimensions:</strong> 1.26 m × 1 m × 5 m</li>
            <li className="mb-2"><strong>Top Speed:</strong> 130 km/h</li>
            <li className="mb-2"><strong>Solar Cells Type:</strong> Tandem silicon-perovskite</li>
            <li className="mb-2"><strong>Solar Area:</strong> 4 m²</li>
            <li className="mb-2"><strong>Motor Power:</strong> 1 kW nominal, 15 kW peak</li>
            <li className="mb-2"><strong>Motor Efficiency:</strong> 97.5 %</li>
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
            Green Thunder is the third iteration of their innovative solar cars, following the successful Green Lightning and Green Spirit models.
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
            The car incorporates the speed and efficiency demonstrated by Green Lightning, 
            which managed to secure a pole position start and a fourth-place finish at the team`&aposs debut in the 
            2019 Bridgestone World Solar Challenge. Furthermore,
             it builds on the resilience and reliability shown by Green Spirit, the team`&aposs second solar car that was revealed in 2021.
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
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>
    </div>
  );
}