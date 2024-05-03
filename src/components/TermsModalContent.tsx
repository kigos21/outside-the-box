import Link from 'next/link';

function TermsModalContent() {
  return (
    <div>
      <h2 className="text-3xl font-bold leading-6 text-gray-900">
        Terms and Conditions
      </h2>
      <div className="mt-6">
        <p className="mb-4 text-left text-sm">
          Welcome to our website <strong>Coursescape Coworking Space</strong>.
          Please read these terms and conditions carefully before using
          coursescapeph.com website operated by Coursescape Coworking Space
          {'("Site", "us", "we", "our")'}.
          <br />
          <br />
          The use of this website is subject to the following terms of use:
        </p>
        <h2 className="text-lg font-bold underline">Conditions of use</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
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
        <h2 className="text-lg font-bold underline">Privacy Policy</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
            ● Before you continue using our website, we advise you to read our{' '}
            <Link href="privacy">
              <span className="text-sm font-bold">Privacy Policy</span>
            </Link>{' '}
            regarding our user data collection. It will help you better
            understand our practices.
          </li>
        </ul>
        <h2 className="text-lg font-bold underline">Intellectual Property</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
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
        <h2 className="text-lg font-bold underline">User accounts</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
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
        <h2 className="text-lg font-bold underline">Disputes</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
            ● Any disputes arising from the use of this website will be resolved
            in accordance with applicable laws.
          </li>
        </ul>
        <h2 className="text-lg font-bold underline">Idemnification</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
            ● You agree to indemnify Coursescape Coworking Space and its
            affiliates and hold Coursescape Coworking Space harmless against
            legal claims and demands that may arise from your use or misuse of
            our services. We reserve the right to select our own legal counsel.
          </li>
        </ul>
        <h2 className="text-lg font-bold underline">Limitation on liability</h2>
        <ul>
          <li className="mb-4 text-left text-sm">
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
      </div>
    </div>
  );
}
export default TermsModalContent;
