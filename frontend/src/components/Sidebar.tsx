import React, { useState } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  AuditChain,
  RulebookCodex,
  VerifiedVendor,
  BisLicenceSeal,
  RupeeCoin
} from './AstraIcons';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: User | null;
  onOpenRulebook: (category: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onOpenRulebook,
  selectedCategory,
  onSelectCategory
}) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const isOfficer = currentUser?.role === 'officer';

  const categories = [
    { name: 'Cement', code: 'IS 269, IS 4031', tag: 'Full Demo', color: 'bg-[#EEE8FA] text-[#6750A4]' },
    { name: 'TMT Steel', code: 'IS 1786', tag: 'IS Standard', color: 'bg-[#E8F0FC] text-[#2970FF]' },
    { name: 'PVC Pipes', code: 'IS 4985', tag: 'IS Standard', color: 'bg-[#FFF3D6] text-[#D48806]' },
    { name: 'Services', code: 'QCBS / ISO', tag: 'GFR 2017', color: 'bg-[#E6F3EA] text-[#1E8E62]' }
  ];

  return (
    <aside className="w-68 bg-[#FBFBFE]/90 backdrop-blur-2xl border-r border-[#352A45]/[0.08] flex flex-col h-screen sticky top-0 shrink-0 select-none transition-all z-20">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[#352A45]/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6750A4] to-[#8C75AC] flex items-center justify-center text-white shadow-md shadow-[#6750A4]/25 p-2">
            <TenderLensLogo className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-[#352A45] text-[17px] tracking-tight flex items-center gap-1.5">
              TenderLens
              <span className="text-[9px] bg-[#EEE8FA] text-[#6750A4] font-bold px-1.5 py-0.5 rounded-full border border-[#6750A4]/20">
                AI PRO
              </span>
            </div>
            <div className="text-[10px] text-[#7E738B] font-medium flex items-center gap-1">
              <span>National Procurement Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {/* Main Section */}
        <div>
          <div className="text-[10px] font-bold text-[#8C8298] uppercase tracking-wider px-3 mb-2.5 flex items-center justify-between">
            <span>{isOfficer ? 'Procurement Control' : 'Supplier Desk'}</span>
            <span className="text-[9px] font-semibold text-[#1E8E62] bg-[#E6F3EA] px-1.5 py-0.5 rounded">
              {isOfficer ? 'GFR 2017' : 'Empanelled'}
            </span>
          </div>

          <nav className="space-y-1.5">
            {/* Common Dashboard */}
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                  : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
              }`}
            >
              <div className={`p-1 rounded-lg ${currentTab === 'dashboard' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                <QcbsGauge className="w-4 h-4" />
              </div>
              <span className="flex-1 text-left">Dashboard</span>
              {currentTab === 'dashboard' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#6750A4]" />
              )}
            </button>

            {isOfficer ? (
              <>
                <button
                  onClick={() => onSelectTab('upload-nit')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'upload-nit'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'upload-nit' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <AiScanner className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Upload & Ingest NIT</span>
                  <span className="text-[9px] bg-[#E6F3EA] text-[#1E8E62] font-bold px-1.5 py-0.2 rounded">
                    OCR
                  </span>
                </button>

                <button
                  onClick={() => onSelectTab('tenders')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'tenders'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'tenders' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <GeMShield className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Tender Ledger</span>
                </button>

                <button
                  onClick={() => onSelectTab('evaluation')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'evaluation'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'evaluation' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <RupeeCoin className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">QCBS Evaluation Matrix</span>
                  <span className="text-[9px] bg-[#FFF3D6] text-[#D48806] font-bold px-1.5 py-0.2 rounded">
                    L1/QCBS
                  </span>
                </button>

                <button
                  onClick={() => onSelectTab('audit-log')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'audit-log'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'audit-log' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <AuditChain className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Audit Vault</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectTab('tender-discovery')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'tender-discovery'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'tender-discovery' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <AiScanner className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Tender Discovery</span>
                  <span className="text-[9px] bg-[#E6F3EA] text-[#1E8E62] font-bold px-1.5 py-0.2 rounded">
                    Match AI
                  </span>
                </button>

                <button
                  onClick={() => onSelectTab('vendor-profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'vendor-profile'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'vendor-profile' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <VerifiedVendor className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Enterprise Profile</span>
                </button>

                <button
                  onClick={() => onSelectTab('doc-verify')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'doc-verify'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'doc-verify' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <BisLicenceSeal className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Doc Verification Vault</span>
                </button>

                <button
                  onClick={() => onSelectTab('my-applications')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    currentTab === 'my-applications'
                      ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                      : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${currentTab === 'my-applications' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                    <GeMShield className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left">Submitted Applications</span>
                </button>
              </>
            )}

            <button
              onClick={() => onSelectTab('clarifications')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                currentTab === 'clarifications'
                  ? 'bg-white text-[#352A45] shadow-[0_4px_16px_-4px_rgba(53,42,69,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] border border-[#352A45]/[0.08]'
                  : 'text-[#6C617A] hover:text-[#352A45] hover:bg-white/60'
              }`}
            >
              <div className={`p-1 rounded-lg ${currentTab === 'clarifications' ? 'bg-[#EEE8FA] text-[#6750A4]' : 'text-[#8C8298]'}`}>
                <RulebookCodex className="w-4 h-4" />
              </div>
              <span className="flex-1 text-left">Clarifications Desk</span>
            </button>
          </nav>
        </div>

        {/* TENDER CATEGORIES / GFR RULEBOOKS */}
        <div className="pt-2">
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="w-full flex items-center justify-between text-[10px] font-bold text-[#8C8298] uppercase tracking-wider px-3 mb-2.5 hover:text-[#352A45] transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6750A4]" />
              Rulebook Standards
            </span>
            {categoriesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {categoriesOpen && (
            <div className="space-y-1.5 pl-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <div
                    key={cat.name}
                    className={`group flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#EEE8FA] text-[#6750A4] font-semibold border border-[#6750A4]/20'
                        : 'text-[#6C617A] hover:bg-white/70 hover:text-[#352A45]'
                    }`}
                  >
                    <button
                      onClick={() => onSelectCategory(cat.name)}
                      className="flex-1 text-left flex items-center gap-2 truncate"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#6750A4]' : 'bg-[#D2C8E0]'}`} />
                      <span className="truncate">{cat.name}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenRulebook(cat.name);
                      }}
                      className="text-[10px] text-[#8C8298] hover:text-[#6750A4] px-2 py-0.5 rounded-lg hover:bg-white/90 border border-transparent hover:border-[#6750A4]/20 transition-all flex items-center gap-1"
                      title={`Inspect ${cat.name} GFR Rulebook`}
                    >
                      <span>Rules</span>
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => onSelectCategory('All')}
                className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  selectedCategory === 'All' ? 'text-[#6750A4]' : 'text-[#8C8298] hover:text-[#352A45]'
                }`}
              >
                ← View All Categories
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Role / Mode Badge */}
      <div className="p-4 border-t border-[#352A45]/[0.06] bg-[#F7F5FC]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#352A45]/[0.08] shadow-sm">
          <img
            src={currentUser?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
            alt="Avatar"
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#EEE8FA]"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#352A45] truncate">
              {currentUser?.name || "Shri A.K. Sharma"}
            </div>
            <div className="text-[10px] text-[#7A7088] font-medium capitalize flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isOfficer ? 'bg-[#1E8E62]' : 'bg-[#2970FF]'}`} />
              {isOfficer ? 'Govt Procurement Officer' : 'Empanelled Vendor'}
            </div>
          </div>
        </div>

        {/* Live System Telemetry Status */}
        <div className="mt-2.5 flex items-center justify-between text-[9px] text-[#8C8298] px-1 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E62] animate-pulse" />
            GeM v3.2 Synced
          </span>
          <span>Rule 144(xi) Audit</span>
        </div>
      </div>
    </aside>
  );
};
