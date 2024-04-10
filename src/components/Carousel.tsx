'use client';

import styles from '@/styles/carousel.module.css';
import { useState } from 'react';

import IndexIndicator from './IndexIndicator';

export default function Carousel() {
  const items = ['/about1-new.png', '/about2-new.png', '/about3-new.png'];
  const [index, setIndex] = useState(1);

  const handleLeftArrowClick = () => {
    setIndex((index) => index - 1);
  };

  const handleRightArrowClick = () => {
    setIndex((index) => index + 1);
  };

  return (
    <div className="flex flex-col gap-6 px-[7%] pt-20">
      <div className="relative mx-auto mt-16 flex max-w-screen-sm items-center">
        {index !== 0 && (
          <svg
            focusable
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            onClick={handleLeftArrowClick}
            className="absolute left-4 h-10 w-10 cursor-pointer rounded-full bg-white/25 p-2 lg:-left-16 lg:h-12 lg:w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        )}
        <img
          src={items[index]}
          alt="carousel image"
          className={` aspect-video h-auto w-full overflow-hidden rounded-3xl object-cover`}
        />
        {index !== 2 && (
          <svg
            focusable
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            onClick={handleRightArrowClick}
            className="absolute right-4 h-10 w-10 cursor-pointer rounded-full bg-white/25 p-2 lg:-right-16 lg:h-12 lg:w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
      </div>

      <IndexIndicator index={index} />

      <div className="mx-auto mt-8 flex  max-w-screen-lg flex-col gap-2 text-center font-sans text-white">
        <h1 className="text-4xl font-bold lg:text-6xl">Feel The Presence in</h1>
        <h1 className="text-4xl  font-bold text-cs-orange lg:text-6xl">
          coursescape.
        </h1>

        <button className="mx-auto mt-8 w-fit rounded-full bg-cs-orange px-8 py-6 text-2xl font-bold shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
          Reserve Now
        </button>
      </div>
    </div>
  );
}
