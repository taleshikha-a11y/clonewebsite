import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import {
  RiProfileLine,
  RiFolderSettingsLine,
} from 'react-icons/ri';
import {
  HiOutlineUserGroup,
  HiCode,
} from 'react-icons/hi';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { LuFileKey, LuCopy, LuCheck } from 'react-icons/lu';
import { PiBracketsCurlyBold } from 'react-icons/pi';
import { IoIosArrowBack } from 'react-icons/io';
import defaultUserProfile from '../../assets/defaultUserProfile.svg';

const Profile = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { user, setUser, showToast } = useGlobalContext();

  const activeTab = type || 'my-profile';
  const [collapse, setCollapse] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Profile fields state
  const [fullName, setFullName] = useState(user?.personalDetails?.fullName || 'Tales Admin');
  const [email] = useState(user?.email || 'tales@miratsinsights.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [orgName, setOrgName] = useState(user?.organizationName || 'Mirats Global Research');
  const [webhookUrl, setWebhookUrl] = useState('https://webhook.site/mirats-quanto-live-postback');

  useEffect(() => {
    if (!type) {
      navigate('/profile/my-profile', { replace: true });
    }
  }, [type, navigate]);

  const sideBarData = [
    { name: 'My Profile', key: 'my-profile', icon: <RiProfileLine size={20} /> },
    { name: 'Finance & Credits', key: 'finance', icon: <LiaFileInvoiceDollarSolid size={20} /> },
    { name: 'Project Settings', key: 'project-settings', icon: <RiFolderSettingsLine size={20} /> },
    { name: 'Post Back URL', key: 'post-back', icon: <PiBracketsCurlyBold size={20} /> },
    { name: 'Redirects & Keys', key: 'redirects-and-keys', icon: <LuFileKey size={20} /> },
    { name: 'Developer & API', key: 'developer', icon: <HiCode size={20} /> },
    { name: 'Notifications', key: 'my-notification', icon: <MdOutlineNotificationsActive size={20} /> },
    { name: 'Team Members', key: 'my-member', icon: <HiOutlineUserGroup size={20} /> },
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      organizationName: orgName,
      personalDetails: { ...prev.personalDetails, fullName },
      phone,
    }));
    showToast('Profile information updated successfully!', 'success');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    showToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="w-full flex min-h-[calc(100vh-64px)] bg-[#F9FAFB]">
      {/* Sidebar */}
      <div
        className={`${
          collapse ? 'w-[72px]' : 'w-[260px]'
        } transition-all duration-300 bg-white border-r border-gray-200 relative shadow-sm flex-shrink-0 flex flex-col`}
      >
        <button
          onClick={() => setCollapse(!collapse)}
          className={`w-7 h-7 flex items-center justify-center rounded-full absolute top-5 -right-3.5 bg-[#0226BE] text-white shadow-md hover:bg-[#011c91] transition-transform ${
            collapse ? 'rotate-180' : ''
          }`}
          title={collapse ? 'Expand' : 'Collapse'}
        >
          <IoIosArrowBack size={16} />
        </button>

        <div className="p-3 space-y-1 mt-3 flex-1 overflow-y-auto">
          {sideBarData.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => navigate(`/profile/${tab.key}`)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-[#0226BE]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={collapse ? tab.name : undefined}
              >
                <span className={isActive ? 'text-[#0226BE]' : 'text-gray-400'}>
                  {tab.icon}
                </span>
                {!collapse && <span>{tab.name}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* TAB 1: MY PROFILE */}
          {activeTab === 'my-profile' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <img
                  src={defaultUserProfile}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{fullName}</h2>
                  <p className="text-xs text-gray-500">{email}</p>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#0226BE] mt-1.5">
                    Account Role: {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Organization Name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: FINANCE & CREDITS */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#0226BE] to-[#0145E8] rounded-xl p-6 text-white shadow-md flex justify-between items-center">
                <div>
                  <p className="text-xs text-blue-200 uppercase font-semibold">Available Platform Credits</p>
                  <h3 className="text-3xl font-bold mt-1">${user?.credits?.toFixed(2)}</h3>
                  <p className="text-xs text-blue-100 mt-1">Automatic deduction on verified survey completes</p>
                </div>
                <button
                  onClick={() => showToast('Credit replenishment portal opened', 'info')}
                  className="px-4 py-2 bg-white text-[#0226BE] text-xs font-bold rounded-lg hover:bg-blue-50"
                >
                  Add Credits
                </button>
              </div>

              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-4">Payment Methods</h3>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Visa ending in 4242</p>
                      <p className="text-[11px] text-gray-500">Expires 12/28 • Default payment card</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECT SETTINGS */}
          {activeTab === 'project-settings' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Global Study Safeguards</h3>
                <p className="text-xs text-gray-500 mt-0.5">Control respondent fraud protection and quotas</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Digital Fingerprinting & IP Fraud Detection',
                    desc: 'Block duplicate devices, proxy/VPN networks, and datacenter bots.',
                    checked: true,
                  },
                  {
                    title: 'Speeders Trap (Speed Violation Check)',
                    desc: 'Automatically terminate respondents completing in less than 35% median LOI.',
                    checked: true,
                  },
                  {
                    title: 'Open-end AI Garbage Text Filter',
                    desc: 'Verify meaningful responses in qualitative & open text questions.',
                    checked: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-xl"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-4 h-4 rounded text-[#0226BE] mt-0.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: POST BACK URL */}
          {activeTab === 'post-back' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Server-to-Server Postback Webhooks</h3>
                <p className="text-xs text-gray-500 mt-0.5">Receive instantaneous webhook callbacks upon survey termination or complete</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Live Endpoint URL</label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full text-xs font-mono border border-gray-200 rounded-lg p-3 focus:border-[#0226BE]"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-gray-800">Supported Placeholders:</p>
                  <p className="text-gray-600 font-mono text-[11px]">{'[SURVEY_ID]'}, {'[RID]'}, {'[STATUS]'}, {'[CPI]'}, {'[SECURITY_HASH]'}</p>
                </div>

                <button
                  onClick={() => showToast('Test ping dispatched successfully (HTTP 200 OK)!', 'success')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg"
                >
                  Send Test Ping
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: REDIRECTS & KEYS */}
          {activeTab === 'redirects-and-keys' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Mirats Quanto DIY Redirect Endpoints</h3>
                <p className="text-xs text-gray-500 mt-0.5">Place these URLs into your survey tool (Qualtrics, Decipher, SurveyMonkey)</p>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  { label: 'Complete URL (Status: 10)', url: 'https://app.miratsquanto.com/DIY/complete?rid=[RID]' },
                  { label: 'Terminate / Screenout URL (Status: 20)', url: 'https://app.miratsquanto.com/DIY/terminate?rid=[RID]' },
                  { label: 'Quota Full URL (Status: 30)', url: 'https://app.miratsquanto.com/DIY/quotafull?rid=[RID]' },
                  { label: 'Security Fail URL (Status: 40)', url: 'https://app.miratsquanto.com/DIY/security?rid=[RID]' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 mb-0.5">{item.label}</p>
                      <p className="font-mono text-gray-600 text-[11px] truncate">{item.url}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="p-2 text-gray-500 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg"
                      title="Copy URL"
                    >
                      <LuCopy size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: DEVELOPER & API */}
          {activeTab === 'developer' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">REST API Authentication</h3>
                <p className="text-xs text-gray-500 mt-0.5">Automate survey creation, quota querying, and reconciliation via API</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Live API Key</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={user?.apiKey}
                      className="flex-1 text-xs font-mono border border-gray-200 rounded-lg p-2.5 bg-gray-50"
                    />
                    <button
                      onClick={() => handleCopy(user?.apiKey)}
                      className="px-3 py-2.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] flex items-center gap-1.5"
                    >
                      {copiedKey ? <LuCheck size={14} /> : <LuCopy size={14} />}
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Secret Key</label>
                  <input
                    type="password"
                    readOnly
                    value={user?.secretKey}
                    className="w-full text-xs font-mono border border-gray-200 rounded-lg p-2.5 bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {activeTab === 'my-notification' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-sm">Notification Channels</h3>
              {[
                { title: 'Quota Reached Notification', desc: 'Email when study completes 100% of sample size' },
                { title: 'Low Incidence Warning', desc: 'Alert when survey IR drops below 15%' },
                { title: 'Billing Statements', desc: 'Monthly tax invoices and payment confirmations' },
              ].map((n, i) => (
                <div key={i} className="flex justify-between items-center p-3.5 border border-gray-100 rounded-xl">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{n.title}</h4>
                    <p className="text-[11px] text-gray-500">{n.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#0226BE]" />
                </div>
              ))}
            </div>
          )}

          {/* TAB 8: TEAM MEMBERS */}
          {activeTab === 'my-member' && (
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-sm">Team Collaboration</h3>
                <button
                  onClick={() => showToast('Invite link generated!', 'success')}
                  className="px-3.5 py-1.5 bg-[#0226BE] text-white text-xs font-semibold rounded-lg"
                >
                  + Invite Member
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={defaultUserProfile} className="w-9 h-9 rounded-full object-cover" alt="Member" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{user?.personalDetails?.fullName}</p>
                      <p className="text-[11px] text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
