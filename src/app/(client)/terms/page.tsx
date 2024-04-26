'use client';
import ScrollToTop from 'react-scroll-to-top';

export default function page() {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-2 px-[7%] py-16 pt-28 font-sans xl:px-0">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <h1 className="mb-6 text-center font-sans text-6xl font-bold">
        Terms and Conditions
      </h1>
      <p className="mb-4 text-left text-xl">
        By using our website and services, you agree to be bound by these Terms
        and Conditions. If you do not agree, please do not use our website.
        These Terms govern your use of Coursescape Coworking Space&apos;s online
        logbook and reservation website for our coworking and study lounge.
      </p>
      <h2 className="text-2xl font-bold underline">Reservations</h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          Reservations can be made through our website after logging in.
        </li>
        <li className="mb-4 text-left text-xl">
          Payment for reservations will be made through the provided options.
        </li>
        <li className="mb-4 text-left text-xl">
          Cancellations must be made at least 24 hours in advance. Late
          cancellations or no-shows are not entitled to a refund.
        </li>
      </ul>
      <h2 className="text-2xl font-bold underline">User Conduct</h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          You agree to use our coworking and study lounge respectfully.
        </li>
        <li className="mb-4 text-left text-xl">
          You will not engage in disruptive, abusive, or illegal behavior.
        </li>
        <li className="mb-4 text-left text-xl">
          You will use the facilities and equipment with care and report any
          damage.
        </li>
      </ul>
      <h2 className="text-2xl font-bold underline">Liability</h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          We are not liable for any loss or damage to your personal belongings,
          or for injuries arising from use of our facilities, except when caused
          by our gross negligence.
        </li>
      </ul>
      <h2 className="text-2xl font-bold underline">Termination</h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          We may terminate your access to our Services if you violate these
          Terms, or for any other reason, at our discretion.
        </li>
      </ul>
    </div>
  );
}
