export default function Logs() {
  return (
    <div className="h-full rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
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
        <tbody></tbody>
      </table>
    </div>
  );
}
