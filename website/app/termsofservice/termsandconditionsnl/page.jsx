"use client";

import React from "react";
import { Navbar } from "../../util/navbar";
import Footer from "@/app/util/footer";

export default function TermsAndConditionsNL() {
  return (
    <div className="relative bg-[var(--background)] min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 lg:px-32 xl:px-64 text-white">
        <h1 className="text-3xl font-bold mb-6">
          Algemene voorwaarden voor de crowdfundingcampagne van Stichting Solar
          Racing Groningen
        </h1>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Donaties</h3>
            <p>
              Alle donaties aan de crowdfundingcampagne van Stichting Solar
              Racing Groningen zijn vrijwillig en niet terugbetaalbaar. De
              non-profitorganisatie die de campagne runt, is niet verplicht om
              enige goederen of diensten te leveren in ruil voor donaties.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Gebruik van de opbrengst
            </h3>
            <p>
              De opbrengst van de donaties zal uitsluitend worden gebruikt ter
              ondersteuning van de logistieke aspecten van het project en de
              ontwikkeling en onderzoek van technologie. Stichting Solar Racing
              Groningen zal zich inspannen om ervoor te zorgen dat de fondsen
              effectief en efficiënt worden gebruikt voor het aangegeven doel.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Openbaarmaking</h3>
            <p>
              De donateurs erkennen dat hun donatiebedrag zal worden geplaatst
              op de website solarfunds.nl als openbaarmaking. De naam en
              e-mailadres van de donor kunnen ook op de website worden
              weergegeven, tenzij de donor anders verzoekt.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Belastingaftrek</h3>
            <p>
              Donaties aan Stichting Solar Racing Groningen kunnen aftrekbaar
              zijn volgens de toepasselijke belastingwetgeving. Het is echter de
              verantwoordelijkheid van de donor om een ​​belastingdeskundige te
              raadplegen over de belastingimplicaties van hun donatie.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Privacy</h3>
            <p>
              Stichting Solar Racing Groningen zal persoonlijke informatie van
              donateurs verzamelen en gebruiken uitsluitend voor het verwerken
              van hun donatie en om hen op de hoogte te houden van de campagne.
              De non-profitorganisatie zal geen donorgegevens delen of verkopen
              aan derden.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Aansprakelijkheid</h3>
            <p>
              Stichting Solar Racing Groningen is niet aansprakelijk voor enige
              schade of verliezen die voortvloeien uit het gebruik van de door
              de donateurs gedoneerde fondsen. Stichting Solar Racing Groningen
              is niet aansprakelijk voor technische storingen of problemen die
              zich kunnen voordoen tijdens de crowdfundingcampagne.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Wijzigingen</h3>
            <p>
              Stichting Solar Racing Groningen behoudt zich het recht voor om
              deze algemene voorwaarden op elk moment te wijzigen of bij te
              werken. Eventuele wijzigingen in de algemene voorwaarden zijn
              onmiddellijk van kracht na plaatsing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Toepasselijk recht</h3>
            <p>
              Deze algemene voorwaarden worden beheerst door en geïnterpreteerd
              in overeenstemming met de wetten van Nederland.
            </p>
          </div>

          <div>
            <p>
              Door te doneren aan de crowdfundingcampagne, stemmen donateurs in
              met deze algemene voorwaarden. Als u vragen heeft over deze
              algemene voorwaarden of de crowdfundingcampagne, neem dan contact
              met ons op via{" "}
              <a
                href="mailto:info@solarracinggroningen.nl"
                className="underline text-[var(--green1)]"
              >
                info@solarracinggroningen.nl
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
