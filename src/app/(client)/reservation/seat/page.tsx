'use client';

import Link from 'next/link';
import { SeatReservationFormBody } from '@/types';

import styles from '@/styles/services.module.css';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface TimeOption {
  label: string;
  value: string;
}

interface ServiceOption {
  id: string;
  name: string;
}

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [modal, setModal] = useState(<div></div>);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SeatReservationFormBody>();

  const onSubmit: SubmitHandler<SeatReservationFormBody> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setModal(
      isAvailable ? (
        <>
          <div
            className={`w-full rounded-3xl bg-white py-16 text-center ${styles.blueShadow}`}
          >
            Schedule available!
          </div>

          <Link
            href={'/reservation/seat/payment'}
            className="mt-8 w-full cursor-pointer rounded-full bg-otb-blue px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Proceed
          </Link>

          <span
            onClick={() => setIsFormVisible(true)}
            className="mt-3 cursor-pointer text-sm underline"
          >
            Cancel
          </span>
        </>
      ) : (
        <>
          <div
            className={`w-full rounded-3xl bg-white py-16 text-center ${styles.blueShadow}`}
          >
            Schedule not available!
          </div>

          <span
            onClick={() => setIsFormVisible(true)}
            className="mt-8 w-full cursor-pointer rounded-full bg-otb-blue px-6 py-4 text-center font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
          >
            Try Again
          </span>
        </>
      ),
    );
  }, [isAvailable]);

  const checkAvailability = () => {
    // check if available
    // setAvailability()
    // render modal

    setIsFormVisible(false);
    setIsAvailable(true);
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-7xl items-center justify-center">
      <div className="mx-auto flex min-w-[464px] flex-col gap-8 rounded-3xl bg-otb-yellow p-16 pb-12 shadow-2xl">
        <h2 className="text-center">Pick a schedule</h2>

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
                        new Date(value) >= new Date()
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

                <TimeDropdown register={register} errors={errors} />
                <ServiceDropdown register={register} errors={errors} />
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              >
                Check Availability
              </button>

              <Link href="/services" className="mt-3 text-sm underline">
                Cancel
              </Link>
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
}

const TimeDropdown: React.FC<DropdownProps> = ({ register, errors }) => {
  const generateTimeOptions: () => TimeOption[] = () => {
    const options: TimeOption[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        const formattedTime =
          hour <= 12
            ? `${hour}:${minute.toString().padStart(2, '0')} ${hour === 12 ? 'PM' : 'AM'}`
            : `${hour - 12}:${minute.toString().padStart(2, '0')} PM`;
        options.push({ label: formattedTime, value: formattedTime });
      }
    }
    return options;
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
        {generateTimeOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
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
