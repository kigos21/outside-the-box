import React, { ReactNode } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="inline-block w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="max-h-96 overflow-y-auto">{children}</div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
