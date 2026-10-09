import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import MySurveys from './components/MySurveys';
import MyInvoices from './components/MyInvoices';
import SurveyAnalytics from './components/SurveyAnalytics';
import MySurveyGroups from './components/MySurveyGroups';
import MyQuestions from './components/MyQuestions';
import PageWrapper from '../../components/PageWrapper';
import WelcomeHeader from './components/WelcomeHeader';
import MetricsCards from './components/MetricsCards';
import PerformanceTrends from './components/PerformanceTrends';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import AISurveyModal from '../Survey/components/AISurveyModal';

const Dashboard = () => {
  const { user } = useGlobalContext();
  const [aiSurveyModal, setAISurveyModal] = useState(false);

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Welcome Header */}
        <WelcomeHeader user={user} />

        {/* Key Metrics Cards */}
        <MetricsCards user={user} />

        {/* Quick Actions */}
        <QuickActions onOpenCreateModal={() => setAISurveyModal(true)} />

        {/* Performance Trends */}
        <PerformanceTrends user={user} />

        {/* Survey Overview Section */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[#333] text-[18px] font-[600]">
              Survey Analytics
            </h2>
          </div>
          {/* Survey Analysis graph - Full width */}
          <SurveyAnalytics user={user} />

          {/* Tables and Activity Section */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[70%]">
              <MySurveys user={user} />
            </div>

            <div className="w-full lg:w-[30%]">
              <RecentActivity user={user} />
            </div>
          </div>

          {/* Invoices and Groups Section */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* my invoices table */}
            <div className="w-full lg:w-[50%]">
              <MyInvoices user={user} />
            </div>
            {/* Survey Groups */}
            <div className="w-full lg:w-[50%]">
              <MySurveyGroups user={user} />
            </div>
          </div>

          {/* Questions Section */}
          <div className="w-full">
            <MyQuestions user={user} />
          </div>
        </div>
      </div>

      {/* AI Survey Modal */}
      <AISurveyModal
        open={aiSurveyModal}
        onClose={() => setAISurveyModal(false)}
      />
    </PageWrapper>
  );
};

export default Dashboard;
