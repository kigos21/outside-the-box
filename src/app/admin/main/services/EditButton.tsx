//src/app/admin/main/services/EditButton.tsx
import React from 'react';
import Link from 'next/link';
import { IconComponentType } from './types';

interface ServiceData {
  id: string;
  name: string;
  hours: number;
  price: number;
  type: string;
}

interface EditButtonProps {
  IconComponent: IconComponentType;
  serviceData: ServiceData;
  color?: string;
}

const EditButton = ({
  IconComponent,
  serviceData,
  color = 'white',
}: EditButtonProps) => {
  const queryParams = new URLSearchParams(
    Object.entries(serviceData).reduce(
      (acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return (
    <Link href={`/admin/main/services/edit-service?${queryParams}`}>
      <button>
        <div
          className={`flex items-center justify-center rounded-lg bg-blue-700 p-2 text-white shadow-lg ${color}`}
        >
          <IconComponent className="h-5 w-5" />
        </div>
      </button>
    </Link>
  );
};

export default EditButton;
