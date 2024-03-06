'use client';

import styles from '@/styles/carousel.module.css';
import { useState } from 'react';

import IndexIndicator from './IndexIndicator';

export default function Carousel() {
  const items = ['/about1.jpg', '/about2.jpg', '/about3.jpg'];
  const [index, setIndex] = useState(1);

  const handleLeftArrowClick = () => {
    setIndex((index) => index - 1);
  };

  const handleRightArrowClick = () => {
    setIndex((index) => index + 1);
  };

  return (
    <div className="flex flex-col gap-6 px-[7%]">
      <div className="relative mx-auto mt-16 flex max-w-screen-md items-center">
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
          className={`${styles.blue_shadow} aspect-video h-auto w-full overflow-hidden rounded-3xl object-cover`}
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

      <div className="mx-auto mt-8 flex max-w-screen-lg flex-col gap-4 text-center text-white">
        <h1 className="text-5xl text-otb-yellow lg:text-7xl">
          Work. Learn. Connect.
        </h1>
        <p className="text-2xl">
          Outside the Box, where creativity meets productivity.
        </p>
        <button className="mx-auto mt-8 w-fit rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
          Create an Account
        </button>
      </div>
    </div>
  );
}
