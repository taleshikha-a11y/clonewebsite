import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import PageWrapper from '../../components/PageWrapper';
import {
  FaPeopleGroup,
  FaBuildingNgo,
} from 'react-icons/fa6';
import {
  MdOutlineScreenShare,
  MdManageAccounts,
} from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { IoCashOutline } from 'react-icons/io5';
import { GiPublicSpeaker } from 'react-icons/gi';
import { RiWallet2Line } from 'react-icons/ri';
import { FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';

const Feasibility = () => {
  const { showToast } = useGlobalContext();

  const [country, setCountry] = useState('United States');
  const [totalCompletes, setTotalCompletes] = useState(1000);
  const [loi, setLoi] = useState(12);
  const [ir, setIr] = useState(45);
  const [selectedAudience, setSelectedAudience] = useState('Total');

  const advanceTargetAudienceCardData = [
    {
      key: 'Total',
      title: 'Census Representation',
      desc: 'Diverse, nationally representative cross-section of general consumers for reliable public polling.',
      icon: <FaPeopleGroup size={28} />,
    },
    {
      key: 'ITDMs',
      title: 'IT Decision Makers',
      desc: 'Key IT buyers, CTOs, CIOs, and system engineers influencing cloud and software adoption.',
      icon: <MdOutlineScreenShare size={28} />,
    },
    {
      key: 'HRDMs',
      title: 'HR Decision Makers',
      desc: 'Chief People Officers, HR directors, and recruiters managing workforce strategy.',
      icon: <IoIosPeople size={28} />,
    },
    {
      key: 'Finance',
      title: 'Financial / Investment Managers',
      desc: 'CFOs, hedge fund managers, and banking directors making institutional fiscal decisions.',
      icon: <IoCashOutline size={28} />,
    },
    {
      key: 'Marketing',
      title: 'Marketing Decision Makers',
      desc: 'CMOs, brand directors, and digital marketing leaders directing media campaigns.',
      icon: <GiPublicSpeaker size={28} />,
    },
    {
      key: 'C-Level',
      title: 'C-Level Executives',
      desc: 'Top enterprise leadership including CEOs, Founders, Board Directors, and Partners.',
      icon: <MdManageAccounts size={28} />,
    },
    {
      key: 'NonProfit',
      title: 'Non-Profit Organization',
      desc: 'Directors and professionals dedicated to mission-driven NGOs and charity organizations.',
      icon: <FaBuildingNgo size={28} />,
    },
  ];

  // Dynamic calculations based on audience tier, LOI, and IR
  const getAudienceMultiplier = () => {
    switch (selectedAudience) {
      case 'C-Level':
        return 4.2;
      case 'Finance':
        return 3.2;
      case 'ITDMs':
        return 2.8;
      case 'HRDMs':
        return 2.2;
      case 'Marketing':
        return 2.0;
      case 'NonProfit':
        return 1.8;
      default:
        return 1.0;
    }
  };

  const calculateCPI = () => {
    const baseCPI = 1.75;
    const loiFactor = loi * 0.12;
    const irFactor = Math.max(0.5, (100 - ir) * 0.035);
    const audienceMult = getAudienceMultiplier();
    return (baseCPI + loiFactor + irFactor) * audienceMult;
  };

  const cpi = calculateCPI();
  const totalCost = cpi * totalCompletes;
  const turnaroundDays = Math.max(2, Math.round((totalCompletes / 500) * (50 / Math.max(10, ir))));
  const feasibilityPercentage = Math.min(99, Math.max(40, Math.round(98 - (loi / 2) - ((100 - ir) / 4))));

  const handleSaveQuote = () => {
    showToast(`Feasibility Quote for ${totalCompletes} completes saved to your workspace!`, 'success');
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Header */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Feasibility & Pricing Calculator
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Estimate audience availability, CPI, total spend, and turnaround time in real-time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">Target Market:</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="text-xs font-semibold text-[#0226BE] bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 outline-none"
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>Canada</option>
              <option>India</option>
              <option>France</option>
              <option>Australia</option>
              <option>Japan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Sliders and Audience Selector (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Parameters Card */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-sm mb-6 pb-3 border-b border-gray-100 flex items-center justify-between">
                <span>Study Parameters</span>
                <span className="text-xs text-[#0226BE] font-medium">Fine-tune specifications</span>
              </h3>

              <div className="space-y-6">
                {/* Total Completes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-700">
                      Total Completes (Sample Size - N)
                    </label>
                    <span className="text-sm font-bold text-[#0226BE] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {totalCompletes.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={totalCompletes}
                    onChange={(e) => setTotalCompletes(Number(e.target.value))}
                    className="w-full accent-[#0226BE] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>100</span>
                    <span>2,500</span>
                    <span>5,000</span>
                    <span>10,000+</span>
                  </div>
                </div>

                {/* Length of Interview (LOI) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-700">
                      Length of Interview (LOI)
                    </label>
                    <span className="text-sm font-bold text-[#0226BE] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {loi} minutes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="45"
                    step="1"
                    value={loi}
                    onChange={(e) => setLoi(Number(e.target.value))}
                    className="w-full accent-[#0226BE] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>1 min</span>
                    <span>15 mins</span>
                    <span>30 mins</span>
                    <span>45 mins</span>
                  </div>
                </div>

                {/* Incidence Rate (IR) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-700">
                      Incidence Rate (IR)
                    </label>
                    <span className="text-sm font-bold text-[#0226BE] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {ir}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={ir}
                    onChange={(e) => setIr(Number(e.target.value))}
                    className="w-full accent-[#0226BE] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>5% (Niche)</span>
                    <span>30%</span>
                    <span>60%</span>
                    <span>100% (Broad)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience Selector */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-sm mb-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                <span>Target Audience Persona</span>
                <span className="text-xs text-gray-400">Select audience criteria</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {advanceTargetAudienceCardData.map((item) => {
                  const isSelected = selectedAudience === item.key;
                  return (
                    <div
                      key={item.key}
                      onClick={() => setSelectedAudience(item.key)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-[#0226BE] bg-blue-50/50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#0226BE] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Feasibility Summary (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="bg-gradient-to-br from-[#0226BE] to-[#011c91] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10">
                <RiWallet2Line size={160} />
              </div>

              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-semibold text-blue-100">
                  Instant Quote
                </span>

                <div className="mt-4">
                  <p className="text-xs text-blue-200">Estimated Cost Per Interview (CPI)</p>
                  <h2 className="text-3xl font-extrabold text-white mt-0.5 tracking-tight">
                    ${cpi.toFixed(2)}
                  </h2>
                </div>

                <div className="mt-4 pt-4 border-t border-white/15">
                  <p className="text-xs text-blue-200">Total Study Budget</p>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/15">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-[10px] text-blue-200 uppercase font-semibold">Feasibility</p>
                    <p className="text-base font-bold text-green-300 mt-0.5 flex items-center gap-1">
                      <FiCheckCircle size={14} />
                      {feasibilityPercentage}% High
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-[10px] text-blue-200 uppercase font-semibold">Turnaround</p>
                    <p className="text-base font-bold text-white mt-0.5 flex items-center gap-1">
                      <FiClock size={14} />
                      ~{turnaroundDays} Days
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSaveQuote}
                  className="w-full mt-6 py-3 bg-white text-[#0226BE] font-bold text-xs rounded-xl hover:bg-blue-50 transition-all shadow-md active:scale-95"
                >
                  Order Sample / Save Quote
                </button>
              </div>
            </div>

            {/* Platform Guarantees */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Mirats Quanto Quality Guarantees
              </h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>100% verified human panelists with fraud protection</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Instant automated reconciliation & refund guarantee</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Seamless Qualtrics, SurveyMonkey, Decipher integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Feasibility;
