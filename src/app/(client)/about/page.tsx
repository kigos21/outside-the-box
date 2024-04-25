/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/about.module.css';

export default function About() {
  return (
    <div className=" mx-auto flex max-w-screen-lg flex-col gap-20 px-[7%] py-16 pt-32 font-sans xl:px-0">
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-2/5 overflow-hidden">
          <img
            src="/coursescape-logo-cropped-bg.png"
            className="w-full rounded-lg"
            alt="Coursescape-logo"
          />
        </div>
        <div className="mx-auto flex w-1/2 flex-col gap-2 text-justify">
          <p>
            At{''} <span className=" font-bold">coursescape</span>, we believe
            that <span className=" font-bold">productivity and creativity</span>{' '}
            go hand-in-hand.
          </p>

          <p>
            Our co-working and study lounge is designed to provide a {''}
            <span className=" font-bold">
              comfortable, inspiring, and collaborative
            </span>{' '}
            space for students, freelancers, and professionals to {''}
            <span className=" font-bold">work, learn, and connect.</span>
          </p>

          <p>
            We believe that a productive environment should engage all senses,
            not just the mind. That&apos;s why we have created a{' '}
            <span className=" font-bold">unique workspace</span> that brings a
            different vibe to the traditional workplace.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap gap-24 sm:flex-nowrap">
          <div className="w-full sm:w-1/2">
            <img
              src="about1-new.png"
              alt="Image 1"
              className="block h-full w-full rounded-3xl shadow-xl"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <img
              src="about2-new.png"
              alt="Image 2"
              className="block h-full w-full rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>

      <Rule />
      <Pantry />
      <Outside />
    </div>
  );
}

function Rule() {
  return (
    <div id="rule" className="flex flex-col gap-2">
      <div className="mx-auto flex w-9/12 items-center gap-4">
        <h2 className="text-cs-orange font-bold">House Rules</h2>
      </div>
      <div className="mx-auto h-1 w-9/12 bg-[#a6a6a6]" />

      <ul className="mx-auto flex w-9/12 list-disc flex-col gap-2 pl-4">
        <li>
          <span className="text-base font-bold">
            Register at the front desk
          </span>{' '}
          before availing of the services offered by Coursescape.
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
          Coursescape shall not be liable for any loss.
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
            Coursescape is a safe space zone.
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
    <div className="flex flex-col gap-2">
      <div className="mx-auto flex w-9/12 items-center gap-4">
        <h2 className="text-cs-orange font-bold">Pantry Rules</h2>
      </div>
      <div className="mx-auto h-1 w-9/12 bg-[#a6a6a6]" />

      <ul className="mx-auto flex w-9/12 list-disc flex-col gap-2 pl-4">
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
    <div className="flex flex-col gap-2">
      <div className="mx-auto flex w-9/12 items-center gap-4">
        <h2 className="text-cs-orange font-bold">Outside Food</h2>
      </div>
      <div className="mx-auto h-1 w-9/12  bg-[#a6a6a6]" />

      <ul className="mx-auto flex w-9/12 list-disc flex-col gap-2 pl-4">
        <li>
          <span className="text-base font-bold">Outside food are allowed</span>{' '}
          with no corkage fee.
        </li>
        <li>
          However,{' '}
          <span className="text-base font-bold">
            strong foul-smelling food is prohibited.
          </span>
        </li>
      </ul>
    </div>
  );
}
