import React from 'react';
import Link from 'next/link';

const EditButton = ({ IconComponent, color = 'white', id }) => {
  return (
    <Link
      href={`/admin/main/services/edit-service?id=${encodeURIComponent(id)}`}
    >
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
