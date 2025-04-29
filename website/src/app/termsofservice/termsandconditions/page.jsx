"use client";

import React from "react";
import { Navbar } from "../../util/navbar";

export default function TermsAndConditions() {
  return (
    <div className="relative bg-[var(--background)] min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 lg:px-32 xl:px-64 text-white">
        <h1 className="text-3xl font-bold mb-6">
          Terms and Conditions of Stichting Solar Racing Groningen
        </h1>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Crowdfunding Campaign Donations
            </h3>
            <p>
              All donations made to Stichting Solar Racing Groningen's
              crowdfunding campaign are voluntary and non-refundable. The
              non-profit organization running the campaign is not obligated to
              provide any goods or services in return for donations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Use of Funds</h3>
            <p>
              The proceeds of the donations will be used solely for the purpose
              of supporting the non-profit organization's logistical aspects of
              the project and technology development and research. Stichting
              Solar Racing Groningen will use best efforts to ensure that the
              funds are used effectively and efficiently towards the stated
              purpose.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Public Disclosure</h3>
            <p>
              The donors acknowledge that their donation amount will be placed
              on the website solarfunds.nl as a public disclosure. The donor's
              name and email address may also be displayed on the website unless
              the donor requests otherwise.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Tax Deductibility</h3>
            <p>
              Donations made to Stichting Solar Racing Groningen may be
              tax-deductible in accordance with applicable tax laws. However, it
              is the responsibility of the donor to consult with a tax
              professional regarding the tax implications of their donation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Privacy</h3>
            <p>
              Stichting Solar Racing Groningen will collect and use personal
              information of donors solely for the purpose of processing their
              donation and keeping them informed about the campaign. The
              non-profit organization will not share or sell donor information
              to any third parties.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Liability</h3>
            <p>
              Stichting Solar Racing Groningen shall not be liable for any
              damages or losses arising from the use of the funds donated by the
              donors. Stichting Solar Racing Groningen shall not be liable for
              any technical malfunctions or issues that may arise during the
              course of the crowdfunding campaign.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Modifications</h3>
            <p>
              Stichting Solar Racing Groningen reserves the right to modify or
              update these terms and conditions at any time. Any changes made to
              the terms and conditions will be effective immediately upon
              posting.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Governing Law</h3>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of the Netherlands. By donating to the
              crowdfunding campaign, donors agree to these terms and conditions.
            </p>
          </div>

          <div>
            <p>
              If you have any questions about these terms and conditions or the
              crowdfunding campaign, please contact us at{" "}
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
