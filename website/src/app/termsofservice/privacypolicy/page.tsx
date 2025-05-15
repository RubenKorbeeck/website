"use client";

import React from "react";
import Navbar from "../../util/navbar";
import Footer from "../../util/footer";

export default function PrivacyPolicy() {
  return (
    <div className="relative bg-[var(--background)] min-h-screen">
        <Navbar showLogoImmediately/>
      <div className="pt-24 px-12 sm:px-8 lg:px-32 xl:px-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-6">
          Stichting Solar Racing Groningen, gevestigd aan Zernikelaan 17, 9747 AA Groningen,
          is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
        </p>

        <p className="mb-6">
          <strong>Contactgegevens:</strong> <br />
          <a href="https://solarracing.nl/" className="underline text-[var(--green1)]">https://solarracing.nl/</a><br />
          Zernikelaan 17, 9747 AA Groningen <br />
          +31 6 40890154
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Persoonsgegevens die wij verwerken</h2>
        <p className="mb-4">
          Stichting Solar Racing Groningen verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten
          en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Voor- en achternaam</li>
          <li>Adresgegevens</li>
          <li>Telefoonnummer</li>
          <li>E-mailadres</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Bijzondere en/of gevoelige persoonsgegevens die wij verwerken</h2>
        <p className="mb-6">
          Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar,
          tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is.
          Als u ervan overtuigd bent dat wij zonder toestemming persoonlijke gegevens hebben verzameld over een minderjarige,
          neem dan contact met ons op via <a href="mailto:info@solarracinggroningen.nl" className="underline text-[var(--green1)]">info@solarracinggroningen.nl</a>, dan verwijderen wij deze informatie.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</h2>
        <p className="mb-4">
          Stichting Solar Racing Groningen verwerkt uw persoonsgegevens voor de volgende doelen:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Het afhandelen van uw betaling</li>
          <li>Verzenden van onze nieuwsbrief en/of reclamefolder</li>
          <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
          <li>Om goederen en diensten bij u af te leveren</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Hoe lang we persoonsgegevens bewaren</h2>
        <p className="mb-6">
          Stichting Solar Racing Groningen bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren
          waarvoor uw gegevens worden verzameld. Wij hanteren een bewaartermijn van 5 jaar.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Delen van persoonsgegevens met derden</h2>
        <p className="mb-6">
          Stichting Solar Racing Groningen verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de
          uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting. Met bedrijven die uw gegevens verwerken
          in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Cookies, of vergelijkbare technieken, die wij gebruiken</h2>
        <p className="mb-6">
          Stichting Solar Racing Groningen gebruikt alleen technische en functionele cookies, en analytische cookies die geen inbreuk maken op uw privacy.
          Deze cookies zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak. U kunt zich afmelden voor cookies via de instellingen van uw browser.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Gegevens inzien, aanpassen of verwijderen</h2>
        <p className="mb-6">
          U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. U kunt een verzoek sturen naar
          <a href="mailto:info@solarracinggroningen.nl" className="underline text-[var(--green1)]"> info@solarracinggroningen.nl</a>.
          Wij reageren binnen vier weken. U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens:
          <a href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons" className="underline text-[var(--green1)]"> tip ons</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Hoe wij persoonsgegevens beveiligen</h2>
        <p className="mb-6">
          Stichting Solar Racing Groningen neemt passende maatregelen om misbruik, verlies, onbevoegde toegang,
          ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan.
          Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn, neem dan contact met ons op via het bovengenoemde e-mailadres.
        </p>
      </div>
      <Footer />
      
    </div>
  );
}
