import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeHeader = ({ user }) => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getFullName = () => {
    if (user?.personalDetails?.fullName) {
      return user.personalDetails.fullName;
    }
    if (user?.organizationName) {
      return user.organizationName;
    }
    return "Tales";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#0226BE] to-[#0145E8] rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1 tracking-tight">
            {getGreeting()}, {getFullName()}!
          </h1>
          <p className="text-blue-100 text-sm font-medium">{getCurrentDate()}</p>
          <p className="text-blue-200 text-sm mt-2">
            Here's what's happening with your surveys today on Mirats Quanto DIY.
          </p>
        </div>
        <div
          onClick={() => navigate('/profile/project-settings')}
          className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition-opacity"
          title="Manage Workspace Settings"
        >
          <div className="text-left md:text-right">
            <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
              Organization
            </p>
            <p className="font-semibold text-white text-base">
              {user?.organizationName || "Mirats Global Research"}
            </p>
          </div>
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
