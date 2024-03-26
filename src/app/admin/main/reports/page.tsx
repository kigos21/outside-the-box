'use client';
import ReportsModal from '@/components/ReportsModal';
import { time } from 'console';
import { useEffect, useState } from 'react';
import React from 'react';

interface ObjectContainer {
  reports: {
    customer: { firstName: string; lastName: string };
    date: string;
    id: string;
    service: { serviceName: string; servicePrice: number };
    timeIn: string;
    timeOut: string;
  }[];
}

export default function Reports(e: any) {
  const [reports, setReports] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reportType, setReportType] = useState<'daily' | 'custom'>('daily');
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
  const [dataToExport, setDataToExport] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/admin/reports');
      const data = await response.json();

      if (data.success) {
        setReports(data.logs);
      } else {
        console.error('Error fetching logs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching logs:' + error);
    }
  };

  const objectContainer: ObjectContainer = {
    reports: [],
  };

  reports.forEach((report) => {
    objectContainer.reports.push({
      customer: { ...report.customer },
      date: report.date,
      id: report.id,
      service: { ...report.service },
      timeIn: report.timeIn,
      timeOut: report.timeOut,
    });
  });

  const styles = 'border border-solid border-black px-2 py-2';

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

  const userDate = objectContainer.reports.filter((item: any) => {
    const isAM = dailyFormData.timeOfDay === 'AM';
    const isPM = dailyFormData.timeOfDay === 'PM';
    let localTime = new Date(item.timeIn).toLocaleString('en-US', {
      timeZone: 'Asia/Singapore',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
    if (localTime) {
      const convertToLocal = localTime.split(' ')[0];
      const getHourTime = item.timeIn.slice(11, 13);
      const isWithinHours =
        (isAM && getHourTime >= '00' && getHourTime <= '11') ||
        (isPM && getHourTime >= '12' && getHourTime <= '23');
      return item.date === dailyFormData.date && isWithinHours;
    } else {
      console.log('hour is undefined. Cannot split further.');
    }
  });

  const customDate = reports
    ? reports.filter(
        (item) =>
          item.date >= customData.startDate && item.date <= customData.endDate,
      )
    : [];

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
    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Service Name',
      'Service Price',
      'Date',
      'Time In',
      'Time Out',
    ];
    const csvRows = data.map((obj: any) => {
      const rowData = [
        obj.id,
        obj.customer.firstName,
        obj.customer.lastName,
        obj.service.serviceName,
        obj.service.servicePrice,
        obj.date,
        new Date(obj.timeIn).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        new Date(obj.timeOut).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
      ];
      return rowData.join(',');
    });
    const headerRow = headers.join(',');
    return [headerRow, ...csvRows].join('\n');
  }

  const handleDailyReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedDataToUse = userDate;
    setDataToExport(updatedDataToUse);
    setReportType('daily');
    setShowModal(true);
  };

  const handleCustomReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedDataToUse = customDate;
    setDataToExport(updatedDataToUse);
    setReportType('custom');
    setShowModal(true);
  };

  return (
    <div className="flex h-[86vh] flex-col gap-5">
      {showModal && (
        <ReportsModal
          title={'Data to be exported:'}
          handleConfirm={confirmExport}
          handleCancel={() => setShowModal(false)}
          dataToExport={dataToExport}
          userDate={userDate} // Pass userDate prop
          customDate={customDate} // Pass customDate prop
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
              </tr>
            </thead>
            <tbody>
              {dataToExport.map((item) => (
                <tr key={item.id}>
                  <td className={styles}>{item.id}</td>
                  <td className={styles}>{item.customer.firstName}</td>
                  <td className={styles}>{item.customer.lastName}</td>
                  <td className={styles}>{item.service.serviceName}</td>
                  <td className={styles}>{item.service.servicePrice}</td>
                  <td className={styles}>{item.date}</td>
                  <td className={styles}>
                    {new Date(item.timeIn).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </td>
                  <td className={styles}>
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
            onSubmit={handleDailyReportSubmit}
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
            onSubmit={handleCustomReportSubmit}
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
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
