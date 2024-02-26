import React from 'react';
import Link from 'next/link';

const AddButton = ({ IconComponent, color = 'white' }) => {
  return (
    <Link href="/admin/main/services/addservices">
      {' '}
      <a>
        <button>
          <div
            className={`flex items-center justify-center rounded-lg bg-sky-300 p-2 text-white shadow-lg ${color}`}
          >
            <IconComponent className="h-8 w-8" />
          </div>
        </button>
      </a>
    </Link>
  );
};

export default AddButton;
