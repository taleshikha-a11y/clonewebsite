import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import MiratsQuantoLogo from '../assets/logos/MiratsQuantoLogo.svg';
import defaultUserProfile from '../assets/defaultUserProfile.svg';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { FiLogOut, FiLogIn, FiMenu, FiX, FiUser } from 'react-icons/fi';
import MiratsAnimatedLogo from './MiratsAnimatedLogo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setShowLoginModal } = useGlobalContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navData = [
    { name: 'Dashboard', path: '/' },
    { name: 'Surveys', path: '/surveys' },
    { name: 'Survey Groups', path: '/survey-groups' },
    { name: 'Invoices & Billing', path: '/invoice-billing' },
    { name: 'Feasibility', path: '/feasibility' },
    { name: 'Qualification Library', path: '/qualification-library' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="w-full print:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-all">
      <div className="mx-auto w-[94%] max-w-[1600px] flex items-center justify-between h-[64px]">
        {/* Left: Logo Section */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <MiratsAnimatedLogo />
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden hidden sm:block ${
              isScrolled ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'
            }`}
          >
            <img
              src={MiratsQuantoLogo}
              alt="Mirats Quanto DIY"
              className="h-[38px] md:h-[42px] w-auto block object-contain"
            />
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navData.map((data, ind) => (
            <NavLink
              key={ind}
              to={data.path}
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-[13px] xl:text-[14px] font-[500] rounded-md transition-all duration-200 hover:text-[#0226BE] hover:bg-blue-50 ${
                  isActive
                    ? 'text-[#0226BE] font-[600] bg-blue-50'
                    : 'text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{data.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0226BE] rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right: User Profile & Controls */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Auth State Indicator / Demo Mode badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Live Workspace</span>
          </div>

          {/* User Details */}
          <div
            className="hidden md:flex flex-col items-end cursor-pointer"
            onClick={() => navigate('/profile/my-profile')}
          >
            <h1 className="text-[13px] font-[600] text-[#1a1a1a] truncate max-w-[130px]">
              {user?.personalDetails?.fullName}
            </h1>
            <p className="text-[11px] text-gray-500 truncate max-w-[130px]">
              {user?.email}
            </p>
          </div>

          {/* Profile Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center focus:outline-none ring-2 ring-transparent hover:ring-[#0226BE]/20 rounded-full transition-all cursor-pointer"
            >
              <img
                src={defaultUserProfile}
                alt="user profile"
                className="w-[40px] h-[40px] rounded-full object-cover border-2 border-gray-200 hover:border-[#0226BE] transition-colors"
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">{user?.personalDetails?.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-[#0226BE] text-[11px] font-medium rounded">
                    {user?.organizationName}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      navigate('/profile/my-profile');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FiUser className="w-4 h-4 text-gray-500" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FiLogIn className="w-4 h-4 text-blue-600" />
                    Preview Mirats Auth Screen
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => {
                      setProfileDropdown(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FiLogOut className="w-4 h-4 text-red-600" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            type="button"
            className="flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-[#0226BE] hover:bg-blue-50 transition-colors focus:outline-none cursor-pointer"
            onClick={() => navigate('/profile/developer')}
            title="API & Developer Docs"
          >
            <IoMdHelpCircleOutline className="w-6 h-6" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navData.map((data, ind) => (
            <NavLink
              key={ind}
              to={data.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#0226BE] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {data.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowLoginModal(true);
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#0226BE] font-medium hover:bg-blue-50 rounded-lg flex items-center gap-2"
            >
              <FiLogIn className="w-4 h-4" />
              Preview Mirats Auth Screen
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
