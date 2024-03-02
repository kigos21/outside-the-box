export default function FacilityReservation() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">
          Book Reservations
        </h3>

        <h3 className="mb-3 text-xl font-semibold">
          Reservations for Confirmation
        </h3>

        <form className="flex flex-grow flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                First name
              </label>
              <input
                type="text"
                name=""
                id=""
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Last name
              </label>
              <input
                type="text"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Date
              </label>
              <input
                type="date"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Time from
              </label>
              <input
                type="time"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Time to
              </label>
              <input
                type="time"
                name=""
                id=""
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="" className="basis-2/12">
                Price
              </label>
              <input
                type="number"
                name=""
                id=""
                required
                className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
              />
            </div>
          </div>

          <button className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none">
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
}
