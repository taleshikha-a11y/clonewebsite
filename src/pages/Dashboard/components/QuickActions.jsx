import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = ({ onOpenCreateModal }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Survey",
      description: "Start a new survey project",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      iconBg: "bg-blue-50",
      iconColor: "text-[#0226BE]",
      onClick: () => {
        if (onOpenCreateModal) onOpenCreateModal();
        else navigate("/surveys");
      },
    },
    {
      title: "View Invoices",
      description: "Check billing status",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      onClick: () => navigate("/invoice-billing"),
    },
    {
      title: "Manage Groups",
      description: "Organize survey groups",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      onClick: () => navigate("/survey-groups"),
    },
    {
      title: "Qualifications",
      description: "Manage question library",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      onClick: () => navigate("/qualification-library"),
    },
  ];

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-base">Quick Actions</h3>
        <span className="text-xs text-gray-400 font-medium">Frequently used shortcuts</span>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-start gap-3.5 p-3.5 rounded-lg text-left hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 group"
          >
            <div
              className={`w-10 h-10 rounded-lg ${action.iconBg} ${action.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
            >
              {action.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#0226BE] transition-colors">
                {action.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
