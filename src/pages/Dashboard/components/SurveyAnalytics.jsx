import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SurveyAnalytics = () => {
  const [selectedRange, setSelectedRange] = useState("This Month");

  // Sample data points for daily distribution
  const days = Array.from({ length: 15 }, (_, i) => `${i + 1}th Oct`);
  const completesData = [45, 60, 52, 78, 90, 85, 110, 125, 105, 95, 140, 130, 155, 165, 180];
  const screenoutsData = [12, 18, 15, 22, 28, 20, 31, 35, 29, 25, 38, 30, 42, 40, 45];

  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Successful Completes",
        data: completesData,
        backgroundColor: "#0226BE",
        borderRadius: 4,
        stack: "stack1",
      },
      {
        label: "Terminates & Screenouts",
        data: screenoutsData,
        backgroundColor: "#E0E7FF",
        borderRadius: 4,
        stack: "stack1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#475467",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#101828",
        bodyColor: "#475467",
        borderColor: "#EAECF0",
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 10 } },
      },
      y: {
        stacked: true,
        grid: { color: "#F2F4F7" },
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E0E0E0] gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Survey Analytics</h3>
          <p className="text-xs text-gray-500 mt-0.5">Daily breakdown of participant throughput & quota health</p>
        </div>
        <div className="flex items-center gap-2">
          {["7 Days", "This Month", "Quarter"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedRange(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedRange === tab
                  ? "bg-[#0226BE] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[280px] w-full pt-4">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SurveyAnalytics;
