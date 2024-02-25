export default function Reports() {
  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="basis-1/2 rounded-lg bg-white px-16 py-8 shadow-lg shadow-black/25">
        <div className=" flex">
          <input type="radio" value="Daily Report" className="align-middle" />
          <h3 className="ml-3 align-middle text-3xl font-semibold">
            Daily Report
          </h3>
        </div>
        <div className="my-20 flex gap-36">
          <h3 className="mr-2 text-3xl font-bold">Time of Day:</h3>
          <select id="time" name="ToD" className="w-80">
            <option value="00:00">12:00AM</option>
            <option value="01:00">1:00AM</option>
            <option value="02:00">2:00AM</option>
            <option value="03:00">3:00AM</option>
            <option value="04:00">4:00AM</option>
            <option value="05:00">5:00AM</option>
            <option value="06:00">6:00AM</option>
            <option value="07:00">7:00AM</option>
          </select>
        </div>
        <div className="my-20  flex gap-60">
          <h3 className="mr-4 text-3xl font-bold">Date:</h3>
          <select id="date" name="date" className="w-80">
            <option value="Today">22/02/24</option>
            <option value="Tomorrow">23/02/24</option>
            <option value="DayAfterTomorrow">24/02/24</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button className="mr-12 rounded-md bg-otb-blue px-12 py-4 text-xl font-bold">
            Generate
          </button>
        </div>
      </div>
      <div className="basis-1/2 rounded-lg bg-white px-16 py-8  shadow-lg shadow-black/25">
        <div className=" flex">
          <input type="radio" value="Daily Report" className="align-middle" />
          <h3 className="ml-3 align-middle text-3xl font-semibold">
            Custom Timeframe Report{' '}
          </h3>
        </div>
        <div className="my-20 flex gap-48">
          <h3 className="mr-2 text-3xl font-bold">Start Date</h3>
          <select id="startDate" name="startDate" className="w-80">
            <option value="Today">22/02/24</option>
            <option value="Tomorrow">23/02/24</option>
            <option value="DayAfterTomorrow">24/02/24</option>
          </select>
        </div>
        <div className="my-20  flex gap-52">
          <h3 className="mr-4 text-3xl font-bold">End Date</h3>
          <select id="endDate" name="endDate" className="w-80">
            <option value="Today">22/02/24</option>
            <option value="Tomorrow">23/02/24</option>
            <option value="DayAfterTomorrow">24/02/24</option>
            <option value="DayAfterTomorrow">25/02/24</option>
            <option value="DayAfterTomorrow">26/02/24</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button className="mr-12 rounded-md bg-otb-blue px-12 py-4 text-xl font-bold">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
