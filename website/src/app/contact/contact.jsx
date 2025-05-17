export default function Contact() {
  return (
    <main className="flex flex-col items-center px-8 py-16">
      {/* Page Title Centered Above */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold leading-tight">
          <br />
          <span>Contact Details</span>
        </h1>
      </div>

      {/* Responsive layout: stack on small, two columns on md+ */}
      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-5xl gap-12">
        {/* Left Side: Email Contacts */}
        <div className="w-full md:w-1/2 text-left space-y-4">
          <h2 className="text-3xl font-semibold">Emails:</h2>
          <p>
            <span className="font-bold">
              If you want further information about our team or if you have
              questions:
            </span>
            <br />
            <a
              href="mailto:info@solarracinggroningen.nl"
              className="underline hover:text-[var(--green2)]"
            >
              info@solarracinggroningen.nl
            </a>
          </p>
          <p>
            <span className="font-bold">
              If you want to reach out to the board:
            </span>
            <br />
            <a
              href="mailto:bestuur@solarracinggroningen.nl"
              className="underline hover:text-[var(--green2)]"
            >
              bestuur@solarracinggroningen.nl
            </a>
          </p>
          <p>
            <span className="font-bold">
              If you want to get in touch with our Communication department:
            </span>
            <br />
            <a
              href="mailto:pers@solarracinggroningen.nl"
              className="underline hover:text-[var(--green2)]"
            >
              pers@solarracinggroningen.nl
            </a>
          </p>
          <p>
            <span className="font-bold">
              If you want to contact us for business purposes:
            </span>
            <br />
            <a
              href="mailto:acquisition@solarracinggroningen.nl"
              className="underline hover:text-[var(--green2)]"
            >
              acquisition@solarracinggroningen.nl
            </a>
          </p>
          <p>
            <span className="font-bold">
              If you want to apply for a position within our team:
            </span>
            <br />
            <a
              href="mailto:become@solarracinggroningen.nl"
              className="underline hover:text-[var(--green2)]"
            >
              become@solarracinggroningen.nl
            </a>
          </p>
        </div>

        {/* Right Side: Google Map */}
        <div className="w-full md:w-1/2 text-center">
          <iframe
            width="100%"
            height="450"
            className="border-0"
            loading="lazy"
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1193.667753168976!2d6.530483!3d53.247687!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9cd1b9bc08113%3A0x971883efdde471d8!2sTop%20Dutch%20Solar%20Racing!5e0!3m2!1sen!2snl!4v1747403228897!5m2!1sen!2snl"
            title="TDSR Location"
          />
        </div>
      </div>
    </main>
  );
}
