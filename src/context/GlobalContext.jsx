import React, { createContext, useContext, useState } from "react";
import mockData from "../data/mockData.json";

const GlobalContextProvider = createContext();

export const useGlobalContext = () => useContext(GlobalContextProvider);

export const GlobalContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [user, setUser] = useState(mockData.user);
  const [surveys, setSurveys] = useState(mockData.surveys);
  const [surveyGroups, setSurveyGroups] = useState(mockData.surveyGroups);
  const [invoices, setInvoices] = useState(mockData.invoices);
  const [questions, setQuestions] = useState(mockData.questions);
  const [recentActivities, setRecentActivities] = useState(mockData.recentActivities);
  const [performanceTrends] = useState(mockData.performanceTrends);

  const [toast, setToast] = useState({ open: false, msg: "", severity: "info" });

  const showToast = (msg, severity = "info") => {
    setToast({ open: true, msg, severity });
    setTimeout(() => {
      setToast({ open: false, msg: "", severity: "info" });
    }, 3500);
  };

  const addSurvey = (newSurvey) => {
    setSurveys((prev) => [newSurvey, ...prev]);
    showToast("Survey created successfully!", "success");
  };

  const addSurveyGroup = (newGroup) => {
    setSurveyGroups((prev) => [newGroup, ...prev]);
    showToast("Survey group created successfully!", "success");
  };

  const addQuestion = (newQ) => {
    setQuestions((prev) => [newQ, ...prev]);
    showToast("Qualification question added to library!", "success");
  };

  return (
    <GlobalContextProvider.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        showLoginModal,
        setShowLoginModal,
        surveys,
        setSurveys,
        addSurvey,
        surveyGroups,
        setSurveyGroups,
        addSurveyGroup,
        invoices,
        setInvoices,
        questions,
        addQuestion,
        recentActivities,
        performanceTrends,
        toast,
        showToast,
      }}
    >
      {children}
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white font-medium text-sm transition-all duration-300 bg-[#0226BE]">
          <span>{toast.msg}</span>
          <button
            onClick={() => setToast({ ...toast, open: false })}
            className="text-white/80 hover:text-white font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </GlobalContextProvider.Provider>
  );
};
