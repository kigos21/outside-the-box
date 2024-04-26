'use client';

import { useRouter } from 'next/navigation';
import ScrollToTop from 'react-scroll-to-top';
import { SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SeatReservationFormBody } from '@/types';

interface ServiceOption {
  id: string;
  name: string;
}

interface Seat {
  number: number;
  selected: boolean;
}

const initialSeats: Seat[] = [
  {
    number: 1,
    selected: false,
  },
  {
    number: 2,
    selected: false,
  },
  {
    number: 3,
    selected: false,
  },
  {
    number: 4,
    selected: false,
  },
  {
    number: 5,
    selected: false,
  },
  {
    number: 6,
    selected: false,
  },
  {
    number: 7,
    selected: false,
  },
  {
    number: 8,
    selected: false,
  },
  {
    number: 9,
    selected: false,
  },
  {
    number: 10,
    selected: false,
  },
  {
    number: 11,
    selected: false,
  },
  {
    number: 12,
    selected: false,
  },
];

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [modal, setModal] = useState(<div></div>);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [data, setData] = useState<SeatReservationFormBody | null>(null);
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [modalMessage, setModalMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SeatReservationFormBody>();

  const onSubmit: SubmitHandler<SeatReservationFormBody> = async (data) => {
    let selectedSeats: number[] = [];

    seats.forEach((seat) => {
      if (seat.selected) {
        selectedSeats.push(seat.number);
      }
    });

    if (selectedSeats.length === 0) {
      alert('Please select atleast 1 seat.');
      return;
    }

    console.log(JSON.stringify({ ...data, selectedSeats }));

    const res = await fetch('/api/reservation/seat/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, selectedSeats }),
    });

    const { message } = await res.json();

    if (res.ok) {
      setData(data);
      setIsFormVisible(false);
      setIsAvailable(true);
    } else {
      setModalMessage(message);
      setIsFormVisible(false);
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    setModal(
      isAvailable ? (
        <>
          <div className={`flex w-full justify-center rounded-3xl `}>
            <h2 className="font-sans">Schedule available!</h2>
          </div>

          <button
            onClick={() => {
              const { date, time, service } = data!;
              let selectedSeats: number[] = [];

              seats.forEach((seat) => {
                if (seat.selected) {
                  selectedSeats.push(seat.number);
                }
              });

              router.push(
                `/reservation/seat/payment?date=${encodeURIComponent(
                  date,
                )}&time=${encodeURIComponent(time)}&service=${encodeURIComponent(
                  service,
                )}&seats=${encodeURIComponent(JSON.stringify(selectedSeats))}`,
              );
            }}
            className="from-cs-yellow to-cs-orange mt-8 w-full cursor-pointer rounded-full bg-gradient-to-br px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Proceed
          </button>

          <button
            onClick={() => setIsFormVisible(true)}
            className="from-cs-yellow to-cs-orange mt-8 w-full cursor-pointer rounded-full bg-gradient-to-br px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className={`flex w-full justify-center rounded-3xl `}>
            <h2 className="font-sans"> Schedule not available!</h2>
          </div>

          <span
            onClick={() => setIsFormVisible(true)}
            className="bg-cs-orange mt-8 w-full cursor-pointer rounded-full px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Try Again
          </span>
        </>
      ),
    );
  }, [isAvailable]);

  const handleCheckboxChange = (index: number) => {
    const updatedSeats = [...seats];
    const changedItem = updatedSeats[index];
    updatedSeats[index] = { ...changedItem, selected: !changedItem.selected };
    setSeats(updatedSeats);
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center px-4 py-16">
      <ScrollToTop smooth color="#0d49a6" width="40" />
      <div className="mx-auto flex max-w-[730px] grow flex-col gap-8 rounded-3xl border-4 border-cs-orange px-8 py-6 shadow-2xl sm:p-16 sm:pb-12">
        <h2 className="text-center font-sans font-bold text-cs-orange">
          Pick a schedule
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          {/* RESERVATION REQUEST FORM */}
          {isFormVisible ? (
            <>
              <div className="flex w-full flex-col gap-3 text-gray-400">
                <input
                  type="date"
                  id="date"
                  className="rounded-full border border-gray-300 px-6 py-4"
                  {...register('date', {
                    required: true,
                    validate: {
                      futureDate: (value) =>
                        new Date(value).setHours(0, 0, 0, 0) >=
                        new Date().setHours(0, 0, 0, 0)
                          ? true
                          : 'Date must be today or in the future.',
                    },
                  })}
                />
                {errors.date?.type === 'required' && (
                  <p
                    role="alert"
                    className="mt-[-0.75rem] px-6 text-xs text-red-500"
                  >
                    This field is required.
                  </p>
                )}
                {errors.date?.type === 'futureDate' && (
                  <p
                    role="alert"
                    className="mt-[-0.75rem] px-6 text-xs text-red-500"
                  >
                    {errors.date.message}
                  </p>
                )}

                <TimeDropdown
                  register={register}
                  errors={errors}
                  date={watch('date')}
                />

                <ServiceDropdown register={register} errors={errors} />

                <img
                  src="/seat_visualizer.png"
                  alt="top view of coursescape area"
                  className=""
                />

                <SeatCheckboxes
                  seats={seats}
                  handleCheckboxChange={handleCheckboxChange}
                />

                {modalMessage && (
                  <div className="mx-8 mt-4 text-sm text-red-500">
                    {modalMessage}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="from-cs-yellow to-cs-orange  mt-8 w-auto rounded-xl bg-gradient-to-br px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Check Availability
              </button>

              <a
                href="/services"
                className="from-cs-yellow to-cs-orange mt-8 w-auto rounded-xl bg-gradient-to-br px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Cancel
              </a>
            </>
          ) : (
            modal
          )}
        </form>
      </div>
    </div>
  );
}

interface DropdownProps {
  register: any;
  errors: any;
  date?: any;
}

const TimeDropdown: React.FC<DropdownProps> = ({ register, errors, date }) => {
  const weekdayTimeOptions = [
    { value: '0:00', name: '12:00 AM' },
    { value: '1:00', name: '1:00 AM' },
    { value: '2:00', name: '2:00 AM' },
    { value: '3:00', name: '3:00 AM' },
    { value: '4:00', name: '4:00 AM' },
    { value: '5:00', name: '5:00 AM' },
    { value: '10:00', name: '10:00 AM' },
    { value: '11:00', name: '11:00 AM' },
    { value: '12:00', name: '12:00 PM' },
    { value: '13:00', name: '1:00 PM' },
    { value: '14:00', name: '2:00 PM' },
    { value: '15:00', name: '3:00 PM' },
    { value: '16:00', name: '4:00 PM' },
    { value: '17:00', name: '5:00 PM' },
    { value: '18:00', name: '6:00 PM' },
    { value: '19:00', name: '7:00 PM' },
    { value: '20:00', name: '8:00 PM' },
    { value: '21:00', name: '9:00 PM' },
    { value: '22:00', name: '10:00 PM' },
    { value: '23:00', name: '11:00 PM' },
  ];

  const weekendTimeOptions = [
    { value: '0:00', name: '12:00 AM' },
    { value: '1:00', name: '1:00 AM' },
    { value: '12:00', name: '12:00 PM' },
    { value: '13:00', name: '1:00 PM' },
    { value: '14:00', name: '2:00 PM' },
    { value: '15:00', name: '3:00 PM' },
    { value: '16:00', name: '4:00 PM' },
    { value: '17:00', name: '5:00 PM' },
    { value: '18:00', name: '6:00 PM' },
    { value: '19:00', name: '7:00 PM' },
    { value: '20:00', name: '8:00 PM' },
    { value: '21:00', name: '9:00 PM' },
    { value: '22:00', name: '10:00 PM' },
    { value: '23:00', name: '11:00 PM' },
  ];

  const getTimeOptions = () => {
    // if date is weekend, return weekendTimeOptions, else return weekdayTimeOptions
    if (!date) {
      return [];
    }

    const isWeekend =
      new Date(date).getDay() === 0 || new Date(date).getDay() === 6;
    return isWeekend ? weekendTimeOptions : weekdayTimeOptions;
  };

  return (
    <>
      <select
        id="time"
        className="rounded-full border border-gray-300 px-6 py-4"
        {...register('time', {
          required: true,
          validate: {
            validEnum: (option: string) => option !== '',
            futureTime: (value: string) => {
              const today = new Date();
              const targetDateTime = new Date(date);
              let [hours, minutes] = value.split(':');
              targetDateTime.setHours(Number(hours), Number(minutes), 0, 0);

              return targetDateTime >= today
                ? true
                : 'Date and time must be today or in the future.';
            },
          },
        })}
      >
        <option value="" hidden>
          Select a time
        </option>
        {getTimeOptions().map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {errors.time?.type === 'required' && (
        <p role="alert" className="mt-[-0.75rem] px-6 text-xs text-red-500">
          This field is required.
        </p>
      )}
      {errors.time?.type === 'validEnum' && (
        <p role="alert" className="mt-[-0.75rem] px-6 text-xs text-red-500">
          Please select a time.
        </p>
      )}
      {errors.time?.type === 'futureTime' && (
        <p role="alert" className="mt-[-0.75rem] px-6 text-xs text-red-500">
          {errors.time.message}
        </p>
      )}
    </>
  );
};

const ServiceDropdown: React.FC<DropdownProps> = ({ register, errors }) => {
  const [services, setServices] = useState<ServiceOption[]>([]);

  const fetchServices = async () => {
    const response = await fetch('/api/services');
    if (!response.ok) {
      const { message } = await response.json();
      console.error(message);
    } else {
      const { services } = await response.json();
      setServices(
        services.map((service: any) => ({
          id: service.id,
          name: service.name,
        })),
      );
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <select
        id="service"
        className="rounded-full border border-gray-300 px-6 py-4"
        {...register('service', {
          required: true,
          validate: { validEnum: (option: string) => option !== '' },
        })}
      >
        <option value="" hidden>
          Select a service
        </option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
      {errors.service?.type === 'required' && (
        <p role="alert" className="mt-[-0.75rem] px-6 text-xs text-red-500">
          This field is required.
        </p>
      )}
      {errors.service?.type === 'validEnum' && (
        <p role="alert" className="mt-[-0.75rem] px-6 text-xs text-red-500">
          Please select a service.
        </p>
      )}
    </>
  );
};

interface SeatCheckboxesProps {
  seats: Seat[];
  handleCheckboxChange: any;
}

const SeatCheckboxes = ({
  seats,
  handleCheckboxChange,
}: SeatCheckboxesProps) => {
  return (
    <>
      <p className="text-base">Select atleast 1 seat.</p>
      <div className="flex h-[100px] flex-col flex-wrap">
        {seats.map((seat, i) => (
          <div key={seat.number} className="flex items-center gap-1">
            <input
              type="checkbox"
              id={`Seat ${seat.number}`}
              checked={seat.selected}
              onChange={() => handleCheckboxChange(i)}
            />
            <label htmlFor={`Seat ${seat.number}`}>Seat {seat.number}</label>
          </div>
        ))}
      </div>
    </>
  );
};
