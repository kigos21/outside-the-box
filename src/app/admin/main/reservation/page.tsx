export default function Reservation() {
  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="basis basis-5/6 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        test
      </div>
      <div className="flex basis-1/6 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <div className="flex w-full flex-nowrap place-content-between">
          <h3 className="self-center text-5xl font-semibold">
            Reserve the Facility
          </h3>
          <button className="h-min self-center rounded-lg bg-otb-blue px-10 py-2 text-lg font-semibold shadow-lg shadow-black/25">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
