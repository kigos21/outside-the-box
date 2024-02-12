export default function Reservation() {
  return (
    <div className="flex flex-col h-full space-y-5">
      <div className="basis-5/6 basis bg-white rounded-lg px-5 py-7 shadow-lg shadow-black/25">
        test
      </div>
      <div className="flex basis-1/6 bg-white rounded-lg px-5 py-7 shadow-lg shadow-black/25">
        <div className="flex flex-nowrap place-content-between w-full">
          <h3 className="text-5xl font-semibold self-center">Reserve the Facility</h3>
          <button className="rounded-lg bg-otb-blue shadow-lg shadow-black/25 px-10 py-2 h-min text-lg font-semibold self-center">Proceed</button>
        </div>
      </div>
    </div>
  )
}
