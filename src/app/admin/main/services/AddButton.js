import React from 'react';

const AddButton = ({ IconComponent, color = 'white' }) => {
  return (
    <button>
      <div
        className={`flex items-center justify-center rounded-lg bg-sky-300 p-2 text-white shadow-lg ${color}`}
      >
        <IconComponent className="h-8 w-8" />
      </div>
    </button>
  );
};

export default AddButton;
