import styles from '@/styles/about.module.css';

export default function About() {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-20 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="">About us</h1>
        <div className="flex flex-col gap-2">
          <p>
            At Outside The Box, we believe that productivity and creativity go
            hand-in-hand.
          </p>

          <p>
            Our co-working and study lounge is designed to provide a
            comfortable, inspiring, and collaborative space for students,
            freelancers, and professionals to work, learn, and connect.
          </p>

          <p>
            We believe that a productive environment should engage all senses,
            not just the mind. That&apos;s why we have created a unique
            workspace that brings a different vibe to the traditional workplace.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="h-1 w-20 bg-otb-blue" />

        <div className="flex gap-8">
          <img
            src="about1.jpg"
            alt="Image 1"
            className="block w-1/3 basis-1/3 rounded-3xl shadow-xl"
          />
          <img
            src="about2.jpg"
            alt="Image 2"
            className="block w-1/3 basis-1/3 rounded-3xl shadow-xl"
          />
          <img
            src="about3.jpg"
            alt="Image 3"
            className="block w-1/3 basis-1/3 rounded-3xl shadow-xl"
          />
        </div>

        <div className="h-1 w-20 bg-otb-blue" />
      </div>

      <Rule />
      <Pantry />
      <Outside />
    </div>
  );
}

function Rule() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className={styles.blue_box} />
        <h2 className="">House Rules</h2>
      </div>

      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <span className="text-base font-bold">
            Register at the front desk
          </span>{' '}
          before availing of the services offered by Outside The Box.
        </li>
        <li>
          <span className="text-base font-bold">Present any ID</span> (i.e.,
          government, school) to the staff upon registration.
        </li>
        <li>
          <span className="text-base font-bold">Be considerate.</span> Keep
          voices and noise down to a minimum to avoid disturbing other guests.
        </li>
        <li>
          <span className="text-base font-bold">
            Do not leave your things unattended.
          </span>{' '}
          Outside the Box shall not be liable for any loss.
        </li>
        <li>
          Any person not registered will{' '}
          <span className="text-base font-bold">not be permitted to enter</span>{' '}
          the premises.
        </li>
        <li>
          A <span className="text-base font-bold">10-minute grace period</span>{' '}
          is allowed before an additional hour is charged to your balance.
        </li>
        <li>
          <span className="text-base font-bold">
            Outside The Box is a safe space zone.
          </span>{' '}
          Any form of harassment, harmful or rude behavior to other guests
          and/or staff is not tolerated and allowed.
        </li>
        <li>
          <span className="text-base font-bold">
            Maintain a clean and tidy environment
          </span>{' '}
          for all users to enjoy. Any spills, stains, or damage caused to the
          property will result in a penalty fee, as we take the maintenance of
          our premises seriously.
        </li>
      </ul>
    </div>
  );
}

function Pantry() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className={styles.blue_box} />
        <h2 className="">Pantry Rules</h2>
      </div>

      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <span className="text-base font-bold">Clean</span> as you go. Please
          wash your utensils, plates, and mugs.
        </li>
        <li>
          Properly <span className="text-base font-bold">dispose</span> of your
          garbage.
        </li>
      </ul>
    </div>
  );
}

function Outside() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className={styles.blue_box} />
        <h2 className="">Outside Food</h2>
      </div>

      <ul className="flex list-disc flex-col gap-2 pl-4">
        <li>
          <span className="text-base font-bold">Outside food are allowed</span>{' '}
          with no corkage fee.
        </li>
        <li>
          <span className="text-base font-bold">
            However, strong foul-smelling food is prohibited.
          </span>
        </li>
      </ul>
    </div>
  );
}
