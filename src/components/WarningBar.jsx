import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaArrowRight } from "react-icons/fa";

const WarningBar = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  if (user?.organizationName) return null;

  return (
    <div className="w-full bg-blue-50/70 border-l-4 border-[#0226BE] rounded-lg shadow-sm my-3">
      <div className="px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex-shrink-0">
            <FaExclamationCircle className="text-[#0226BE]" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-[#1a1a1a] text-[14px] font-[600] mb-0.5">
              Live Environment Demo
            </h3>
            <p className="text-[#555] text-[13px] font-[400]">
              You are experiencing Mirats Quanto DIY in interactive clone mode. All metrics, surveys, and feasibility calculations are live and responsive.
            </p>
          </div>
        </div>
        <button
          className="flex-shrink-0 bg-[#0226BE] text-white px-4 py-2 text-[13px] font-[500] rounded-md hover:bg-[#011c91] transition-colors flex items-center gap-2 whitespace-nowrap"
          onClick={() => navigate("/profile")}
        >
          View Workspace Settings
          <FaArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default WarningBar;
