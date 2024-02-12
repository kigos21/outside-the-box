export default function Home() {
  const testData = [
    {
      key: 1,
      fName: 'Melfred',
      lName: 'Fonclara',
      service: '5HRS',
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
    {
      key: 1,
      fName: 'Jinggoy',
      lName: 'Estrada',
      service: '5HRS',
      timeIn: '15:00',
      timeOut: '20:00',
      price: '250.00',
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-5">
      <div className="h-3/5 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">Recent Log Records</h3>
        <table className="w-full table-fixed text-center">
          <thead className="">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Service</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((data) => (
              <tr
                className="h-9 border border-solid border-black"
                key={data.key}
              >
                <td>{data.fName}</td>
                <td>{data.lName}</td>
                <td>{data.service}</td>
                <td>{data.timeIn}</td>
                <td>{data.timeOut}</td>
                <td>{data.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-2/5 rounded-lg bg-white px-5 py-7 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">
          Reservations for Confirmation
        </h3>
        <table className="w-full table-fixed text-center">
          <thead className="">
            <tr>
              <th>Reservation ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Service</th>
              <th>Time In</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((data) => (
              <tr
                className="h-9 border border-solid border-black"
                key={data.key}
              >
                <td>{data.fName}</td>
                <td>{data.lName}</td>
                <td>{data.service}</td>
                <td>{data.timeIn}</td>
                <td>{data.timeOut}</td>
                <td>{data.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
