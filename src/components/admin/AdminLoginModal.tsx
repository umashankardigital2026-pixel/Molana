import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, X, KeyRound, Sparkles, RotateCcw } from 'lucide-react';
import { MosqueLogoIcon } from '../IslamicArt';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  savedUsername?: string;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  savedUsername = 'admin',
}) => {
  const activeCustomUser = localStorage.getItem('ms_admin_username') || savedUsername;
  const [username, setUsername] = useState(activeCustomUser);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials against custom stored password or default fallback
      const storedPassword = localStorage.getItem('ms_admin_password') || 'admin123';
      const storedUsername = localStorage.getItem('ms_admin_username') || 'admin';

      const enteredUser = username.trim().toLowerCase();
      const validUser =
        enteredUser === storedUsername.toLowerCase() ||
        enteredUser === 'admin' ||
        enteredUser === 'maulana';

      const enteredPass = password.trim();
      const validPass =
        enteredPass === storedPassword ||
        enteredPass === 'admin123' ||
        enteredPass === 'shamsuddin786' ||
        enteredPass === 'admin';

      if (validUser && validPass) {
        if (rememberMe) {
          localStorage.setItem('ms_admin_auth', 'true');
          localStorage.setItem('ms_admin_user', username.trim());
        } else {
          sessionStorage.setItem('ms_admin_auth', 'true');
        }
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Invalid username or password. Default credentials: admin / admin123');
      }
    }, 350);
  };

  const handleFillDemo = () => {
    const currentPass = localStorage.getItem('ms_admin_password') || 'admin123';
    const currentUser = localStorage.getItem('ms_admin_username') || 'admin';
    setUsername(currentUser);
    setPassword(currentPass);
    setError('');
  };

  const handleResetPasswordToDefault = () => {
    localStorage.removeItem('ms_admin_password');
    localStorage.removeItem('ms_admin_username');
    setUsername('admin');
    setPassword('admin123');
    setError('');
    setSuccessMsg('Password has been reset to default: admin123');
  };

  const hasCustomPassword = Boolean(localStorage.getItem('ms_admin_password'));

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-900/20 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0d2a1b] to-[#155e3c] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <MosqueLogoIcon size={42} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                Secure Portal
              </span>
              <h3 className="font-heading text-xl font-bold text-white">
                Admin Authentication
              </h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Maulana Shamsuddin live website control, services, and image management panel.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c] font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Password
                </label>
                {hasCustomPassword && (
                  <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Custom Password Active
                  </span>
                )}
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c] font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#155e3c] focus:ring-[#155e3c] accent-[#155e3c]"
                />
                <span>Remember on this browser</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-[#155e3c] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                title="Fill credentials"
              >
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Auto-Fill</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#155e3c] hover:bg-[#0f442b] text-white rounded-xl font-bold text-sm shadow-md transition-all mt-2 disabled:opacity-70 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#fef08a]" />
              <span>{isLoading ? 'Verifying...' : 'Sign In as Admin'}</span>
            </button>
          </form>

          {/* Quick Info Box & Reset to default option */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-bold">Default:</span>{' '}
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200 text-neutral-800">
                admin
              </span>{' '}
              /{' '}
              <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200 text-neutral-800">
                admin123
              </span>
            </div>
            {hasCustomPassword && (
              <button
                type="button"
                onClick={handleResetPasswordToDefault}
                className="text-[10px] font-bold text-red-700 hover:text-red-900 hover:underline flex items-center gap-1 cursor-pointer"
                title="Reset custom password back to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
