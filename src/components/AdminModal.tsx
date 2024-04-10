interface ModalProps {
  title: string;
  children: React.ReactNode;
  handleConfirm: () => void;
  handleCancel: () => void;
  danger?: boolean;
}

export default function AdminModal({
  title,
  children,
  handleConfirm,
  handleCancel,
  danger,
}: ModalProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/75"
      onClick={handleCancel}
    >
      <div
        className="mb-12 flex w-[28rem] flex-col gap-8 rounded-lg bg-white px-8 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xl font-bold">{title}</p>

        <div className="text-sm text-gray-500">
          <p className="mb-2 text-base">Details:</p>
          {children}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="basis-1/2 rounded-md bg-gray-100 px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-gray-200 hover:shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`basis-1/2 rounded-md px-6 py-4 text-white font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none ${danger ? 'bg-red-500' : 'bg-cs-blue'}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
