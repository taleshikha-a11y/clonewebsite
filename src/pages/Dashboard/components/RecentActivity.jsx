import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";

const RecentActivity = () => {
  const navigate = useNavigate();
  const { recentActivities } = useGlobalContext();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
      case "Paid":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleItemClick = (activity) => {
    if (activity.type === "info" || activity.title.toLowerCase().includes("invoice")) {
      navigate("/invoice-billing");
    } else {
      navigate("/surveys");
    }
  };

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden h-[420px] flex flex-col hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-5 py-4 border-b border-[#E0E0E0] bg-gray-50/50 flex items-center justify-between">
        <div>
          <h3 className="text-[#0226BE] text-[15px] font-[600]">
            Recent Activity
          </h3>
          <p className="text-[11px] text-[#666] mt-0.5">
            Latest updates and real-time events
          </p>
        </div>
        <button
          onClick={() => navigate("/surveys")}
          className="text-xs text-[#0226BE] hover:underline font-medium"
        >
          View all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-[#E0E0E0] containerScroll">
        {recentActivities?.map((activity, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-50/80 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
            onClick={() => handleItemClick(activity)}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0226BE] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                {activity.type === "complete" ? (
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : activity.type === "survey_created" ? (
                  <svg className="w-4 h-4 text-[#0226BE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-[#0226BE] transition-colors">
                  {activity.title}
                </p>
                <p className="text-[11px] text-gray-500 truncate">{activity.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusBadge(activity.status)}`}>
                {activity.status}
              </span>
              <span className="text-[10px] text-gray-400 mt-1">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
