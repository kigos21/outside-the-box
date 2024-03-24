import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  handleConfirm: (data: any) => void;
  handleCancel: () => any;
  userDate: any;
  customDate: any;
  dataToExport: any;
}

export default function ReportsModal({
  title,
  children,
  handleConfirm,
  handleCancel,
  userDate,
  customDate,
  dataToExport,
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25"
      onClick={handleCancel}
    >
      <div className="rounded-lg border-2 border-solid border-black bg-white p-8 text-center shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">{title}</h3>
        <div className="mt-4 flex justify-center">{children}</div>
        <button
          className="mr-2 mt-2 rounded-md bg-otb-blue px-4 py-2 text-white"
          onClick={() => handleConfirm(userDate)}
        >
          Confirm Daily Reports
        </button>
        <button
          className="mr-2 mt-2 rounded-md bg-otb-blue px-4 py-2 text-white"
          onClick={() => handleConfirm(customDate)}
        >
          Confirm Custom Reports
        </button>
        <button
          className="mt-2 rounded-md bg-gray-300 px-4 py-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
