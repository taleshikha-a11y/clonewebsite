import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalContext } from './context/GlobalContext';
import Navbar from './components/Navbar';
import WarningBar from './components/WarningBar';
import LoginModal from './components/LoginModal';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Survey from './pages/Survey/Survey';
import SurveyGroup from './pages/SurveyGroup/SurveyGroup';
import Feasibility from './pages/Feasibility/Feasibility';
import Qualification from './pages/Qualification/Qualification';
import Invoice from './pages/Invoice/Invoice';
import Profile from './pages/Profile/Profile';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1a1a1a] flex flex-col font-inter selection:bg-blue-100 selection:text-[#0226BE]">
      <Navbar />

      <main className="w-full flex-1 flex justify-center">
        <div className="w-[94%] max-w-[1600px] flex flex-col">
          <WarningBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/surveys" element={<Survey />} />
            <Route path="/surveys/:id" element={<Survey />} />
            <Route path="/survey-groups" element={<SurveyGroup />} />
            <Route path="/survey-groups/:id" element={<SurveyGroup />} />
            <Route path="/invoice-billing" element={<Invoice />} />
            <Route path="/invoice-billing/:id" element={<Invoice />} />
            <Route path="/feasibility" element={<Feasibility />} />
            <Route path="/qualification-library" element={<Qualification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:type" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <LoginModal />
    </div>
  );
}

function App() {
  return (
    <GlobalContext>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GlobalContext>
  );
}

export default App;
