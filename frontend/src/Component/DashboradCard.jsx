// DashboardCard.jsx
import React from "react";

export default function DashboardCard({ icon, title, value, borderColor = "border-yellow-500" }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${borderColor}`}>
      <div className={`flex items-center justify-center text-yellow-500 mb-2`}>
        {icon}
      </div>
      <h2 className="text-center text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-center text-gray-500 mt-2 text-sm">{value}</p>
    </div>
  );
}
