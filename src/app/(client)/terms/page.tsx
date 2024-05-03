'use client';
import Link from 'next/link';
import ScrollToTop from 'react-scroll-to-top';

export default function page() {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-2 px-[7%] py-16 pt-28 font-sans xl:px-0">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <h1 className="mb-6 text-center font-sans text-6xl font-bold">
        Terms and Conditions
      </h1>
      <div className="mt-6">
        <p className="mb-4 text-left text-xl">
          Welcome to our website <strong>Coursescape Coworking Space</strong>.
          Please read these terms and conditions carefully before using
          coursescapeph.com website operated by Coursescape Coworking Space
          {'("Site", "us", "we", "our")'}.
          <br />
          <br />
          The use of this website is subject to the following terms of use:
        </p>
        <h2 className="text-2xl font-bold underline">Conditions of use</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● By using this website, you certify that you have read and reviewed
            this Agreement and that you agree to comply with its terms. If you
            do not want to be bound by the terms of this Agreement, you are
            advised to stop using the website accordingly. Coursescape Coworking
            Space only grants the use and access to this website and its
            services to those who have accepted its terms. <br />● The content
            of the pages of this website is for your general information and use
            only. It is subject to change without notice.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">Privacy Policy</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● Before you continue using our website, we advise you to read our{' '}
            <Link href="privacy">
              <span className="text-xl font-bold">Privacy Policy</span>
            </Link>{' '}
            regarding our user data collection. It will help you better
            understand our practices.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">Intellectual Property</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● This website contains material which is owned by or licensed to
            us. This material includes but is not limited to, the design,
            layout, look, appearance, and graphics. Reproduction is prohibited
            other than in accordance with the copyright notice, which forms part
            of these terms and conditions.
            <br /> ● Unauthorized use of this website may give rise to a claim
            for damages and/or be a criminal offense.
            <br /> ● From time to time, this website may also include links to
            other websites. These links are provided for your convenience to
            provide further information. They do not signify that we endorse the
            website(s). We have no responsibility for the content of the linked
            website(s).
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">User accounts</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● As a user of this website, you may be asked to register with us
            and provide private information. You are responsible for ensuring
            the accuracy of this information, and you are responsible for
            maintaining the safety and security of your identifying information.
            You are also responsible for all activities that occur under your
            account or password.
            <br /> ● If you think there are any possible issues regarding the
            security of your account on the website, inform us immediately so we
            may address them accordingly.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">Disputes</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● Any disputes arising from the use of this website will be resolved
            in accordance with applicable laws.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">Idemnification</h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● You agree to indemnify Coursescape Coworking Space and its
            affiliates and hold Coursescape Coworking Space harmless against
            legal claims and demands that may arise from your use or misuse of
            our services. We reserve the right to select our own legal counsel.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">
          Limitation on liability
        </h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            ● Coursescape Coworking Space is not liable for any damages that may
            occur to you as a result of your misuse of our website. <br />●
            Coursescape Coworking Space reserves the right to edit, modify, and
            change this Agreement at any time. We shall let our users know of
            these changes through electronic mail. This Agreement is an
            understanding between Coursescape Coworking Space and the user, and
            this supersedes and replaces all prior agreements regarding the use
            of this website.
            <br />
            <br />
            By using this website, you acknowledge that you have read,
            understood, and agreed to these terms of use.
            <br />
            <br /> If you have any questions or concerns about these terms,
            please contact us at coursescapeph@gmail.com
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">
          Payment Process for Customers
        </h2>
        <p className="mb-4 text-left text-xl">
          <strong>1. Payment Options: </strong>Customers have three options for
          making payments via QR code: GCash, Maya, and BPI. Please refer to the
          following steps for each payment method:
          <br />
        </p>

        <ul>
          <li className="mb-4 text-left text-xl">
            <strong>A. GCASH</strong>
            <ul className="pl-4">
              <li>a. Access the GCash homepage and tap on {'"QR"'}</li>
              <li>b. Scan the provided GCash QR code</li>
              <li>
                c. Enter the amount and an optional message, then tap {'"Next"'}
              </li>
              <li>
                d. Confirm the details and tap {'"Send"'} to complete the
                transaction
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4 text-left text-xl">
            <strong>B. MAYA</strong>
            <ul className="pl-4">
              <li>
                a. Tap {'"Scan to Pay"'} at the bottom of the Maya app&apos;s
                home screen.
              </li>
              <li>b. Scan the provided Maya QR code</li>
              <li>
                c. The merchant name will appear on your screen, where you can
                input the payment amount
              </li>
              <li>
                d. Click &quot;Send Payment&quot; or {'"Pay"'} to complete the
                transaction
              </li>
            </ul>
          </li>
        </ul>
        <ul>
          <li className="mb-4 text-left text-xl">
            <strong>C. BPI</strong>
            <ul className="pl-4">
              <li>
                a. Log in to the BPI app and tap{' '}
                <strong>Transfer {'>'} Transfer </strong>via QR code
              </li>
              <li>b. Scan the provided BPI QR code</li>
              <li>c. Select the account you want tot transfer from</li>
              <li>
                d. Enter the amount you want to transfer, if needed, then tap
                “Continue”
              </li>
              <li>
                e. Review the details of your transaction and tap “Confirm”
              </li>
              <li>f. Approve your transaction with Mobile Key</li>
            </ul>
          </li>
        </ul>
        <p className="mb-4 text-left text-xl">
          <strong>2. Payment Confirmation: </strong>We will confirm receipt of
          payment once we have received proof of payment via our website, and it
          has been processed through the chosen payment method.
          <br />
        </p>
        <p className="mb-4 text-left text-xl">
          <strong>3. Reservation Confirmation: </strong>Upon payment
          confirmation, we will confirm your reservation, and you will receive
          an SMS notification regarding the status of your reservation.
          <br />
        </p>
        <p className="mb-4 text-left text-xl">
          <strong>4. Reservation Acknowledgment: </strong>Failure to provide
          payment confirmation will result in non-acknowledgment of your
          reservation, and you may opt to visit as a walk-in customer
          <br />
          <br />
          For further details regarding reservation, cancellation, refund,
          rescheduling, and registration please refer to the terms and
          conditions and rules and regulations provided below.
        </p>

        <h2 className="text-2xl font-bold underline">Reservation</h2>
        <h3 className="text-xl font-bold ">For facility reservation:</h3>
        <ul>
          <li className="mb-4 text-left text-xl">
            1. An amount of Php 2,500.00 per extra hour exceeding the time frame
            agreed will be charged to the outstanding balance.
            <br /> 2. Guests are strictly required to observe the house rules as
            posted in the venue.
          </li>
          <ul className="ml-2">
            <h3 className="text-xl font-bold ">Inclusions:</h3>
            <li className="mb-4 text-left text-xl">
              1. Unlimited Coffee <br />
              2. Unlimited Purified Water <br />
              3. Free Use of 24&quot; Flat Screen TV (upon request) OR Free Use
              of Projector and Projector Screen <br />
              4. Free Use of Sound System (Speakers and 2 Microphones) <br />
              5. No Corkage Fee (No foul-smelling food allowed) <br />
              6. Free Use of Unlimited Wi-Fi
            </li>
          </ul>
        </ul>
        <h3 className="text-xl font-bold ">For seat reservation:</h3>
        <ul>
          <li className="mb-4 text-left text-xl">
            1. A non-refundable reservation fee of 50% of the agreed rate is
            required to confirm the client&apos;s reservation. The remaining
            balance is payable on the date of the client&apos;s stay.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">
          Cancellation/Refunds/Rescheduling
        </h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            1. The reservation fee is non-refundable under any circumstances,
            including but not limited to cancellations, rescheduling, or changes
            in the event details.
            <br />
            <ul>
              <li className="ml-2 text-xl font-bold">Exception(s):</li>
              <li className="ml-4 text-xl">
                a. If Coursescape Coworking Space cancels the booking due to
                unforeseen maintenance, repairs, or unavailability of the
                premises beyond the control of Coursescape, the non-refundable
                deposit may be credited towards a future booking or partially
                refunded, as decided by the management.{' '}
              </li>
            </ul>
            2. Changes in date and/or time are subject to the availability of
            the venue. As management will try to accommodate changes proposed by
            the client, no guarantee is placed on the ability to accommodate
            such changes. Additional fees may apply depending on the requests.
          </li>
        </ul>
        <h2 className="text-2xl font-bold underline">
          Rules and Regulations for Customers
        </h2>
        <ul>
          <li className="mb-4 text-left text-xl">
            <strong>I. Registration Process:</strong> Present any valid ID
            (i.e., government, school) to the staff upon registration. Any
            person not registered will not be permitted to enter the premises.
            <br />
            <ul className="pl-4">
              <li>
                <strong>A. Walk-In Customers</strong>
                <ul className="pl-6">
                  <li>
                    1. Register at the front desk
                    <ul className="pl-8">
                      <li>
                        a{')'} New Customer:** Create an account on our website
                        before proceeding.
                      </li>
                      <li>
                        b{')'} Existing Customer:** If you already have an
                        account, proceed with the registration at the front desk
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <strong>B. Reservation Customers</strong>
                <ul className="pl-6">
                  <li>
                    1. Present the confirmation text received regarding your
                    successful reservation.
                  </li>
                  <li>
                    2. The staff will register you at the front desk using the
                    reservation you created.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="mb-4 text-left text-xl">
            <strong>II. General Rules:</strong>
            <ul className="pl-4">
              <li>
                <strong>A. Courtesy.</strong> Be considerate. Keep voices and
                noises down to a minimum to avoid disturbing other guests.
              </li>
              <li>
                <strong>B. Security.</strong> Do not leave your things
                unattended. Coursescape Coworking Space shall not be liable for
                any loss.
              </li>
              <li>
                <strong>C. Time Management.</strong> A 10-minute grace period is
                allowed before an additional hour is charged to your balance.
              </li>
              <li>
                <strong>D. Cleanliness.</strong> Maintain a clean and tidy
                environment for all users to enjoy. Any spills, stains, or
                damage caused to the property will result in a penalty fee, as
                we take the maintenance of our premises seriously.
              </li>
              <li>
                <strong>E. CLAYGO.</strong> Follow the {'"Clean As You Go"'}{' '}
                rule: Please clean up after yourself and dispose of any waste
                properly. This helps maintain a pleasant environment for all
                users of the workspace.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
