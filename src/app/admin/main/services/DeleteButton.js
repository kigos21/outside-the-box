import React from 'react';

const DeleteButton = ({ IconComponent, color = 'white', onDelete }) => {
  return (
    <button onClick={onDelete}>
      <div
        className={`flex items-center justify-center rounded-lg bg-red-500 p-2 text-white shadow-lg ${color}`}
      >
        <IconComponent className="h-5 w-5" />
      </div>
    </button>
  );
};

export default DeleteButton;
