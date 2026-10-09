import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import NoData from "../../../components/NoData";

const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  const getColor = () => {
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-[#666] whitespace-nowrap">
        {current}/{total}
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status?.toLowerCase()) {
      case "live":
        return "bg-green-100 text-green-700 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusStyle()}`}
    >
      {status || "Draft"}
    </span>
  );
};

const MySurveys = () => {
  const navigate = useNavigate();
  const { surveys } = useGlobalContext();

  return (
    <div className="w-full bg-white border border-[#E0E0E0] rounded-xl h-[420px] flex flex-col overflow-hidden hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between bg-gray-50/50">
        <div>
          <h1 className="text-[#0226BE] text-[16px] font-[600]">My Surveys</h1>
          <p className="text-[11px] text-[#666] mt-0.5">
            Real-time survey metrics & quota progress
          </p>
        </div>
        <button
          className="text-[#0226BE] text-[13px] font-[500] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/surveys")}
        >
          See all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto containerScroll">
        <table className="w-full text-left">
          <thead className="bg-gray-50/80 sticky top-0 z-10 border-b border-[#E0E0E0]">
            <tr>
              {["Survey", "Status", "Progress", "Completes", "AVG. LOI", "Conv. Rate", "I.R", "Avg. CPI"].map(
                (head, i) => (
                  <th
                    key={i}
                    className="text-[#555] px-4 py-3 text-[11px] font-[600] uppercase tracking-wider"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E0E0]">
            {surveys.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <NoData msg="No surveys active yet" />
                </td>
              </tr>
            ) : (
              surveys.map((survey) => (
                <tr
                  key={survey._id}
                  onClick={() => navigate(`/surveys/${survey.survey_id || survey._id}`)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3.5 max-w-[240px]">
                    <p className="text-xs font-semibold text-gray-900 truncate" title={survey.survey_name}>
                      {survey.survey_name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">{survey.survey_id}</p>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={survey.status} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <ProgressBar current={survey.responses} total={survey.sample_size} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs font-medium text-gray-700">
                    {survey.responses}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600">
                    {survey.loi} mins
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-green-600 font-medium">
                    {Math.round((survey.responses / survey.sample_size) * 100)}%
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600">
                    {survey.incidence_rate}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-xs font-semibold text-gray-800">
                    {survey.cpi}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySurveys;
