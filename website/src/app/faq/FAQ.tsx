"use client";
import React from "react";

export default function FAQContent() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <div className="space-y-8">
        {/* Question 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What is Top Dutch Solar Racing?
          </h2>
          <p className="mt-1">
            Top Dutch Solar Racing is a student-led initiative based in the north of the Netherlands. Our multidisciplinary team of engineering, design,
            and business students collaborates to conceive, design, and construct a high-performance solar-electric vehicle. We aim to demonstrate the
            potential of sustainable mobility by competing in international solar challenges.
          </p>
        </div>

        {/* Question 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What is the Bridgestone World Solar Challenge?
          </h2>
          <p className="mt-1">
            The Bridgestone World Solar Challenge is a biennial endurance race spanning approximately 3,000 kilometres across Australia’s Outback,
            from Darwin to Adelaide. Established in 1987, the event challenges teams worldwide to design, build, and race solar-powered vehicles
            under real-world conditions, promoting innovation in renewable energy and sustainable transport.
          </p>
        </div>

        {/* Question 3 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            How does the solar charging system work?
          </h2>
          <p className="mt-1">
            Our vehicle is covered with state-of-the-art photovoltaic panels that convert sunlight into electrical energy. This energy is then stored in a
            high-energy-density lithium-ion battery pack. An advanced energy management system optimises power distribution between propulsion, battery
            charging, and auxiliary systems to maximise efficiency throughout the race.
          </p>
        </div>

        {/* Question 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What technical regulations must the car adhere to?
          </h2>
          <p className="mt-1">
            The World Solar Challenge enforces strict technical and safety regulations, including:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Maximum vehicle dimensions (length, width, and height)</li>
            <li>Minimum occupant protection and roll-over safety standards</li>
            <li>Electrical system specifications, including photovoltaic array limits</li>
            <li>Braking and steering system requirements</li>
            <li>Driver comfort and visibility criteria</li>
          </ul>
          <p className="mt-2">
            Our design process incorporates these regulations at each stage to ensure full compliance and on-track safety.
          </p>
        </div>

        {/* Question 5 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What performance can be expected from the vehicle?
          </h2>
          <p className="mt-1">
            Under optimal conditions, our solar-electric car can achieve average speeds of 80–100&nbsp;km/h. The maximum design speed is constrained by event
            regulations to approximately 130&nbsp;km/h. Actual performance depends on solar irradiance, ambient temperature, and course topology.
          </p>
        </div>

        {/* Question 6 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            How can I support or sponsor the team?
          </h2>
          <p className="mt-1">
            We welcome collaboration with sponsors and partners who share our vision for sustainable innovation. Sponsorship packages include branding
            exposure on the vehicle, promotional materials, and hospitality during events. For inquiries, please contact us at{' '}
            <a href="mailto:sponsor@topdutchsolarracing.nl" className="underline text-white hover:text-[var(--green2)]">
              sponsor@topdutchsolarracing.nl
            </a>.
          </p>
        </div>

        {/* Question 7 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Where can I follow the team&apos;s progress?
          </h2>
          <p className="mt-1">
            Updates, technical insights, and live race tracking are available on our official channels:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>
              Website:{' '}
              <a
                href="https://www.topdutchsolarracing.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-white hover:text-[var(--green2)]"
              >
                www.topdutchsolarracing.nl
              </a>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/company/solarracing/?originalSubdomain=nl" className="text-white hover:text-[var(--green2)] ">
              Top Dutch Solar Racing
              </a>
            </li>
            <li>Instagram:{' '} 
              <a href="https://www.instagram.com/topdutchsolarracing/?hl=en"  className="text-white hover:text-[var(--green2)] ">
              @topdutchsolarracing
              </a>
            </li>

            <li>
              Twitter:{' '} 
              <a href="https://twitter.com/tdsolarracing" className="text-white hover:text-[var(--green2)] ">
               @TD_SolarRacing
              </a> 
            </li>
          </ul>
        </div>

        {/* Question 8 */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Who can I contact for further information?
          </h2>
          <p className="mt-1">
            For general inquiries, please reach out to our communications manager at{' '}
            <a href="mailto:info@topdutchsolarracing.nl" className="text-white underline hover:text-[var(--green2)] ">
              info@topdutchsolarracing.nl
            </a>.
            We will respond to your message as promptly as possible.
          </p>
        </div>
      </div>
    </section>
  );
}
