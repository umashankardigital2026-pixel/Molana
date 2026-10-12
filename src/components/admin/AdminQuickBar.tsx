import React, { useState } from 'react';
import { Shield, LayoutDashboard, Image as ImageIcon, Puzzle, LogOut, ChevronUp, ChevronDown, Bell, Eye } from 'lucide-react';
import { EnquiryItem } from '../../types';

interface AdminQuickBarProps {
  isAuthenticated: boolean;
  onOpenAdmin: (tab?: any) => void;
  onLogout: () => void;
  enquiries: EnquiryItem[];
  showAllImages: boolean;
  onToggleImages: () => void;
}

export const AdminQuickBar: React.FC<AdminQuickBarProps> = ({
  isAuthenticated,
  onOpenAdmin,
  onLogout,
  enquiries,
  showAllImages,
  onToggleImages,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isAuthenticated) return null;

  const newCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div
      aria-label="Admin Extension Quick Bar"
      className="fixed bottom-4 left-4 z-40 flex flex-col items-start pointer-events-auto transition-all duration-300"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 bg-[#0b1a12] text-[#fde047] rounded-full shadow-2xl border border-[#d4af37]/60 hover:scale-105 transition-all group"
          title="Expand Admin Quick Bar"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <Shield className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-bold font-mono">Admin Active</span>
          {newCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
              {newCount}
            </span>
          )}
          <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
        </button>
      ) : (
        <div className="bg-[#0b1a12]/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-[#d4af37]/50 p-2 sm:p-2.5 flex items-center gap-2 max-w-[95vw] sm:max-w-none flex-wrap animate-in slide-in-from-bottom duration-200">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-xl text-xs font-bold text-[#d4af37]">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Admin Mode</span>
          </div>

          {/* New Enquiries Counter */}
          <button
            onClick={() => onOpenAdmin('enquiries')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              newCount > 0
                ? 'bg-amber-500/20 text-[#fde047] border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
            title="View Enquiries"
          >
            <Bell className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{newCount} Leads</span>
          </button>

          {/* Toggle Images */}
          <button
            onClick={onToggleImages}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-medium text-emerald-300 border border-emerald-500/20 transition-all"
            title={showAllImages ? 'Hide All Site Images' : 'Show All Site Images'}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{showAllImages ? 'Images: ON' : 'Images: OFF'}</span>
          </button>

          {/* Open Extension Studio */}
          <button
            onClick={() => onOpenAdmin('extension')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#155e3c] hover:bg-[#0f442b] text-white text-xs font-bold shadow-xs transition-all"
            title="Download & Manage Admin Extension"
          >
            <Puzzle className="w-3.5 h-3.5 text-[#fde047]" />
            <span>Extension</span>
          </button>

          {/* Open Full Admin Portal */}
          <button
            onClick={() => onOpenAdmin('dashboard')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#d4af37] hover:bg-[#b89324] text-[#0b1a12] text-xs font-bold shadow-xs transition-all"
            title="Open Admin Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold border border-red-500/30 transition-all"
            title="Logout Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Minimize button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors ml-1"
            title="Minimize bar"
            aria-label="Minimize bar"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
