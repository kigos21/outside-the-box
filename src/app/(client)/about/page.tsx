import React from 'react';

export default function About() {
  return (
    <main className="p-20 text-center">
      <h1 className="bg-otb-yellow-100 mb-20 text-5xl font-bold">About us!</h1>
      <p className="mx-auto max-w-2xl text-center font-sans text-2xl">
        At Outside The Box, we believe that productivity and creativity go
        hand-in-hand.
        <br />
        <br />
        Our co-working and study lounge is designed to provide a comfortable,
        inspiring, and collaborative space for students, freelancers, and
        professionals to work, learn, and connect.
        <br />
        <br />
        We believe that a productive environment should engage all senses, not
        just the mind. That&apos;s why we have created a unique workspace that
        brings a different vibe to the traditional workplace.
      </p>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <img
          src="about1.jpg"
          alt="Image 1"
          style={{ maxWidth: '30%', height: 'auto', marginRight: '10px' }}
        />
        <img
          src="about2.jpg"
          alt="Image 2"
          style={{ maxWidth: '30%', height: 'auto', marginRight: '10px' }}
        />
        <img
          src="about3.jpg"
          alt="Image 3"
          style={{ maxWidth: '30%', height: 'auto', marginRight: '10px' }}
        />
      </div>

      <div className="ml-4 mt-10 text-left ">
        <Rule />
      </div>
      <div className="ml-4 mt-10 text-left ">
        <Pantry />
      </div>
      <div className="ml-4 mt-10 text-left ">
        <Outside />
      </div>
    </main>
  );
}

function Rule() {
  return (
    <div className="items-right  flex">
      <div className="mb-2 mt-9 h-9 w-9 bg-blue-400"></div>
      <div className="flex-col">
        <h1 className="mb-4 ml-11 mt-4 text-5xl font-bold"> House Rules </h1>

        <p className="text-lg">
          1. Register at the front desk before availing of the services offered
          by Outside The Box.
          <br />
          2. Present any ID (i.e., government, school) to the staff upon
          registration.
          <br />
          3. Be considerate. Keep voices and noise down to a minimum to avoid
          disturbing other guests.
          <br />
          4. Do not leave your things unattended. Outside the Box shall not be
          liable for any loss.
          <br />
          5. Any person not registered will not be permitted to enter the
          premises.
          <br />
          6. A 10-minute grace period is allowed before an additional hour is
          charged to your balance.
          <br />
          7. Outside The Box is a safe space zone. Any form of harassment,
          harmful or rude behavior to other guests and/or staff is not tolerated
          and allowed.
          <br />
          8. Maintain a clean and tidy environment for all users to enjoy. Any
          spills, stains, or damage caused to the property will result in a
          penalty fee, as we take the maintenance of our premises seriously.
        </p>
      </div>
    </div>
  );
}

function Pantry() {
  return (
    <div className="items-right  flex">
      <div className="mb-2 mt-5 h-9 w-9 bg-blue-400"></div>
      <div className="flex-col">
        <h1 className="mb-4 ml-11 mt-4 text-5xl font-bold"> Pantry Rules </h1>

        <p className="text-lg">
          1. Clean as you go. Please wash your utensils, plates, and mugs.
          <br />
          2. Properly dispose of your garbage.
          <br />
        </p>
      </div>
    </div>
  );
}

function Outside() {
  return (
    <div className="items-right  flex">
      <div className="mb-2 mt-5 h-9 w-9 bg-blue-400"></div>
      <div className="flex-col">
        <h1 className="mb-4 ml-11 mt-4 text-5xl font-bold"> Outside Food</h1>

        <p className="text-lg">
          1. Outside food are allowed with no corkage fee.
          <br />
          2. However, strong foul-smelling food is prohibited.
          <br />
        </p>
      </div>
    </div>
  );
}
