'use client';
import ScrollToTop from 'react-scroll-to-top';

export default function page() {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-2 px-[7%] py-16 pt-28 font-sans xl:px-0">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <h1 className="mb-6 text-center font-sans text-6xl font-bold">
        Privacy Policy
      </h1>
      <p className="mb-4 text-left text-xl">
        <strong>Coursescape Coworking Space</strong> regards the privacy of your
        information as paramount. This Privacy Policy outlines the types of
        information we collect, how we use it, who we might share it with, and
        your choices surrounding this data.
      </p>
      <h2 className="text-2xl font-bold underline">Information We Collect</h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          <strong>Account Information:</strong> When you register for an
          account, we collect your name, whether you identify as a student or
          professional, and your mobile number.
        </li>
        <li className="mb-4 text-left text-xl">
          <strong>Reservation Information:</strong> When you reserve a seat, we
          store the reservation details for record-keeping.
        </li>
        <li className="mb-4 text-left text-xl">
          <strong>Log Information:</strong> We may collect information related
          to your use of our website, including your IP address, browser type,
          pages visited, and dates and times of access.
        </li>
      </ul>
      <h2 className="text-2xl font-bold underline">
        How We Use Your Information
      </h2>
      <ul>
        <li className="mb-4 text-left text-xl">
          <strong>Provide Services:</strong> We primarily use your data to
          operate our coworking and study lounge website, including creating
          your account, managing reservations, and maintaining logs.
        </li>
        <li className="mb-4 text-left text-xl">
          <strong>Communications:</strong> We may use your mobile number to send
          you notifications about your reservations or important updates about
          our services.
        </li>
        <li className="mb-4 text-left text-xl">
          <strong>Improvement:</strong> We might analyze usage data to improve
          the efficiency and user experience of our website.
        </li>
        <li className="mb-4 text-left text-xl">
          <strong>Security:</strong> We may use your information to enforce our
          website&apos;s security and protect against unauthorized access.
        </li>
      </ul>
    </div>
  );
}
