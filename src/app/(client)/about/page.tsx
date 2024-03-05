import React from 'react';

export default function About() {
  return (
    <main className="p-5 text-center sm:p-10 md:p-20 lg:p-20">
      <h1 className="bg-otb-yellow-100 mb-10 text-4xl font-bold sm:mb-20 sm:text-5xl md:text-6xl lg:text-7xl">
        About us!
      </h1>
      <p className="mx-auto max-w-2xl text-center font-sans text-lg sm:text-2xl">
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
      <div className="mt-10 text-left">
        <Rule />
      </div>
      <div className="mt-10 text-left">
        <Pantry />
      </div>
      <div className="mt-10 text-left">
        <Outside />
      </div>
    </main>
  );
}

function Rule() {
  return (
    <div className="mt-10 flex items-center">
      <div className="mr-4 h-4 w-4 bg-blue-400"></div>
      <div>
        <h1 className="text-xl font-bold sm:text-3xl">House Rules</h1>
        <p className="text-sm sm:text-lg">
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
    <div className="mt-5 flex items-center">
      <div className="mr-4 h-4 w-4 bg-blue-400"></div>
      <div>
        <h1 className="text-xl font-bold sm:text-3xl">Pantry Rules</h1>
        <p className="text-sm sm:text-lg">
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
    <div className="mt-5 flex items-center">
      <div className="mr-4 h-4 w-4 bg-blue-400"></div>
      <div>
        <h1 className="text-xl font-bold sm:text-3xl">Outside Food</h1>
        <p className="text-sm sm:text-lg">
          1. Outside food are allowed with no corkage fee.
          <br />
          2. However, strong foul-smelling food is prohibited.
          <br />
        </p>
      </div>
    </div>
  );
}
