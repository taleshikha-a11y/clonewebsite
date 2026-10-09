import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import NoData from "../../../components/NoData";

const MyQuestions = () => {
  const navigate = useNavigate();
  const { questions } = useGlobalContext();

  return (
    <div className="w-full bg-white border border-[#E0E0E0] rounded-xl h-[360px] flex flex-col overflow-hidden hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between bg-gray-50/50">
        <div>
          <h1 className="text-[#0226BE] text-[16px] font-[600]">Qualification Library</h1>
          <p className="text-[11px] text-[#666] mt-0.5">Pre-screener & profiling questions</p>
        </div>
        <button
          className="text-[#0226BE] text-[13px] font-[500] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/qualification-library")}
        >
          See all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto containerScroll p-4 space-y-3">
        {questions.length === 0 ? (
          <NoData msg="No questions in library" />
        ) : (
          questions.map((q) => (
            <div
              key={q._id}
              onClick={() => navigate("/qualification-library")}
              className="p-3.5 border border-[#E0E0E0] rounded-xl hover:border-[#0226BE]/30 hover:shadow-sm transition-all cursor-pointer group flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-1">
                  {q.category}
                </span>
                <h4 className="text-xs font-semibold text-gray-900 group-hover:text-[#0226BE] transition-colors truncate">
                  {q.name}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{q.question_text}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded font-medium">
                  {q.options?.length || 0} options
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyQuestions;
