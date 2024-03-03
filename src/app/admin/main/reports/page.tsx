export default function Reports() {
  return (
    <div className="flex h-[86vh] flex-col gap-5">
      <div className="flex h-[calc(86vh/2-10px)] flex-col overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Generate Reports</h3>
        <h3 className="mb-3 text-xl font-semibold">Create Daily Report</h3>
        <div className="flex flex-grow flex-col">
          <form className="flex flex-grow flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  Time of day
                </label>
                <select
                  name=""
                  id=""
                  className="basis-3/12 rounded-md border border-gray-400 bg-white px-6 py-4"
                >
                  <option value="" hidden>
                    AM / PM
                  </option>
                  <option value="">AM</option>
                  <option value="">PM</option>
                </select>
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
            </div>

            <button
              type="submit"
              className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
      <div className="flex h-[calc(86vh/2-10px)] flex-col overflow-y-scroll rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">
          Create Custom Timeframe Report
        </h3>
        <div className="flex flex-grow flex-col">
          <form className="flex flex-grow flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  Start date
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
                  End date
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
