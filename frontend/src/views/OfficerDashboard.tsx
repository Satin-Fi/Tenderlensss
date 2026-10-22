import React from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  RedFlagRadar,
  RupeeCoin,
  AuditChain,
  RulebookCodex,
  BisLicenceSeal,
  MetricSpark
} from '../components/AstraIcons';
import {
  Plus,
  ArrowRight,
  Filter,
  Download,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { TrafficChart } from '../components/TrafficChart';
import { MilestoneWidget } from '../components/MilestoneWidget';
import { TutorialCard } from '../components/TutorialCard';
import { Tender, User } from '../types';

interface OfficerDashboardProps {
  currentUser: User | null;
  tenders: Tender[];
  onSelectTender: (id: number) => void;
  onCreateTender: () => void;
  onOpenRulebook: (cat: string) => void;
  selectedCategory: string;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  currentUser,
  tenders,
  onSelectTender,
  onCreateTender,
  onOpenRulebook,
  selectedCategory
}) => {
  const filteredTenders = selectedCategory === 'All'
    ? tenders
    : tenders.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="porcelain-card p-6 sm:p-8 rounded-[28px] border border-white/80 bg-white/75 backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(53,42,69,0.14)]">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#EEE8FA]/60 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#E6F3EA]/50 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEE8FA] text-[#6750A4] text-xs font-bold border border-[#6750A4]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GFR 2017 & CVC Automated Procurement Compliance Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#352A45]">
              Welcome, {currentUser?.name || 'Shri A.K. Sharma'}
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7088] leading-relaxed">
              Supervising <span className="font-semibold text-[#352A45]">{currentUser?.department || 'Ministry of Jal Shakti / CPWD'}</span>. AI document scrutiny is active across 4 tenders with real-time BIS registry and MCA debarment verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRulebook('Cement')}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-[#6750A4] bg-[#EEE8FA]/80 hover:bg-[#EEE8FA] border border-[#6750A4]/25 shadow-xs hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RulebookCodex className="w-4 h-4 text-[#6750A4]" />
              <span>IS 269 Rulebook</span>
            </button>
            <button
              onClick={onCreateTender}
              className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] hover:-translate-y-0.5 active:scale-[0.99] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Ingest NIT / New Tender</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row of KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          label="Active Tenders"
          value="4"
          trend="+12%"
          trendType="positive"
          caption="Cement, Steel, PVC, Services"
          icon={<GeMShield className="w-5 h-5 text-[#2970FF]" />}
          tone="sky"
        />
        <KpiCard
          label="Bids Evaluated"
          value="8"
          trend="+28%"
          trendType="positive"
          caption="100% OCR evidence extracted"
          icon={<AiScanner className="w-5 h-5 text-[#6750A4]" />}
          tone="lavender"
        />
        <KpiCard
          label="Compliant / L1 Qualified"
          value="5"
          trend="+15%"
          trendType="positive"
          caption="Cleared against BIS & GSTIN"
          icon={<CheckCircle2 className="w-5 h-5 text-[#1E8E62]" />}
          tone="mint"
        />
        <KpiCard
          label="Disqualified / Red Flags"
          value="3"
          trend="-18%"
          trendType="negative"
          caption="2 Expired BIS, 1 Debarred DIN"
          icon={<RedFlagRadar className="w-5 h-5 text-[#D92D20]" />}
          tone="rose"
        />
      </div>

      {/* Main Grid: Chart + Right Side Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Multi-Line Scrutiny Chart */}
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>

        {/* Right 1 Col: Tutorial & Integrity Milestone Widget */}
        <div className="space-y-6">
          <TutorialCard />
          <MilestoneWidget
            title="Procurement Integrity Milestone"
            metric="₹18.5 Cr"
            description="Scrutinized 50,000 bags OPC cement against BIS IS 269 registry. Prevented ₹1.70 Cr award with expired licensing."
            milestoneLabel="Scrutiny progress to annual target"
            startLabel="₹10 Cr"
            endLabel="₹25 Cr"
            percentage={74}
            secondaryTitle="Statutory Registry Clearance Rate"
            secondaryPercentage={80}
          />
        </div>
      </div>

      {/* Bottom Data Table: Procurement Tenders Ledger */}
      <div className="porcelain-card rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(53,42,69,0.12)] overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-6 border-b border-[#352A45]/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-[#352A45] text-base">Procurement Tenders Ledger</h3>
              <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
                {filteredTenders.length} Active
              </span>
            </div>
            <p className="text-xs text-[#7A7088] mt-1">
              Filter: <span className="font-semibold text-[#352A45]">{selectedCategory}</span> · Rulebook auto-loaded for all categories
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenRulebook('Cement')}
              className="px-3.5 py-2 rounded-xl border border-[#352A45]/[0.09] bg-white hover:bg-[#F9F8FD] text-[#352A45] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <RulebookCodex className="w-4 h-4 text-[#6750A4]" />
              <span>IS Standards</span>
            </button>
            <button
              onClick={onCreateTender}
              className="px-4 py-2 rounded-xl bg-[#352A45] hover:bg-[#251D30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ New NIT</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FD] border-b border-[#352A45]/[0.06] text-[#7A7088] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-6">Tender Reference & Title</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Estimated Budget</th>
                <th className="py-3.5 px-6">Quantity</th>
                <th className="py-3.5 px-6">Scrutiny Status</th>
                <th className="py-3.5 px-6 text-right">Evaluation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#352A45]/[0.05] text-[#352A45]">
              {filteredTenders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8C8298]">
                    No tenders found matching selected filter.
                  </td>
                </tr>
              ) : (
                filteredTenders.map((t) => {
                  const isCement = t.category === 'Cement';
                  return (
                    <tr
                      key={t.id}
                      onClick={() => onSelectTender(t.id)}
                      className="hover:bg-[#EEE8FA]/25 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#352A45] group-hover:text-[#6750A4] transition-colors flex items-center gap-2">
                          <span className="text-xs">{t.title}</span>
                          {isCement && (
                            <span className="text-[9px] bg-[#EEE8FA] text-[#6750A4] px-2 py-0.5 rounded-full font-bold border border-[#6750A4]/20">
                              PRIMARY DEMO
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8C8298] font-mono mt-0.5">{t.tender_no}</div>
                      </td>
                      <td className="py-4 px-6 text-[#6C617A] font-medium">{t.department}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0EDF7] text-[#55466D] border border-[#352A45]/[0.06]">
                          {t.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-extrabold text-[#352A45]">
                        ₹{(t.budget / 10000000).toFixed(2)} Cr
                      </td>
                      <td className="py-4 px-6 text-[#6C617A]">
                        {t.quantity.toLocaleString()} {t.unit}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            t.status === 'Under Evaluation'
                              ? 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                              : t.status === 'Awarded'
                              ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                              : 'bg-[#E8F0FC] text-[#153E90] border border-[#2970FF]/30'
                          }`}
                        >
                          {t.status === 'Under Evaluation' && <Clock className="w-3 h-3 text-[#D48806]" />}
                          {t.status === 'Awarded' && <ShieldCheck className="w-3 h-3 text-[#1E8E62]" />}
                          <span>{t.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTender(t.id);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6750A4] group-hover:text-[#4D3C7C] bg-[#EEE8FA]/70 hover:bg-[#EEE8FA] px-3 py-1.5 rounded-xl border border-[#6750A4]/20 transition-all cursor-pointer"
                        >
                          <span>{t.status === 'Under Evaluation' ? 'Launch Evaluation' : 'Inspect Bids'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
