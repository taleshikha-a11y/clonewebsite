import React from "react";
import { Bar } from "react-chartjs-2";
import { useGlobalContext } from "../../../context/GlobalContext";
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

const PerformanceTrends = () => {
  const { performanceTrends } = useGlobalContext();

  const labels = performanceTrends?.labels || ["May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026"];
  const completesData = performanceTrends?.completes || [1840, 2450, 3120, 2890, 4150, 5920];
  const hitsData = performanceTrends?.hits || [3200, 4100, 5600, 5100, 7200, 9850];

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Completes",
        data: completesData,
        backgroundColor: "#0226BE",
        hoverBackgroundColor: "#011c91",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
      {
        label: "Hits",
        data: hitsData,
        backgroundColor: "#60A5FA",
        hoverBackgroundColor: "#3B82F6",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 12,
          boxHeight: 12,
          padding: 16,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: "500",
          },
          color: "#475467",
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#101828",
        bodyColor: "#475467",
        borderColor: "#EAECF0",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 11, family: "'Inter', sans-serif" },
          color: "#667085",
        },
      },
      y: {
        grid: { color: "#F2F4F7" },
        ticks: {
          font: { size: 11, family: "'Inter', sans-serif" },
          color: "#667085",
        },
      },
    },
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E0E0E0] gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Performance Trends</h3>
          <p className="text-xs text-gray-500 mt-0.5">Historical monthly survey completes vs total respondent hits</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-[#0226BE]">
            Last 6 Months
          </span>
        </div>
      </div>
      <div className="h-[280px] w-full pt-4">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default PerformanceTrends;
