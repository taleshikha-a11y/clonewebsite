import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import MiratsQuantoLogo from '../assets/logos/MiratsQuantoLogo.svg';
import MiratsAnimatedLogo from './MiratsAnimatedLogo';
import { RxCross2 } from 'react-icons/rx';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from 'react-icons/fa';

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal, setUser, showToast } = useGlobalContext();
  const [email, setEmail] = useState('tales@miratsinsights.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showLoginModal) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUser((prev) => ({
        ...prev,
        email,
      }));
      showToast('Successfully authenticated with Mirats Accounts SSO!', 'success');
      setShowLoginModal(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors z-10"
        >
          <RxCross2 className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="p-8 pb-6 text-center bg-gradient-to-b from-blue-50/70 to-white">
          <div className="flex justify-center items-center gap-2 mb-3">
            <MiratsAnimatedLogo />
            <img src={MiratsQuantoLogo} alt="Mirats Quanto" className="h-8 object-contain" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Sign in to Mirats Quanto DIY
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access the perfect audience for research studies
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-0 space-y-4">
          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleSignIn}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all"
            >
              <FcGoogle className="w-4 h-4" />
              <span>Google SSO</span>
            </button>
            <button
              type="button"
              onClick={handleSignIn}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all"
            >
              <FaMicrosoft className="w-4 h-4 text-[#00A4EF]" />
              <span>Microsoft</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider absolute">
              or with email
            </span>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent to email', 'info'); }} className="text-[11px] font-semibold text-[#0226BE] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-[#0226BE] focus:ring-1 focus:ring-[#0226BE]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Sign In to Workspace</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[11px] text-gray-500">
              Need an enterprise account?{' '}
              <a
                href="https://accounts.miratsgroup.com/signup"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#0226BE] hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
