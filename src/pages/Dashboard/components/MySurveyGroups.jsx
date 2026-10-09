import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import NoData from "../../../components/NoData";

const MySurveyGroups = () => {
  const navigate = useNavigate();
  const { surveyGroups } = useGlobalContext();

  return (
    <div className="w-full bg-white border border-[#E0E0E0] rounded-xl h-[360px] flex flex-col overflow-hidden hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between bg-gray-50/50">
        <div>
          <h1 className="text-[#0226BE] text-[16px] font-[600]">Survey Groups</h1>
          <p className="text-[11px] text-[#666] mt-0.5">Organize and cluster research targets</p>
        </div>
        <button
          className="text-[#0226BE] text-[13px] font-[500] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/survey-groups")}
        >
          See all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto containerScroll p-4 space-y-3">
        {surveyGroups.length === 0 ? (
          <NoData msg="No survey groups created" />
        ) : (
          surveyGroups.map((grp) => (
            <div
              key={grp._id}
              onClick={() => navigate(`/survey-groups/${grp.group_id || grp._id}`)}
              className="p-3.5 border border-[#E0E0E0] rounded-xl hover:border-[#0226BE]/30 hover:shadow-sm transition-all cursor-pointer group flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center flex-shrink-0 text-green-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-gray-900 font-semibold text-sm truncate group-hover:text-[#0226BE] transition-colors">
                    {grp.group_name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{grp.country}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md font-medium">
                      {grp.surveys_count} linked surveys
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {grp.group_id}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full border ${
                    grp.status === "Active"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      grp.status === "Active" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  {grp.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySurveyGroups;
