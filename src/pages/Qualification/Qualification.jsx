import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import PageWrapper from '../../components/PageWrapper';
import NoData from '../../components/NoData';
import { FiSearch, FiPlus, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

const Qualification = () => {
  const { questions, addQuestion, showToast } = useGlobalContext();
  const [activeTab, setActiveTab] = useState(0); // 0: Global Library, 1: Custom Questions
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [previewQuestion, setPreviewQuestion] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New question form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Demographics');
  const [newType, setNewType] = useState('Single Select');
  const [newText, setNewText] = useState('');
  const [newOptionsText, setNewOptionsText] = useState('');

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || q.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) {
      showToast('Please provide both question title and question prompt', 'warning');
      return;
    }
    const optionsArray = newOptionsText
      .split('\n')
      .map((opt) => opt.trim())
      .filter(Boolean);

    const newQ = {
      _id: `q_${Date.now()}`,
      category: newCategory,
      name: newName,
      type: newType,
      question_text: newText,
      options: optionsArray.length > 0 ? optionsArray : ['Yes', 'No'],
      usage_count: 1,
    };
    addQuestion(newQ);
    setIsAddModalOpen(false);
    setNewName('');
    setNewText('');
    setNewOptionsText('');
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Header */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Qualification & Screener Library
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Standardized demographic pre-screeners and verified industry targeting questions
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Custom Question</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab(0)}
            className={`pb-3 text-sm font-semibold px-6 border-b-2 transition-all ${
              activeTab === 0
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Standard Global Library
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`pb-3 text-sm font-semibold px-6 border-b-2 transition-all ${
              activeTab === 1
                ? 'border-[#0226BE] text-[#0226BE]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Custom Organization Questions
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-[#E0E0E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white font-medium"
              >
                <option>All</option>
                <option>Single Select</option>
                <option>Multi Punch</option>
                <option>Numeric</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions by keyword..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
              />
            </div>
          </div>

          {/* Questions Table */}
          <div className="overflow-x-auto containerScroll">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E0E0E0]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Question Name & Text
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Response Type
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Options Count
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Preview / Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filteredQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <NoData msg="No qualification questions matching criteria" />
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.map((q) => (
                    <tr
                      key={q._id}
                      className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      onClick={() => setPreviewQuestion(q)}
                    >
                      <td className="px-5 py-3.5 max-w-[340px]">
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#0226BE] transition-colors">
                          {q.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                          {q.question_text}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                          {q.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-700 font-medium">
                        {q.type}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-600">
                        {q.options?.length || 0} choices
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setPreviewQuestion(q)}
                            className="p-1.5 text-gray-500 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview question"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Question Preview Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {previewQuestion.category}
                </span>
                <h3 className="font-bold text-gray-900 text-sm mt-1">{previewQuestion.name}</h3>
              </div>
              <button
                onClick={() => setPreviewQuestion(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <p className="text-xs font-semibold text-gray-900">
                  {previewQuestion.question_text}
                </p>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {previewQuestion.options?.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-200 hover:border-[#0226BE] hover:bg-blue-50/20 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="preview_opt"
                      className="text-[#0226BE] focus:ring-[#0226BE]"
                    />
                    <span className="text-xs text-gray-800 font-medium">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setPreviewQuestion(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <h3 className="font-bold text-gray-900 text-base">Add Screener Question</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateQuestion} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Question Internal Title *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Primary Cloud Provider"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                  >
                    <option>Demographics</option>
                    <option>B2B Decision Makers</option>
                    <option>Employment & Industry</option>
                    <option>Financial</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Question Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                  >
                    <option>Single Select</option>
                    <option>Multi Punch</option>
                    <option>Numeric</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Prompt Shown to Respondent *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="e.g. Which cloud infrastructure provider does your enterprise primarily use?"
                  className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:border-[#0226BE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Options (one per line)
                </label>
                <textarea
                  rows={4}
                  value={newOptionsText}
                  onChange={(e) => setNewOptionsText(e.target.value)}
                  placeholder="Amazon Web Services (AWS)&#10;Microsoft Azure&#10;Google Cloud Platform (GCP)&#10;Other"
                  className="w-full text-xs font-mono border border-gray-200 rounded-lg p-3 resize-none focus:border-[#0226BE]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] transition-all shadow-sm"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Qualification;
