// src/app/admin/main/reports/page.tsx
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
      const response = await fetch('/api/admin/reports', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const { logs } = await response.json();
        setReports(logs);
        console.log('Reports', logs);
      } else {
        const message = await response.text();
        console.error('Error fetching logs:', message);
        alert(message);
      }
    } catch (error) {
      console.error('Error fetching logs:' + error);
    }
  };

  const objectContainer: ObjectContainer = {
    reports: [],
  };
  reports.forEach((report) => {
    const date = new Date(report.timeIn).toLocaleDateString('en-SG');
    objectContainer.reports.push({
      customer: { ...report.customer },
      date,
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
    } else if (selectedTimeOfDay === 'Whole Day') {
      startHour = '00:00';
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
    const isWholeDay = dailyFormData.timeOfDay === 'Whole Day';

    let localTime = new Date(item.timeIn).toLocaleString('en-SG', {
      timeZone: 'Asia/Singapore',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });

    if (localTime) {
      const getHourTime = localTime.slice(0, 2);
      const isWithinHours =
        (isAM && getHourTime >= '00' && getHourTime <= '11') ||
        (isPM && getHourTime >= '12' && getHourTime <= '23') ||
        isWholeDay;
      return item.date === dailyFormData.date && isWithinHours;
    } else {
      console.log('hour is undefined. Cannot split further.');
    }
  });

  const startingDateString = customData.startDate;
  const endingDateString = customData.endDate;
  const startingDateParts = startingDateString.split('/');
  const endingDateParts = endingDateString.split('/');
  const customDate = objectContainer.reports
    ? objectContainer.reports.filter((item) => {
        const itemDateParts = item.date.split('/');
        const itemDay = parseInt(itemDateParts[0]);
        const itemMonth = parseInt(itemDateParts[1]);
        const itemYear = parseInt(itemDateParts[2]);

        const startDateDay = parseInt(startingDateParts[0]);
        const startDateMonth = parseInt(startingDateParts[1]);
        const startDateYear = parseInt(startingDateParts[2]);

        const endDateDay = parseInt(endingDateParts[0]);
        const endDateMonth = parseInt(endingDateParts[1]);
        const endDateYear = parseInt(endingDateParts[2]);

        if (
          itemYear > startDateYear ||
          (itemYear === startDateYear && itemMonth > startDateMonth) ||
          (itemYear === startDateYear &&
            itemMonth === startDateMonth &&
            itemDay >= startDateDay)
        ) {
          return (
            itemYear < endDateYear ||
            (itemYear === endDateYear && itemMonth < endDateMonth) ||
            (itemYear === endDateYear &&
              itemMonth === endDateMonth &&
              itemDay <= endDateDay)
          );
        }
        return false;
      })
    : [];

  function confirmExport(data: any, p0?: string) {
    const csvContent = coverToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const dateToday = new Date().toISOString().split('T')[0];
    let filename = '';
    if (reportType === 'daily') {
      const timeOfDay = dailyFormData.timeOfDay.toUpperCase();
      filename = `COURSESCAPE-REPORTS-${timeOfDay}-${dateToday}.csv`;
    } else if (reportType === 'custom') {
      filename = `COURSESCAPE-REPORTS-CUSTOM-${customData.startDate}-${customData.endDate}.csv`;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
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
        obj.service.name,
        obj.service.price,
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
    const totalSales = data.reduce(
      (total: any, item: any) => total + item.service.price,
      0,
    );
    const totalSalesRow = ['', '', '', '', `Total Sales: ${totalSales} PHP`];
    return [headerRow, ...csvRows, totalSalesRow].join('\n');
  }

  const handleDailyReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDate.length === 0) {
      alert('No reports found for the selected criteria. Date must not be in the future');
      return;
    }

    const updatedDataToUse = userDate;
    setDataToExport(updatedDataToUse);
    setReportType('daily');
    setShowModal(true);
  };

  const handleCustomReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (customDate.length === 0) {
      alert(
        'No reports found for the selected criteria. Use a valid date, start date cannot be later than end date',
      );
    } else {
      const updatedDataToUse = customDate;
      setDataToExport(updatedDataToUse);
      setReportType('custom');
      setShowModal(true);
    }
  };
  const ToD = new Date().toLocaleDateString('en-SG', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <div className="flex h-[86vh] flex-col gap-5">
      {showModal && (
        <ReportsModal
          title={'Coursescape Reports'}
          handleConfirm={confirmExport}
          handleCancel={() => setShowModal(false)}
          dataToExport={dataToExport}
          userDate={userDate}
          customDate={customDate}
          refreshParent={() => ''}
          reportType={reportType} // Pass the reportType prop
          dayToday={ToD}
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
                  <td className={styles}>{item.service.name}</td>
                  <td className={styles}>{item.service.price}</td>
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
              <tr>
                <td className={styles} colSpan={2}>
                  Total Sales
                </td>
                <td className={styles} colSpan={6}>
                  {dataToExport.reduce(
                    (total, item) => total + item.service.price,
                    0,
                  )}{' '}
                  PHP
                </td>
              </tr>
            </tbody>
          </table>
        </ReportsModal>
      )}

      <div className="flex h-[calc(86vh/2-10px)] flex-col rounded-lg bg-white px-8 py-6 shadow-lg shadow-black/25">
        <h3 className="absolute top-10 z-10 text-3xl font-bold">
          Generate Reports
        </h3>
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
                    AM / PM / Whole Day
                  </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                  <option value="Whole Day">Whole Day</option>
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
