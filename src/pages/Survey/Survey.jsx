import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import PageWrapper from '../../components/PageWrapper';
import AISurveyModal from './components/AISurveyModal';
import TotalSurveyIcon from '../../assets/icons/TotalSurveyIcon.svg';
import TotalLiveSurveyIcon from '../../assets/icons/TotalLiveSurvey.svg';
import TotalPendingSurvey from '../../assets/icons/TotalPendingSurvey.svg';
import TotalCompleatSurvey from '../../assets/icons/TotalCompleateSurvey.svg';
import NoData from '../../components/NoData';
import { FiSearch, FiPlus, FiDownload, FiMoreVertical, FiCopy, FiCheck, FiPlay, FiPause, FiExternalLink } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0226BE] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'live':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'paused':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStyles()}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'Live'
            ? 'bg-green-500 animate-pulse'
            : status === 'Completed'
              ? 'bg-blue-500'
              : status === 'Pending'
                ? 'bg-amber-500'
                : 'bg-gray-400'
        }`}
      />
      {status}
    </span>
  );
};

const Survey = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { surveys, setSurveys, showToast } = useGlobalContext();
  const [activeMainTab, setActiveMainTab] = useState('quantitative'); // 'quantitative' or 'qualitative'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSurveys, setSelectedSurveys] = useState([]);
  const [selectedSurveyDetails, setSelectedSurveyDetails] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (id) {
      const found = surveys.find((s) => s.survey_id === id || s._id === id);
      if (found) {
        setSelectedSurveyDetails(found);
      }
    }
  }, [id, surveys]);

  const filterTabs = ['All', 'Live', 'Pending', 'Paused', 'Completed'];

  const filteredSurveys = surveys.filter((s) => {
    const matchesStatus =
      statusFilter === 'All' || s.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      s.survey_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.survey_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSurveys = surveys.length;
  const liveSurveys = surveys.filter((s) => s.status === 'Live').length;
  const pendingSurveys = surveys.filter((s) => s.status === 'Pending').length;
  const completedSurveys = surveys.filter((s) => s.status === 'Completed').length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSurveys(filteredSurveys.map((s) => s._id));
    } else {
      setSelectedSurveys([]);
    }
  };

  const handleSelectOne = (surveyId) => {
    if (selectedSurveys.includes(surveyId)) {
      setSelectedSurveys(selectedSurveys.filter((item) => item !== surveyId));
    } else {
      setSelectedSurveys([...selectedSurveys, surveyId]);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Name,Category,Country,SampleSize,Completes,Status,IR,LOI,CPI\n';
    const rows = filteredSurveys
      .map(
        (s) =>
          `"${s.survey_id}","${s.survey_name}","${s.category}","${s.country}",${s.sample_size},${s.responses},"${s.status}","${s.incidence_rate}",${s.loi},"${s.cpi}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mirats_Quanto_Surveys_${Date.now()}.csv`;
    a.click();
    showToast('Surveys exported to CSV!', 'success');
  };

  const handleCopyLink = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    showToast('Survey participant link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleSurveyStatus = (surveyId) => {
    setSurveys((prev) =>
      prev.map((s) => {
        if (s._id === surveyId || s.survey_id === surveyId) {
          const nextStatus = s.status === 'Live' ? 'Paused' : 'Live';
          showToast(`Survey status updated to ${nextStatus}`, 'success');
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    if (selectedSurveyDetails) {
      setSelectedSurveyDetails((prev) => ({
        ...prev,
        status: prev.status === 'Live' ? 'Paused' : 'Live',
      }));
    }
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Top 4 Metrics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Surveys</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalSurveys}</h3>
              <p className="text-xs text-gray-400 mt-1">Across all categories</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center p-2.5">
              <img src={TotalSurveyIcon} alt="Total Surveys" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Total Live</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{liveSurveys}</h3>
              <p className="text-xs text-green-600/80 mt-1">Collecting responses now</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center p-2.5">
              <img src={TotalLiveSurveyIcon} alt="Live Surveys" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Total Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingSurveys}</h3>
              <p className="text-xs text-amber-600/80 mt-1">Awaiting field launch</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center p-2.5">
              <img src={TotalPendingSurvey} alt="Pending Surveys" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Total Complete</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{completedSurveys}</h3>
              <p className="text-xs text-blue-600/80 mt-1">100% quota achieved</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center p-2.5">
              <img src={TotalCompleatSurvey} alt="Completed Surveys" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Main Tabs (Quantitative vs Qualitative) */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveMainTab('quantitative')}
            className={`pb-3 text-sm font-semibold px-6 border-b-2 transition-all flex items-center gap-2 ${
              activeMainTab === 'quantitative'
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Quantitative Studies
            <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-[#0226BE] font-bold">
              {surveys.length}
            </span>
          </button>
          <button
            onClick={() => setActiveMainTab('qualitative')}
            className={`pb-3 text-sm font-semibold px-6 border-b-2 transition-all flex items-center gap-2 ${
              activeMainTab === 'qualitative'
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Qualitative Studies
            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 font-bold">
              0
            </span>
          </button>
        </div>

        {activeMainTab === 'qualitative' ? (
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-12 text-center">
            <NoData msg="No Qualitative Focus Groups or IDIs scheduled yet" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-5 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] transition-all"
            >
              + Create Qualitative Study
            </button>
          </div>
        ) : (
          /* Quantitative Main Container */
          <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm">
            {/* Header / Filter Toolbar */}
            <div className="p-4 sm:p-5 border-b border-[#E0E0E0] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
              {/* Status filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      statusFilter === tab
                        ? 'bg-[#0226BE] text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search & Actions */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, ID..."
                    className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE] transition-all"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Export to CSV"
                >
                  <FiDownload className="w-3.5 h-3.5 text-gray-500" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Create Survey</span>
                </button>
              </div>
            </div>

            {/* Surveys Table */}
            <div className="overflow-x-auto containerScroll">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-[#E0E0E0]">
                  <tr>
                    <th className="px-4 py-3 w-8">
                      <input
                        type="checkbox"
                        checked={
                          selectedSurveys.length > 0 &&
                          selectedSurveys.length === filteredSurveys.length
                        }
                        onChange={handleSelectAll}
                        className="rounded text-[#0226BE] focus:ring-[#0226BE]"
                      />
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Survey Project
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Completes
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      LOI
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      I.R.
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      CPI
                    </th>
                    <th className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E0E0]">
                  {filteredSurveys.length === 0 ? (
                    <tr>
                      <td colSpan={10}>
                        <NoData msg="No matching surveys found" />
                      </td>
                    </tr>
                  ) : (
                    filteredSurveys.map((survey) => (
                      <tr
                        key={survey._id}
                        onClick={() => setSelectedSurveyDetails(survey)}
                        className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedSurveys.includes(survey._id)}
                            onChange={() => handleSelectOne(survey._id)}
                            className="rounded text-[#0226BE] focus:ring-[#0226BE]"
                          />
                        </td>
                        <td className="px-4 py-3.5 max-w-[280px]">
                          <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-[#0226BE] transition-colors">
                            {survey.survey_name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 font-mono">
                              {survey.survey_id}
                            </span>
                            <span className="text-[10px] text-purple-600 font-medium">
                              • {survey.category}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <StatusBadge status={survey.status} />
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-700 font-medium">
                          {survey.country}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <ProgressBar current={survey.responses} total={survey.sample_size} />
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs font-semibold text-gray-800">
                          {survey.responses} / {survey.sample_size}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600">
                          {survey.loi}m
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600">
                          {survey.incidence_rate}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs font-bold text-gray-900">
                          {survey.cpi}
                        </td>
                        <td
                          className="px-4 py-3.5 whitespace-nowrap text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedSurveyDetails(survey)}
                            className="p-1.5 text-gray-400 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Survey Details"
                          >
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-3.5 border-t border-[#E0E0E0] bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
              <p>
                Showing <span className="font-semibold">{filteredSurveys.length}</span> of{' '}
                <span className="font-semibold">{surveys.length}</span> studies
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="px-3 py-1 bg-[#0226BE] text-white rounded font-medium">
                  1
                </button>
                <button
                  disabled
                  className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-400 cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Survey Details Modal */}
      {selectedSurveyDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0226BE] flex items-center justify-center font-bold text-xs font-mono">
                  MQ
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {selectedSurveyDetails.survey_id} Details
                  </h3>
                  <p className="text-[11px] text-gray-500 truncate max-w-[320px]">
                    {selectedSurveyDetails.survey_name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedSurveyDetails(null);
                  if (id) navigate('/surveys', { replace: true });
                }}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Header stats */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {selectedSurveyDetails.category}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Market: <span className="font-semibold text-gray-800">{selectedSurveyDetails.country}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedSurveyDetails.status} />
                  <button
                    onClick={() => toggleSurveyStatus(selectedSurveyDetails._id)}
                    className="p-1.5 text-gray-500 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg text-xs font-medium border border-gray-200"
                    title={selectedSurveyDetails.status === 'Live' ? 'Pause Study' : 'Activate Study'}
                  >
                    {selectedSurveyDetails.status === 'Live' ? <FiPause size={14} /> : <FiPlay size={14} />}
                  </button>
                </div>
              </div>

              {/* Progress metrics grid */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Completes</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">
                    {selectedSurveyDetails.responses} / {selectedSurveyDetails.sample_size}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Est. LOI</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{selectedSurveyDetails.loi}m</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Incidence</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{selectedSurveyDetails.incidence_rate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">CPI Target</p>
                  <p className="text-base font-bold text-[#0226BE] mt-0.5">{selectedSurveyDetails.cpi}</p>
                </div>
              </div>

              {/* Live survey link */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Live Respondent Routing URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://app.miratsquanto.com/DIY/take-survey?id=${selectedSurveyDetails.survey_id}&rid=[RID]`}
                    className="flex-1 text-xs font-mono border border-gray-200 rounded-lg p-2.5 bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => handleCopyLink(`https://app.miratsquanto.com/DIY/take-survey?id=${selectedSurveyDetails.survey_id}&rid=[RID]`)}
                    className="px-3.5 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] flex items-center gap-1.5 transition-all"
                  >
                    {copiedLink ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    Copy
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => toggleSurveyStatus(selectedSurveyDetails._id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    selectedSurveyDetails.status === 'Live'
                      ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {selectedSurveyDetails.status === 'Live' ? 'Pause Fieldwork' : 'Launch Fieldwork'}
                </button>
                <button
                  onClick={() => {
                    setSelectedSurveyDetails(null);
                    if (id) navigate('/surveys', { replace: true });
                  }}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AISurveyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageWrapper>
  );
};

export default Survey;
