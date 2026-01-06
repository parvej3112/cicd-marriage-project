import React, { useEffect, useState } from "react";
import { GiArchiveRegister, GiCalendar, GiClockwiseRotation, GiStopwatch } from "react-icons/gi";
import Sidebar from "./sidebar";
import DashboardCard from "./DashboradCard";
import { getAllCertificates } from "../api/adminApi";

function Admin() {
  const [certificates, setCertificates] = useState([]);
  const [dailyAvgThisMonth, setDailyAvgThisMonth] = useState(0);
  const [monthlyAvgAllTime, setMonthlyAvgAllTime] = useState(0);
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [latestCertDate, setLatestCertDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCertificates();
        setCertificates(response);
        calculateMetrics(response);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchData();
  }, []);

  const calculateMetrics = (data) => {
    if (data.length === 0) {
      setThisMonthCount(0);
      setDailyAvgThisMonth(0);
      setMonthlyAvgAllTime(0);
      setLatestCertDate(null);
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Total certificates
    const totalCertificates = data.length;

    // Certificates this month
    const thisMonthCerts = data.filter((cert) => {
      const certDate = new Date(cert.marriageDate || cert.date);
      return certDate.getMonth() === currentMonth && certDate.getFullYear() === currentYear;
    });
    setThisMonthCount(thisMonthCerts.length);

    // Average certificates per day this month (only counting days passed)
    const daysPassedInMonth = currentDate.getDate();
    setDailyAvgThisMonth(thisMonthCerts.length / daysPassedInMonth);

    // Average certificates per month all time
    const firstCertDate = new Date(Math.min(...data.map(cert => new Date(cert.marriageDate || cert.date))));
    const monthsPassed = 
      (currentYear - firstCertDate.getFullYear()) * 12 +
      (currentMonth - firstCertDate.getMonth()) + 1;

    setMonthlyAvgAllTime(totalCertificates / monthsPassed);

    // Latest certificate date
    const latestDate = new Date(Math.max(...data.map(cert => new Date(cert.marriageDate || cert.date))));
    setLatestCertDate(latestDate);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            icon={<GiArchiveRegister size={30} />}
            title="Total Certificates"
            value={certificates.length}
            borderColor="border-blue-500"
          />

          <DashboardCard
            icon={<GiCalendar size={30} />}
            title="Issued This Month"
            value={thisMonthCount}
            borderColor="border-green-500"
          />

          <DashboardCard
            icon={<GiStopwatch size={30} />}
            title="Avg Per Day This Month"
            value={dailyAvgThisMonth.toFixed(2)}
            borderColor="border-yellow-500"
          />

          <DashboardCard
            icon={<GiClockwiseRotation size={30} />}
            title="Avg Per Month (All Time)"
            value={monthlyAvgAllTime.toFixed(2)}
            borderColor="border-purple-500"
          />

          {latestCertDate && (
            <DashboardCard
              icon={<GiCalendar size={30} />}
              title="Latest Certificate Date"
              value={latestCertDate.toLocaleDateString()}
              borderColor="border-red-500"
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;
