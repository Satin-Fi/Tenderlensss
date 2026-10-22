import React from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  VerifiedVendor,
  BisLicenceSeal,
  RupeeCoin,
  MetricSpark
} from '../components/AstraIcons';
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { TrafficChart } from '../components/TrafficChart';
import { MilestoneWidget } from '../components/MilestoneWidget';
import { TutorialCard } from '../components/TutorialCard';
import { VendorProfile, Tender, Bid, Notification } from '../types';

interface VendorDashboardProps {
  profile: VendorProfile | null;
  tenders: Tender[];
  bids: Bid[];
  notifications: Notification[];
  onNavigateTab: (tab: string) => void;
  onApplyTender: (tenderId: number) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({
  profile,
  tenders,
  bids,
  notifications,
  onNavigateTab,
  onApplyTender
}) => {
  const companyName = profile?.company_name || "UltraTech Cement Infrastructure Ltd";
  const completeness = profile?.completeness_pct || 95;

  const qualifiedBids = bids.filter(b => b.status === 'Qualified');
  const openTenders = tenders.filter(t => t.status === 'Published' || t.status === 'Bids Open');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="porcelain-card p-6 sm:p-8 rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(53,42,69,0.14)]">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#E6F3EA]/70 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#EEE8FA]/60 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F3EA] text-[#0D5438] text-xs font-bold border border-[#1E8E62]/20">
              <VerifiedVendor className="w-4 h-4 text-[#1E8E62]" />
              <span>GeM Empanelled Class-1 Local Supplier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#352A45]">
              {companyName}
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7088] leading-relaxed">
              GSTIN: <span className="font-mono font-bold text-[#352A45]">{profile?.gstin || "07AABCU9603R1ZM"}</span> · CIN: <span className="font-mono text-[#6750A4] font-semibold">{profile?.cin || "L26940MH2000PLC128420"}</span> · BIS IS:269 Validated
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('tender-discovery')}
              className="px-6 py-3 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] flex items-center gap-2.5 transition-all cursor-pointer active:scale-[0.99]"
            >
              <AiScanner className="w-4 h-4 text-white" />
              <span>Discover AI-Matched Tenders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          label="Tenders Matched"
          value="14"
          trend="+76%"
          trendType="positive"
          caption="high eligibility match"
          icon={<AiScanner className="w-5 h-5 text-[#6750A4]" />}
          tone="lavender"
        />
        <KpiCard
          label="Active Bids"
          value={bids.length || 4}
          trend="+32%"
          trendType="positive"
          caption="in evaluation queue"
          icon={<FileText className="w-5 h-5 text-[#2970FF]" />}
          tone="sky"
        />
        <KpiCard
          label="Shortlisted / Ranked L1"
          value={qualifiedBids.length || 2}
          trend="+100%"
          trendType="positive"
          caption="statutory compliant"
          icon={<CheckCircle2 className="w-5 h-5 text-[#1E8E62]" />}
          tone="mint"
        />
        <KpiCard
          label="Document Clearance"
          value={`${completeness}%`}
          trend="5/5"
          trendType="positive"
          caption="BIS, GST & MCA clear"
          icon={<BisLicenceSeal className="w-5 h-5 text-[#D48806]" />}
          tone="butter"
        />
      </div>

      {/* Chart + Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>

        <div className="space-y-6">
          <TutorialCard />
          <MilestoneWidget
            title="Enterprise Credential Milestone"
            metric={`${completeness}% Complete`}
            description="All mandatory IS codes verified on BIS Manakonline. GST returns filed without red flags."
            milestoneLabel="Statutory Profile Verification"
            startLabel="0%"
            endLabel="100%"
            percentage={completeness}
            secondaryTitle="Turnover Eligibility Index"
            secondaryPercentage={92}
          />
        </div>
      </div>

      {/* Open Tenders Matching Vendor Profile */}
      <div className="porcelain-card rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(53,42,69,0.12)] overflow-hidden">
        <div className="p-6 border-b border-[#352A45]/[0.06] flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-[#352A45] text-base">
              Recommended Procurement Notices For Your Entity
            </h3>
            <p className="text-xs text-[#7A7088] mt-0.5">
              Filtered for your category capacity ({profile?.categories_supplied?.join(', ') || 'Cement, Concrete'})
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('tender-discovery')}
            className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tenders.slice(0, 4).map((t) => (
            <div
              key={t.id}
              className="porcelain-card porcelain-card-hover p-5 rounded-2xl border border-white/90 bg-white/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8C8298] font-bold">{t.tender_no}</span>
                <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/20">
                  96% Eligibility Match
                </span>
              </div>
              <h4 className="font-extrabold text-xs text-[#352A45] line-clamp-2">
                {t.title}
              </h4>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#352A45]/[0.05]">
                <span className="font-extrabold text-[#1E8E62]">
                  Budget: ₹{(t.budget / 10000000).toFixed(2)} Cr
                </span>
                <button
                  onClick={() => onApplyTender(t.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#EEE8FA] hover:bg-[#6750A4] hover:text-white text-[#6750A4] text-xs font-bold transition-all cursor-pointer"
                >
                  Apply Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
