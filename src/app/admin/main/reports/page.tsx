// Reports.js
'use client';
import ReportsModal from '@/components/ReportsModal';
import { time } from 'console';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Reports(e: any) {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/admin/reports'); //API
      const data = await response.json();

      if (data.success) {
        setReports(data.reports); //set reports to state value
      } else {
        console.error('Error fetching logs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching logs:' + error);
    }
  };

  const dummyData = [
    {
      id: '1234556789',
      firstName: 'Noel',
      lastName: 'Cansino',
      customerID: 1,
      service: 'Study Buddy',
      serviceID: 2,
      date: '23/03/2024',
      timeIn: '2024-03-24T03:00:00.000Z',
      timeOut: '2024-03-25T06:00:00.000Z',
    },
    {
      id: '246813579',
      firstName: 'Karl',
      lastName: 'Tacula',
      customerID: 2,
      service: 'Study Buddy',
      serviceID: 2,
      date: '23/03/2024',
      timeIn: '2024-03-23T10:00:00.000Z',
      timeOut: '2024-03-23T13:00:00.000Z',
    },
    {
      id: '987654321',
      firstName: 'Minette',
      lastName: 'Chavez',
      customerID: 3,
      service: 'Solo Molo',
      serviceID: 1,
      date: '25/03/2024',
      timeIn: '2024-03-23T02:00:00.000Z',
      timeOut: '2024-03-23T05:00:00.000Z',
    },
    {
      id: '789456123',
      firstName: 'John Daniel',
      lastName: 'De Castro',
      customerID: 4,
      service: 'Deep Sleep',
      serviceID: 4,
      date: '27/03/2024',
      timeIn: '2024-03-23T14:00:00.000Z',
      timeOut: '2024-03-23T21:00:00.000Z',
    },
  ];
  const styles = 'border border-solid border-black px-2 py-2';
  const [dailyFormData, setDailyFormData] = useState({
    timeOfDay: '',
    date: '',
    startHour: '00:00',
    endHour: '23:59',
  });
  const [customData, setCustomData] = useState({
    startDate: '',
    endDate: '',
  });

  const handleStartDate = (e: any) => {
    const date = e.target.value;
    const newFormat = date.split('-').reverse().join('/');
    setCustomData({ ...customData, startDate: newFormat });
  };

  const handleEndDate = (e: any) => {
    const date = e.target.value;
    const newFormat = date.split('-').reverse().join('/');
    setCustomData({ ...customData, endDate: newFormat });
  };

  const userDate = reports
    ? reports.filter((item) => {
        const isAM = dailyFormData.timeOfDay === 'AM';
        const isPM = dailyFormData.timeOfDay === 'PM';

        let localTime = new Date(item.timeIn).toLocaleString('en-US', {
          timeZone: 'Asia/Singapore', // Adjust timezone to GMT+8 (Asia/Singapore)
          hour12: true, // Use 12-hour format
          hour: 'numeric', // Display hour
          minute: 'numeric', // Display minute
        });

        //const hour = item.timeIn.split('T')[1];
        if (localTime) {
          const convertToLocal = localTime.split(' ')[0];
          let hour = convertToLocal.split(':')[0];
          if (hour.length != 2) {
            hour = '0' + hour;
          }
          console.log('In ISO format:', item.timeIn);
          console.log('In local time  & 12 hour format:', localTime);
          console.log('24 Hour format:', convertToLocal); // Log convertToLocal if hour is
          console.log('Get hour:', hour);
          const isWithinHours =
            (isAM && hour >= '00' && hour <= '11') ||
            (isPM && hour >= '12' && hour <= '23');
          return item.date === dailyFormData.date && isWithinHours;
        } else {
          console.log('hour is undefined. Cannot split further.');
        }
      })
    : [];

  const customDate = reports
    ? reports.filter(
        (item) =>
          item.date >= customData.startDate && item.date <= customData.endDate,
      )
    : [];
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState<'daily' | 'custom'>('daily');
  const dataToUse = reportType === 'daily' ? userDate : customDate;

  const handleDailyReport = () => {
    if (userDate.length === 0) {
      console.log('No date selected');
      return;
    } else {
      console.log(userDate);
    }
    setReportType('daily');
    setShowModal(false);
  };

  const handleCustomReport = () => {
    if (customDate.length === 0) {
      console.log('No date selected');
      return;
    } else {
      console.log(userDate);
    }

    setReportType('custom');
    setShowModal(false);
  };

  const handleTimeOfDayChange = (e: any) => {
    const selectedTimeOfDay = e.target.value;
    let startHour = '00:00';
    let endHour = '23:59';

    if (selectedTimeOfDay === 'AM') {
      startHour = '00:00';
      endHour = '11:59';
    } else if (selectedTimeOfDay === 'PM') {
      startHour = '12:00';
      endHour = '23:59';
    }
    setDailyFormData({
      ...dailyFormData,
      timeOfDay: selectedTimeOfDay,
      startHour,
      endHour,
    });
  };

  const handleDateChange = (e: any) => {
    const date = e.target.value;
    const newFormat = date.split('-').reverse().join('/');
    setDailyFormData({ ...dailyFormData, date: newFormat });
  };

  function confirmExport(data: any) {
    const csvContent = coverToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OTBREPORTS.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function coverToCSV(data: any) {
    const headers = Object.keys(data[0]);
    const rows = data.map((obj: any) => headers.map((header) => obj[header]));
    const headerRow = headers.join(',');
    const csvRows = [headerRow, ...rows.map((row: any) => row.join(','))];
    return csvRows.join('\n');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(dailyFormData);
    console.log(userDate);
    console.log(customData);
    console.log(customDate);
    // Additional logic for form submission if needed
    setShowModal(true);
  };

  const refreshParent = (e: any) => {
    e.window.reload();
  };

  return (
    <div className="flex h-[86vh] flex-col gap-5">
      {showModal && (
        <ReportsModal
          title={'Data to be exported:'}
          handleConfirm={confirmExport}
          handleCancel={() => setShowModal(false)}
          dataToExport={dataToUse}
          userDate={userDate}
          customDate={customDate}
          refreshParent={() => ''}
        >
          <table className="w-full border-collapse border-2 border-solid border-black">
            <thead>
              <tr>
                <th className={styles}>ID</th>
                <th className={styles}>First Name</th>
                <th className={styles}>Last Name</th>
                <th className={styles}>Service</th>
                <th className={styles}>Price</th>
                <th className={styles}>Date</th>
                <th className={styles}>Time In</th>
                <th className={styles}>Time Out</th>

                {/* Add more headers based on your data */}
              </tr>
            </thead>
            <tbody>
              {/* Loop through the data and render rows */}
              {dataToUse.map((item: any) => (
                <tr key={item.id}>
                  <td className={styles}>{item.customer.customerID}</td>
                  <td className={styles}>{item.firstName}</td>
                  <td className={styles}>{item.lastName}</td>
                  <td className={styles}>{item.service}</td>
                  <td className={styles}>{item.price}</td>
                  <td className={styles}>{item.date}</td>
                  <td className={styles}>
                    {' '}
                    {new Date(item.timeIn).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </td>
                  <td className={styles}>
                    {' '}
                    {new Date(item.timeOut).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReportsModal>
      )}

      <div className="flex h-[calc(86vh/2-10px)] flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 text-3xl font-bold">Generate Reports</h3>
        <h3 className="mb-3 text-xl font-semibold">Create Daily Report</h3>
        <div className="flex flex-grow flex-col">
          <form
            className="flex flex-grow flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  Time of day
                </label>
                <select
                  name="timeOfDay"
                  id="timeOfDay"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 bg-white px-6 py-4"
                  onChange={handleTimeOfDayChange}
                >
                  <option value="" hidden>
                    AM / PM
                  </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              onClick={handleDailyReport}
            >
              Generate
            </button>
          </form>
        </div>
      </div>
      <div className="flex h-[calc(86vh/2-10px)] flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="mb-3 text-xl font-semibold">
          Create Custom Timeframe Report
        </h3>
        <div className="flex flex-grow flex-col">
          <form
            className="flex flex-grow flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  Start date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  onChange={handleStartDate}
                />
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="" className="basis-2/12">
                  End date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  className="basis-3/12 rounded-md border border-gray-400 px-6 py-4"
                  onChange={handleEndDate}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-fit self-end rounded-md bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
              onClick={handleCustomReport}
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
