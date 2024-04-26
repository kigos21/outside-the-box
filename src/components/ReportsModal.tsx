// src/components/ReportsModal.tsx
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  handleConfirm: (data: any) => void;
  handleCancel: () => void;
  userDate: any;
  customDate: any;
  dataToExport: any;
  refreshParent: () => void;
  reportType: 'daily' | 'custom';
  dayToday: string;
}

export default function ReportsModal({
  title,
  children,
  handleConfirm,
  handleCancel,
  userDate,
  customDate,
  refreshParent,
  reportType,
  dayToday,
}: ModalProps) {
  const handleCancelAndRefresh = () => {
    handleCancel();
    refreshParent();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCancelAndRefresh}
    >
      <div className="relative z-50 rounded-lg border-2 border-solid border-black bg-white p-8 text-center shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">
          {title} | Date: {dayToday}
        </h3>
        <div className="modal-content max-h-[80vh] overflow-y-auto">
          <div className="mt-4 flex justify-center">{children}</div>
        </div>
        {/* Conditionally render the "Confirm" buttons */}
        {reportType === 'daily' && (
          <button
            className="mr-2 mt-2 rounded-md bg-cs-blue px-4 py-2 text-white"
            onClick={() => handleConfirm(userDate)}
          >
            Confirm Daily Reports
          </button>
        )}
        {reportType === 'custom' && (
          <button
            className="mr-2 mt-2 rounded-md bg-cs-blue px-4 py-2 text-white"
            onClick={() => handleConfirm(customDate)}
          >
            Confirm Custom Reports
          </button>
        )}
        <button
          className="mt-2 rounded-md bg-gray-300 px-4 py-2"
          onClick={handleCancelAndRefresh}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
