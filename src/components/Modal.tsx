export default function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div
        className={`absolute w-1/4 rounded-2xl bg-white px-12 py-10 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
