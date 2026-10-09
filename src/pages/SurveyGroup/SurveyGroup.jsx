import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import PageWrapper from '../../components/PageWrapper';
import TotalSurveyGroup from '../../assets/icons/TotalSurveyGroup.svg';
import TotalActiveSurveyGroup from '../../assets/icons/ToatalActiveSurveyGroup.svg';
import TotalInactiveSurveyGroup from '../../assets/icons/TotalInactiveSurveyGroup.svg';
import NoData from '../../components/NoData';
import { FiSearch, FiPlus, FiEdit2, FiCheck, FiFolder } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

const SurveyGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { surveyGroups, setSurveyGroups, addSurveyGroup, showToast } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCountry, setNewGroupCountry] = useState('North America');
  const [isActive, setIsActive] = useState(true);

  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRegion, setEditRegion] = useState('');

  useEffect(() => {
    if (id) {
      const found = surveyGroups.find((g) => g.group_id === id || g._id === id);
      if (found) {
        handleOpenDetails(found);
      }
    }
  }, [id, surveyGroups]);

  const totalGroups = surveyGroups.length;
  const activeGroups = surveyGroups.filter((g) => g.status === 'Active').length;
  const inactiveGroups = surveyGroups.filter((g) => g.status === 'Inactive').length;

  const filteredGroups = surveyGroups.filter(
    (g) =>
      g.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.group_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDetails = (group) => {
    setSelectedGroupDetails(group);
    setEditName(group.group_name);
    setEditRegion(group.country);
  };

  const handleCloseDetails = () => {
    setSelectedGroupDetails(null);
    if (id) navigate('/survey-groups', { replace: true });
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      showToast('Please enter a group name', 'warning');
      return;
    }
    const newGroup = {
      _id: `grp_${Date.now()}`,
      group_id: `GRP-${Math.floor(100 + Math.random() * 900)}`,
      group_name: newGroupName,
      surveys_count: 0,
      active_count: 0,
      country: newGroupCountry,
      status: isActive ? 'Active' : 'Inactive',
      created_at: new Date().toISOString().split('T')[0],
    };
    addSurveyGroup(newGroup);
    setNewGroupName('');
    setIsModalOpen(false);
  };

  const toggleStatus = (groupId) => {
    setSurveyGroups((prev) =>
      prev.map((g) =>
        g._id === groupId
          ? { ...g, status: g.status === 'Active' ? 'Inactive' : 'Active' }
          : g
      )
    );
    if (selectedGroupDetails && selectedGroupDetails._id === groupId) {
      setSelectedGroupDetails((prev) => ({
        ...prev,
        status: prev.status === 'Active' ? 'Inactive' : 'Active',
      }));
    }
    showToast('Group status updated', 'success');
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (!selectedGroupDetails) return;
    setSurveyGroups((prev) =>
      prev.map((g) =>
        g._id === selectedGroupDetails._id
          ? { ...g, group_name: editName, country: editRegion }
          : g
      )
    );
    showToast('Survey group details saved successfully!', 'success');
    handleCloseDetails();
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Top 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Groups</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalGroups}</h3>
              <p className="text-xs text-gray-400 mt-1">Organized study clusters</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center p-2.5">
              <img src={TotalSurveyGroup} alt="Total Groups" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Active Groups</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{activeGroups}</h3>
              <p className="text-xs text-green-600/80 mt-1">Currently routing respondents</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center p-2.5">
              <img src={TotalActiveSurveyGroup} alt="Active Groups" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inactive Groups</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{inactiveGroups}</h3>
              <p className="text-xs text-gray-400 mt-1">Archived or paused clusters</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2.5">
              <img src={TotalInactiveSurveyGroup} alt="Inactive Groups" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* Survey Groups Table Container */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm">
          {/* Toolbar */}
          <div className="p-4 sm:p-5 border-b border-[#E0E0E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Survey Groups Directory</h2>
              <p className="text-xs text-gray-500 mt-0.5">Cluster multiple surveys for cross-market sampling</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search groups..."
                  className="w-full sm:w-60 text-xs pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
              >
                <FiPlus className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto containerScroll">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E0E0E0]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Group Name & ID
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Target Region
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Linked Studies
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filteredGroups.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <NoData msg="No survey groups found" />
                    </td>
                  </tr>
                ) : (
                  filteredGroups.map((group) => (
                    <tr
                      key={group._id}
                      onClick={() => handleOpenDetails(group)}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3.5 max-w-[260px]">
                        <h4 className="text-xs font-semibold text-gray-900 group-hover:text-[#0226BE] transition-colors truncate">
                          {group.group_name}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {group.group_id}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-700 font-medium">
                        {group.country}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="text-xs font-semibold text-[#0226BE] bg-blue-50 px-2.5 py-1 rounded-md">
                          {group.surveys_count} Studies
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleStatus(group._id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-all ${
                            group.status === 'Active'
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              group.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                          />
                          {group.status}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-500">
                        {group.created_at}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenDetails(group)}
                            className="p-1.5 text-gray-400 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit / View Group"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
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

      {/* Edit / Details Modal */}
      {selectedGroupDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div className="flex items-center gap-2">
                <FiFolder className="text-[#0226BE] w-5 h-5" />
                <h3 className="font-bold text-gray-900 text-sm">
                  Group {selectedGroupDetails.group_id}
                </h3>
              </div>
              <button
                onClick={handleCloseDetails}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDetails} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Group Title</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Region</label>
                <input
                  type="text"
                  required
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-gray-800">Routing Status</p>
                  <p className="text-[11px] text-gray-500">Currently {selectedGroupDetails.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleStatus(selectedGroupDetails._id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                    selectedGroupDetails.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {selectedGroupDetails.status}
                </button>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Survey Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <h3 className="font-bold text-gray-900 text-base">Create Survey Group</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateGroup} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Group Name *</label>
                <input
                  type="text"
                  required
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. North America Q4 Omnibus"
                  className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Market / Region</label>
                <select
                  value={newGroupCountry}
                  onChange={(e) => setNewGroupCountry(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 bg-white"
                >
                  <option>North America (US & CA)</option>
                  <option>Western Europe (UK, DE, FR)</option>
                  <option>Asia Pacific (APAC)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="statusActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-[#0226BE]"
                />
                <label htmlFor="statusActive" className="text-xs text-gray-700 font-medium">
                  Set group as Active immediately
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default SurveyGroup;
