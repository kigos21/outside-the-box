'use client';
import Link from 'next/link';
import { SeatReservationFormBody } from '@/types';

import styles from '@/styles/services.module.css';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface ServiceOption {
  id: string;
  name: string;
}

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [modal, setModal] = useState(<div></div>);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [data, setData] = useState<SeatReservationFormBody | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SeatReservationFormBody>();

  const onSubmit: SubmitHandler<SeatReservationFormBody> = async (data) => {
    const res = await fetch('/api/reservation/seat/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setData(data);
      setIsFormVisible(false);
      setIsAvailable(true);
    } else {
      const { message } = await res.json(); // if server side function fails
      console.log(message);

      setIsFormVisible(false);
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    setModal(
      isAvailable ? (
        <>
          <div className={`flex w-full justify-center rounded-3xl `}>
            <h2 className="  font-sans">Schedule available!</h2>
          </div>

          <button
            onClick={() => {
              const { date, time, service } = data!;
              router.push(
                `/reservation/seat/payment?date=${encodeURIComponent(
                  date,
                )}&time=${encodeURIComponent(time)}&service=${encodeURIComponent(
                  service,
                )}`,
              );
            }}
            className="mt-8 w-full cursor-pointer rounded-full bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Proceed
          </button>

          <a
            onClick={() => setIsFormVisible(true)}
            className="mt-8 w-full cursor-pointer rounded-full bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Cancel
          </a>
        </>
      ) : (
        <>
          <div className={`flex w-full justify-center rounded-3xl `}>
            <h2 className="font-sans"> Schedule not available!</h2>
          </div>

          <span
            onClick={() => setIsFormVisible(true)}
            className="mt-8 w-full cursor-pointer rounded-full bg-cs-orange px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Try Again
          </span>
        </>
      ),
    );
  }, [isAvailable]);

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center px-4 py-16">
      <div className="mx-auto flex max-w-[530px] grow flex-col gap-8 rounded-3xl border-4 border-cs-orange px-8 py-6 shadow-2xl sm:p-16 sm:pb-12">
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
              </div>

              <button
                type="submit"
                className="mt-8 w-auto  rounded-xl bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Check Availability
              </button>

              <a
                href="/services"
                className="mt-8 w-auto rounded-xl bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
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
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
    '12:00 AM',
  ];

  const weekendTimeOptions = [
    '12:00 AM',
    '1:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM',
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
          validate: { validEnum: (option: string) => option !== '' },
        })}
      >
        <option value="" hidden>
          Select a time
        </option>
        {getTimeOptions().map((option) => (
          <option key={option} value={option}>
            {option}
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
