import React, { useState, useRef, useEffect } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  RulebookCodex,
  AuditChain,
  RedFlagRadar,
  VerifiedVendor,
  RupeeCoin
} from './AstraIcons';
import {
  Search,
  Bell,
  Download,
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  SlidersHorizontal,
  Sparkles,
  UserCheck,
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { User, Notification } from '../types';

interface TopBarProps {
  currentUser: User | null;
  users: User[];
  onSwitchUser: (email: string) => void;
  notifications: Notification[];
  onMarkNotificationRead: (id: number) => void;
  onOpenRulebook: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickAction?: (action: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  users,
  onSwitchUser,
  notifications,
  onMarkNotificationRead,
  onOpenRulebook,
  searchQuery,
  onSearchChange,
  onQuickAction
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isOfficer = currentUser?.role === 'officer';
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="h-16 px-6 glass-nav flex items-center justify-between border-b border-[#352A45]/[0.08] transition-all">
      {/* Search Bar with Command Hint */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#8C8298] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tenders, NITs, GSTINs, IS standards..."
            className="w-full bg-[#F5F3FA]/70 border border-[#352A45]/[0.08] rounded-xl pl-9 pr-9 py-2 text-xs text-[#352A45] placeholder-[#948A9F] focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 focus:border-[#6750A4] transition-all focus:bg-white"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-[#8C8298] bg-white border border-[#352A45]/[0.1] px-1.5 py-0.5 rounded shadow-xs">
            /
          </kbd>
        </div>

        {/* Quick Standards Shortcuts */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-[#7E738B]">
          <button
            onClick={() => onOpenRulebook('Cement')}
            className="px-2 py-1 rounded-lg hover:text-[#6750A4] hover:bg-[#EEE8FA]/60 transition-all text-[11px]"
          >
            IS 269 Cement
          </button>
          <button
            onClick={() => onOpenRulebook('TMT Steel')}
            className="px-2 py-1 rounded-lg hover:text-[#6750A4] hover:bg-[#EEE8FA]/60 transition-all text-[11px]"
          >
            IS 1786 Steel
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Report Download Button */}
        <button
          onClick={() => onQuickAction?.('report')}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#352A45]/[0.09] bg-white/80 hover:bg-white text-xs font-semibold text-[#352A45] shadow-[0_2px_8px_-3px_rgba(53,42,69,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer"
          title="Download latest PDF evaluation summary report"
        >
          <Download className="w-3.5 h-3.5 text-[#6750A4]" />
          <span>Evaluation Report</span>
        </button>

        {/* Rulebook Standards Quick Trigger */}
        <button
          onClick={() => onOpenRulebook('Cement')}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-transparent hover:border-[#352A45]/[0.08] hover:bg-white/70 text-xs font-semibold text-[#6C617A] hover:text-[#352A45] transition-all cursor-pointer"
        >
          <RulebookCodex className="w-4 h-4 text-[#6750A4]" />
          <span>GFR 2017</span>
        </button>

        {/* Notifications Bell Popover */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2 rounded-xl text-[#6C617A] hover:text-[#352A45] hover:bg-white/80 transition-all relative border border-transparent hover:border-[#352A45]/[0.08] cursor-pointer"
            title="Procurement Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D92D20] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-88 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-20px_rgba(53,42,69,0.22)] border border-[#352A45]/[0.09] p-3.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#352A45]/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#352A45]">Vigilance & Compliance Alerts</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#FDECEE] text-[#D92D20] px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => notifications.forEach(n => onMarkNotificationRead(n.id))}
                  className="text-[10px] text-[#6750A4] font-semibold hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#8C8298]">
                    No notifications in this portal
                  </div>
                ) : (
                  notifications.map((n) => {
                    const isRedFlag = n.type === 'disqualified' || n.title.toLowerCase().includes('flag') || n.title.toLowerCase().includes('reject');
                    const isSuccess = n.type === 'shortlisted' || n.type === 'approved';
                    return (
                      <div
                        key={n.id}
                        onClick={() => onMarkNotificationRead(n.id)}
                        className={`p-3 rounded-xl text-xs transition-all cursor-pointer border ${
                          n.is_read
                            ? 'bg-[#F9F8FD]/60 border-[#352A45]/[0.04] text-[#7A7088]'
                            : isRedFlag
                            ? 'bg-[#FDECEE]/80 border-[#D92D20]/25 text-[#7A170F] font-medium'
                            : isSuccess
                            ? 'bg-[#E6F3EA]/80 border-[#1E8E62]/25 text-[#0D5438] font-medium'
                            : 'bg-[#EEE8FA]/60 border-[#6750A4]/20 text-[#352A45] font-medium'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs truncate pr-2">
                            {n.title}
                          </span>
                          {!n.is_read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6750A4] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* ROLE & PERSONA SWITCHER PILL */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white border border-[#352A45]/[0.09] shadow-xs hover:border-[#6750A4]/30 hover:bg-[#FAF9FD] transition-all cursor-pointer"
          >
            <img
              src={currentUser?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
              alt="Avatar"
              className="w-7 h-7 rounded-xl object-cover ring-1 ring-[#EEE8FA]"
            />
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-[#352A45] block leading-tight truncate max-w-[130px]">
                {currentUser?.name || "Shri A.K. Sharma"}
              </span>
              <span className="text-[10px] font-semibold text-[#6750A4] block leading-tight">
                {isOfficer ? "Govt Officer" : "Vendor Portal"}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C8298] ml-0.5" />
          </button>

          {/* Switcher Dropdown */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_64px_-20px_rgba(53,42,69,0.25)] border border-[#352A45]/[0.09] p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="text-[10px] font-bold text-[#8C8298] uppercase tracking-wider px-2 py-1 mb-1.5 flex items-center justify-between">
                <span>Switch Demo Persona</span>
                <span className="text-[9px] text-[#6750A4] font-semibold">1-Click Fast Sync</span>
              </div>

              {/* Officers Section */}
              <div className="text-[10px] font-bold text-[#6750A4] px-2 mt-1 mb-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                <span>GOVERNMENT EVALUATION OFFICERS:</span>
              </div>
              <div className="space-y-1">
                {users.filter(u => u.role === 'officer').map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u.email);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                      currentUser?.email === u.email
                        ? 'bg-[#EEE8FA] text-[#6750A4] font-bold border border-[#6750A4]/20'
                        : 'hover:bg-[#F8F7FB] text-[#352A45]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs">{u.name}</div>
                      <div className="text-[10px] text-[#8C8298] truncate max-w-[210px]">{u.department}</div>
                    </div>
                    {currentUser?.email === u.email && (
                      <CheckCircle2 className="w-4 h-4 text-[#6750A4] shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Vendors Section */}
              <div className="text-[10px] font-bold text-[#1E8E62] px-2 mt-3 pt-2.5 border-t border-[#352A45]/[0.06] mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                <span>EMPANELLED BIDDERS & SUPPLIERS:</span>
              </div>
              <div className="space-y-1">
                {users.filter(u => u.role === 'vendor').map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSwitchUser(u.email);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                      currentUser?.email === u.email
                        ? 'bg-[#E6F3EA] text-[#0D5438] font-bold border border-[#1E8E62]/20'
                        : 'hover:bg-[#F8F7FB] text-[#352A45]'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-xs truncate">{u.department || u.name}</div>
                      <div className="text-[10px] text-[#8C8298] truncate">
                        {u.email.includes('vendor_b') && '✅ L1 Compliant Leader (₹365/bag)'}
                        {u.email.includes('vendor_a') && '❌ Expired BIS License (IS 269)'}
                        {u.email.includes('vendor_d') && '⚠ Red Flagged MCA Debarment'}
                        {u.email.includes('vendor_c') && '✅ L2 Compliant Supplier (₹372)'}
                      </div>
                    </div>
                    {currentUser?.email === u.email && (
                      <CheckCircle2 className="w-4 h-4 text-[#1E8E62] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
