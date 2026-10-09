import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context/GlobalContext';

const MetricCard = ({ title, value, subtitle, change, icon, color, onClick }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E0E0E0] rounded-xl p-5 flex flex-col justify-between gap-3 hover:shadow-lg transition-all duration-300 hover:border-[#0226BE]/40 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${color}`}
        >
          {icon}
        </div>
        {change !== undefined && change !== null && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? 'bg-green-50 text-green-600'
                : isNegative
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-50 text-gray-600'
            }`}
          >
            {isPositive ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            ) : isNegative ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            ) : null}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#1a1a1a] tracking-tight group-hover:text-[#0226BE] transition-colors">
          {value}
        </h3>
        <p className="text-sm font-medium text-[#555] mt-1">{title}</p>
        {subtitle && <p className="text-xs text-[#888] mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

const MetricsCards = () => {
  const navigate = useNavigate();
  const { surveys, invoices } = useGlobalContext();

  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter((s) => s.status === 'Live').length;
  const totalCompletes = surveys.reduce((acc, s) => acc + (s.responses || 0), 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((acc, inv) => acc + parseFloat(inv.amount.replace(/[^0-9.-]+/g, '') || 0), 0);

  const cards = [
    {
      title: 'Active Surveys',
      value: activeSurveys,
      subtitle: `${totalSurveys} total studies`,
      onClick: () => navigate('/surveys'),
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      color: 'bg-blue-50',
    },
    {
      title: 'Total Completes',
      value: totalCompletes.toLocaleString(),
      subtitle: `${totalCompletes} quota filled`,
      change: 14.8,
      onClick: () => navigate('/surveys'),
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-50',
    },
    {
      title: 'Reconciled IDs',
      value: (5920).toLocaleString(),
      subtitle: `860 pending verification`,
      onClick: () => navigate('/surveys'),
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-teal-50',
    },
    {
      title: 'Conversion Rate',
      value: `44.6%`,
      subtitle: `Feasibility benchmark`,
      change: 3.2,
      onClick: () => navigate('/feasibility'),
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'bg-purple-50',
    },
    {
      title: 'Pending Amount',
      value: `$${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: `Billing & invoice statement`,
      onClick: () => navigate('/invoice-billing'),
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <MetricCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MetricsCards;
