import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, X, KeyRound, Sparkles, RotateCcw, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
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
  const [username, setUsername] = useState(() => localStorage.getItem('ms_admin_username') || savedUsername);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Brute-force protection: Lockout tracking
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  // Sync state on modal open
  useEffect(() => {
    if (isOpen) {
      const activeUser = localStorage.getItem('ms_admin_username') || savedUsername;
      setUsername(activeUser);
      setPassword('');
      setError('');
      setSuccessMsg('');
      setShowResetConfirm(false);

      // Check existing lockout
      const storedLockout = sessionStorage.getItem('ms_admin_lockout_until');
      if (storedLockout) {
        const remaining = Math.ceil((parseInt(storedLockout, 10) - Date.now()) / 1000);
        if (remaining > 0) {
          setLockoutRemaining(remaining);
        } else {
          sessionStorage.removeItem('ms_admin_lockout_until');
        }
      }
    }
  }, [isOpen, savedUsername]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const timer = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          sessionStorage.removeItem('ms_admin_lockout_until');
          sessionStorage.removeItem('ms_admin_failed_attempts');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  if (!isOpen) return null;

  const hasCustomPassword = Boolean(localStorage.getItem('ms_admin_password'));
  const storedCustomUsername = localStorage.getItem('ms_admin_username');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (lockoutRemaining > 0) {
      setError(`Security lockout active. Please wait ${lockoutRemaining} seconds before retrying.`);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const customPassword = localStorage.getItem('ms_admin_password');
      const customUsername = localStorage.getItem('ms_admin_username');

      const enteredUser = username.trim().toLowerCase();
      const enteredPass = password.trim();

      let isValid = false;

      // FULL SECURITY ENFORCEMENT:
      // If a custom password is configured, STRICTLY REQUIRE the custom password and custom username!
      // Default passwords ('admin123', 'admin', 'shamsuddin786') are STRICTLY REJECTED.
      if (customPassword) {
        const expectedUser = (customUsername || 'admin').trim().toLowerCase();
        isValid = enteredUser === expectedUser && enteredPass === customPassword;
      } else {
        // Factory default mode (no custom password set yet)
        isValid = (enteredUser === 'admin') && (enteredPass === 'admin123');
      }

      if (isValid) {
        // Clear failed attempts upon successful login
        sessionStorage.removeItem('ms_admin_failed_attempts');
        sessionStorage.removeItem('ms_admin_lockout_until');

        // Record successful login audit
        try {
          const rawLogs = localStorage.getItem('ms_admin_security_log');
          const logs = rawLogs ? JSON.parse(rawLogs) : [];
          logs.unshift({
            id: `log-${Date.now()}`,
            event: 'Successful Admin Login',
            timestamp: new Date().toLocaleString(),
            user: username.trim(),
            status: 'success',
          });
          localStorage.setItem('ms_admin_security_log', JSON.stringify(logs.slice(0, 30)));
          localStorage.setItem('ms_admin_last_login', new Date().toLocaleString());
        } catch {
          // Ignore parse errors
        }

        if (rememberMe) {
          localStorage.setItem('ms_admin_auth', 'true');
          localStorage.setItem('ms_admin_user', username.trim());
        } else {
          sessionStorage.setItem('ms_admin_auth', 'true');
        }

        setIsLoading(false);
        onLoginSuccess();
      } else {
        // Failed attempt handling & rate limiting
        const currentAttempts = parseInt(sessionStorage.getItem('ms_admin_failed_attempts') || '0', 10) + 1;
        sessionStorage.setItem('ms_admin_failed_attempts', currentAttempts.toString());

        // Log failed attempt
        try {
          const rawLogs = localStorage.getItem('ms_admin_security_log');
          const logs = rawLogs ? JSON.parse(rawLogs) : [];
          logs.unshift({
            id: `log-${Date.now()}`,
            event: 'Failed Login Attempt Blocked',
            timestamp: new Date().toLocaleString(),
            user: username.trim(),
            status: 'failed',
          });
          localStorage.setItem('ms_admin_security_log', JSON.stringify(logs.slice(0, 30)));
        } catch {
          // Ignore parse errors
        }

        setIsLoading(false);

        if (currentAttempts >= 5) {
          const lockoutDuration = 60; // 60 seconds
          const lockoutUntil = Date.now() + lockoutDuration * 1000;
          sessionStorage.setItem('ms_admin_lockout_until', lockoutUntil.toString());
          setLockoutRemaining(lockoutDuration);
          setError(`Full Security Triggered: 5 failed attempts detected. Access locked for ${lockoutDuration} seconds.`);
        } else {
          const remainingAttempts = 5 - currentAttempts;
          if (hasCustomPassword) {
            setError(`Incorrect username or password. Full security is active with a custom password. (${remainingAttempts} attempts remaining before temporary lockout)`);
          } else {
            setError(`Invalid credentials. Default administrator login is username: admin / password: admin123. (${remainingAttempts} attempts remaining)`);
          }
        }
      }
    }, 300);
  };

  const handleFillDemo = () => {
    const currentPass = localStorage.getItem('ms_admin_password') || 'admin123';
    const currentUser = localStorage.getItem('ms_admin_username') || 'admin';
    setUsername(currentUser);
    setPassword(currentPass);
    setError('');
  };

  const handleConfirmReset = () => {
    localStorage.removeItem('ms_admin_password');
    localStorage.removeItem('ms_admin_username');
    localStorage.removeItem('ms_admin_pw_updated_at');

    // Add security audit entry
    try {
      const rawLogs = localStorage.getItem('ms_admin_security_log');
      const logs = rawLogs ? JSON.parse(rawLogs) : [];
      logs.unshift({
        id: `log-${Date.now()}`,
        event: 'Credentials Reset to Default',
        timestamp: new Date().toLocaleString(),
        user: 'admin',
        status: 'reset',
      });
      localStorage.setItem('ms_admin_security_log', JSON.stringify(logs.slice(0, 30)));
    } catch {
      // Ignore
    }

    setUsername('admin');
    setPassword('admin123');
    setError('');
    setShowResetConfirm(false);
    setSuccessMsg('Security credentials successfully reset to factory defaults (Username: admin / Password: admin123).');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-900/30 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#0d2a1b] via-[#114028] to-[#155e3c] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <MosqueLogoIcon size={42} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                Full Security Portal
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

        {/* Security Notification Banner */}
        {hasCustomPassword ? (
          <div className="bg-emerald-900/90 text-emerald-100 text-[11px] px-6 py-2 flex items-center justify-between border-b border-emerald-700">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              Custom Admin Password Active & Enforced
            </span>
            <span className="text-[10px] bg-emerald-800 text-[#fef08a] px-2 py-0.5 rounded font-mono">
              Strict Mode
            </span>
          </div>
        ) : (
          <div className="bg-amber-900/80 text-amber-100 text-[11px] px-6 py-2 flex items-center justify-between border-b border-amber-700">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              Factory Default Password in Use
            </span>
            <span className="text-[10px] bg-amber-800 text-amber-200 px-2 py-0.5 rounded font-mono">
              admin123
            </span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          {lockoutRemaining > 0 && (
            <div className="p-3.5 bg-red-950 text-red-200 border border-red-500 rounded-xl text-xs font-medium flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Security Lockout Triggered</p>
                <p className="text-red-200 mt-0.5">
                  Too many incorrect attempts. Please wait <strong className="text-white font-mono">{lockoutRemaining}s</strong> before retrying.
                </p>
              </div>
            </div>
          )}

          {error && lockoutRemaining <= 0 && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">✕</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Admin Username
                </label>
                {storedCustomUsername && (
                  <span className="text-[10px] text-neutral-500 font-mono">
                    User: {storedCustomUsername}
                  </span>
                )}
              </div>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  disabled={lockoutRemaining > 0}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c] font-medium disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-neutral-700">
                  Password
                </label>
                {hasCustomPassword ? (
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Custom Password Required
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Default: admin123
                  </span>
                )}
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  disabled={lockoutRemaining > 0}
                  className="w-full pl-10 pr-11 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-[#155e3c] focus:ring-1 focus:ring-[#155e3c] font-medium disabled:opacity-50"
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
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600 font-medium select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#155e3c] focus:ring-[#155e3c] accent-[#155e3c]"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-[#155e3c] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                title="Auto-fill active credentials"
              >
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>Auto-Fill Active</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || lockoutRemaining > 0}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#155e3c] hover:bg-[#0f442b] text-white rounded-xl font-bold text-sm shadow-md transition-all mt-2 disabled:opacity-60 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#fef08a]" />
              <span>
                {lockoutRemaining > 0
                  ? `Locked (${lockoutRemaining}s)`
                  : isLoading
                  ? 'Verifying Security...'
                  : 'Sign In to Admin Panel'}
              </span>
            </button>
          </form>

          {/* Quick Info & Safe Reset Confirmation */}
          {showResetConfirm ? (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl space-y-2.5 animate-in fade-in">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="text-xs text-red-900 leading-snug">
                  <strong>Reset to Factory Defaults?</strong> This will erase your custom password and restore username: <code className="bg-red-100 px-1 rounded">admin</code> and password: <code className="bg-red-100 px-1 rounded">admin123</code>.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Yes, Reset Credentials
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50/80 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="font-bold">Default Credentials:</span>{' '}
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
                  onClick={() => setShowResetConfirm(true)}
                  className="text-[10px] font-bold text-red-700 hover:text-red-900 hover:underline flex items-center gap-1 cursor-pointer"
                  title="Reset custom password back to default"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
