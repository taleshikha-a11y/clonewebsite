import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useGlobalContext } from '../../../context/GlobalContext';

const AISurveyModal = ({ open, onClose }) => {
  const { addSurvey, showToast } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' or 'manual'
  const [rfpText, setRfpText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual form state
  const [surveyName, setSurveyName] = useState('');
  const [country, setCountry] = useState('United States');
  const [sampleSize, setSampleSize] = useState(1000);
  const [loi, setLoi] = useState(10);
  const [ir, setIr] = useState(50);
  const [category, setCategory] = useState('Consumer Research');

  if (!open) return null;

  const handleAIGenerate = () => {
    if (!rfpText.trim()) {
      showToast('Please enter your research requirements or RFP text', 'warning');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newSurvey = {
        _id: `surv_${Date.now()}`,
        survey_id: `MQ-${Math.floor(10000 + Math.random() * 90000)}`,
        survey_name: rfpText.slice(0, 50) + (rfpText.length > 50 ? '...' : ''),
        category: 'AI Generated Study',
        country: 'Global / US',
        sample_size: 1200,
        responses: 0,
        status: 'Live',
        incidence_rate: '40%',
        loi: 12,
        cpi: '$3.20',
        created_at: new Date().toISOString(),
        type: 'Quantitative',
      };
      addSurvey(newSurvey);
      onClose();
    }, 1200);
  };

  const handleManualCreate = (e) => {
    e.preventDefault();
    if (!surveyName.trim()) {
      showToast('Please enter a survey name', 'warning');
      return;
    }
    const newSurvey = {
      _id: `surv_${Date.now()}`,
      survey_id: `MQ-${Math.floor(10000 + Math.random() * 90000)}`,
      survey_name: surveyName,
      category,
      country,
      sample_size: Number(sampleSize),
      responses: 0,
      status: 'Live',
      incidence_rate: `${ir}%`,
      loi: Number(loi),
      cpi: `$${(2.0 + (loi / 10) * 0.8).toFixed(2)}`,
      created_at: new Date().toISOString(),
      type: 'Quantitative',
    };
    addSurvey(newSurvey);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0226BE] flex items-center justify-center font-bold text-sm">
              ✨
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Create New Survey</h3>
              <p className="text-xs text-gray-500">Launch a DIY study with AI or custom setup</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-100 px-6 pt-3 bg-white">
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-3 text-xs font-semibold px-4 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>🤖 AI Fast Builder</span>
            <span className="bg-blue-100 text-[#0226BE] text-[10px] px-1.5 py-0.5 rounded-full font-bold">Recommended</span>
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-3 text-xs font-semibold px-4 border-b-2 transition-all ${
              activeTab === 'manual'
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manual Configuration
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'ai' ? (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
                <span className="text-base">💡</span>
                <div>
                  <p className="font-semibold text-blue-950">AI RFP to Live Study</p>
                  <p className="text-blue-800/90 mt-0.5">
                    Paste your study description, target audience, LOI and sample size. Quanto AI will automatically construct your targeting and quotas.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Project Description / RFP Specs
                </label>
                <textarea
                  rows={5}
                  value={rfpText}
                  onChange={(e) => setRfpText(e.target.value)}
                  placeholder="e.g. We need 1,000 IT decision makers in US and UK who recently adopted generative AI tools for enterprise workflows. LOI 10 minutes, IR 35%."
                  className="w-full text-sm border border-gray-200 rounded-xl p-3.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE] transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleAIGenerate}
                  className="px-5 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Generating Specs...
                    </>
                  ) : (
                    <>
                      <span>Generate & Launch Study</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Survey Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={surveyName}
                  onChange={(e) => setSurveyName(e.target.value)}
                  placeholder="e.g. Q4 Consumer Tech Brand Health Study"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Target Market / Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Canada</option>
                    <option>India</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                  >
                    <option>Consumer Research</option>
                    <option>B2B Enterprise</option>
                    <option>Healthcare</option>
                    <option>Financial Services</option>
                    <option>Automotive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Sample Size (N)</label>
                  <input
                    type="number"
                    value={sampleSize}
                    onChange={(e) => setSampleSize(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">LOI (Mins)</label>
                  <input
                    type="number"
                    value={loi}
                    onChange={(e) => setLoi(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Est. IR (%)</label>
                  <input
                    type="number"
                    value={ir}
                    onChange={(e) => setIr(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] transition-all shadow-sm"
                >
                  Create Survey
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISurveyModal;
