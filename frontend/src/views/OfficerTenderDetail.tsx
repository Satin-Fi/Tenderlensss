import React, { useState, useEffect } from 'react';
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
  EvidenceLoupe,
  VerifiedVendor,
  MetricSpark
} from '../components/AstraIcons';
import {
  ArrowLeft,
  Play,
  Download,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Award,
  Layers,
  Send,
  Building2,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { Tender, Bid, VerificationCheck } from '../types';
import { api } from '../services/api';
import { EvidenceModal } from '../components/EvidenceModal';
import { ClarificationModal } from '../components/ClarificationModal';

interface OfficerTenderDetailProps {
  tenderId: number;
  onBack: () => void;
  onOpenRulebook: (cat: string) => void;
}

export const OfficerTenderDetail: React.FC<OfficerTenderDetailProps> = ({
  tenderId,
  onBack,
  onOpenRulebook
}) => {
  const [tender, setTender] = useState<Tender | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [evalProgress, setEvalProgress] = useState<number>(0);
  const [agentStep, setAgentStep] = useState<string>('');

  // Expandable bidder cards
  const [expandedBidId, setExpandedBidId] = useState<number | null>(null);

  // Modals
  const [activeCheckForEvidence, setActiveCheckForEvidence] = useState<VerificationCheck | null>(null);
  const [clarificationData, setClarificationData] = useState<{ bidId: number; vendorId: number; vendorName: string } | null>(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('Approved based on AI verification compliance and L1 pricing per GFR 2017 norms.');

  const loadData = async () => {
    try {
      const [tData, bData] = await Promise.all([
        api.getTender(tenderId),
        api.getTenderBids(tenderId)
      ]);
      setTender(tData);
      setBids(bData);
    } catch (e) {
      console.error("Failed to load tender:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tenderId]);

  const handleRunEvaluation = async () => {
    setEvaluating(true);
    setEvalProgress(10);
    setAgentStep('Forensic Scrutiny: Ingesting NIT parameters & activating verification agents...');

    setTimeout(() => {
      setEvalProgress(35);
      setAgentStep('Licence Agent: Verifying Bureau of Indian Standards (BIS Manakonline)...');
    }, 600);

    setTimeout(() => {
      setEvalProgress(65);
      setAgentStep('Company & Tax Agent: Cross-referencing GSTIN active status & MCA21...');
    }, 1200);

    setTimeout(() => {
      setEvalProgress(85);
      setAgentStep('Vigilance Agent: Scanning CVC Debarment register & GeM collusion graph...');
    }, 1800);

    setTimeout(async () => {
      try {
        await api.runEvaluation(tenderId);
        setEvalProgress(100);
        setAgentStep('Deterministic Compliance Engine: Finalizing L1 / QCBS ranking!');
        await loadData();
      } catch (e) {
        console.error("Evaluation error:", e);
      } finally {
        setTimeout(() => setEvaluating(false), 500);
      }
    }, 2400);
  };

  const handleApproveTender = async () => {
    try {
      await api.approveTender(tenderId, { notes: approvalNotes });
      setApprovalModalOpen(false);
      await loadData();
    } catch (e) {
      console.error("Failed to approve tender:", e);
    }
  };

  const handleDownloadReport = () => {
    window.open(`/api/tenders/${tenderId}/report`, '_blank');
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-3 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-[#8C8298]">Ingesting statutory evidence & verification ledgers...</p>
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="py-20 text-center text-xs font-bold text-[#D92D20]">
        Tender record not found.
      </div>
    );
  }

  const qualifiedBids = bids.filter(b => b.status === 'Qualified');
  const disqualifiedBids = bids.filter(b => b.status === 'Disqualified');
  const redFlaggedBids = bids.filter(b => b.status === 'Red Flagged');

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Row */}
      <div className="porcelain-card p-5 sm:p-6 rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl text-[#7E738B] hover:text-[#352A45] hover:bg-[#EEE8FA]/60 border border-transparent hover:border-[#352A45]/[0.08] transition-all cursor-pointer"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold text-[#6750A4] bg-[#EEE8FA] px-2 py-0.5 rounded-md">
                {tender.tender_no}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0EDF7] text-[#55466D] border border-[#352A45]/[0.08]">
                {tender.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tender.status === 'Awarded'
                    ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                    : 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                }`}
              >
                {tender.status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] mt-1 tracking-tight">
              {tender.title}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenRulebook(tender.category)}
            className="px-3.5 py-2 rounded-xl border border-[#352A45]/[0.1] bg-white text-[#352A45] hover:bg-[#FAF9FD] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <RulebookCodex className="w-4 h-4 text-[#6750A4]" />
            <span>Rulebook</span>
          </button>
          <button
            onClick={handleDownloadReport}
            className="px-3.5 py-2 rounded-xl border border-[#352A45]/[0.1] bg-white text-[#352A45] hover:bg-[#FAF9FD] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#6750A4]" />
            <span>Official PDF Report</span>
          </button>
          {tender.status !== 'Awarded' && (
            <button
              onClick={() => setApprovalModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1E8E62] to-[#126846] hover:brightness-105 text-white text-xs font-bold shadow-[0_6px_16px_-4px_rgba(30,142,98,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Confirm Award</span>
            </button>
          )}
        </div>
      </div>

      {/* Tender Metadata Strip */}
      <div className="porcelain-card p-6 rounded-[24px] border border-white/80 bg-white/75 backdrop-blur-xl shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-5 text-xs">
        <div>
          <span className="text-[#8C8298] font-bold uppercase tracking-wider text-[10px] block mb-1">Procuring Department</span>
          <span className="font-extrabold text-[#352A45] text-xs">{tender.department}</span>
        </div>
        <div>
          <span className="text-[#8C8298] font-bold uppercase tracking-wider text-[10px] block mb-1">Contract Quantity</span>
          <span className="font-extrabold text-[#352A45] text-xs">{tender.quantity.toLocaleString()} {tender.unit}</span>
        </div>
        <div>
          <span className="text-[#8C8298] font-bold uppercase tracking-wider text-[10px] block mb-1">Estimated Budget</span>
          <span className="font-extrabold text-[#352A45] text-sm text-[#1E8E62]">₹{(tender.budget / 10000000).toFixed(2)} Cr</span>
        </div>
        <div>
          <span className="text-[#8C8298] font-bold uppercase tracking-wider text-[10px] block mb-1">Evaluation Framework</span>
          <span className="font-extrabold text-[#6750A4] text-xs flex items-center gap-1">
            <QcbsGauge className="w-3.5 h-3.5" />
            {tender.evaluation_method} ({tender.evaluation_method === 'QCBS' ? '70% Tech / 30% Fin' : 'Lowest L1 Compliant'})
          </span>
        </div>
      </div>

      {/* EVALUATION RUNNER HERO */}
      <div className="porcelain-card p-7 sm:p-8 rounded-[28px] border border-white/80 bg-gradient-to-br from-[#2D2140] to-[#1A1226] text-white shadow-[0_24px_60px_-24px_rgba(45,33,64,0.45)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#6750A4]/30 to-[#2970FF]/20 rounded-full blur-3xl -z-0" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EEE8FA] text-xs font-bold border border-white/10">
              <AiScanner className="w-4 h-4 text-[#8C75AC]" />
              <span>Multi-Agent Autonomous Verification Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Deterministic Statutory Scrutiny Pipeline
            </h2>
            <p className="text-xs text-[#D8CFE6] leading-relaxed">
              "Verify the vendor's claims with court-admissible evidence." Runs parallel verification against BIS Manakonline, GST Portal, MCA21 Company Registry, and the GeM Benchmark Price Graph.
            </p>
          </div>

          <button
            onClick={handleRunEvaluation}
            disabled={evaluating}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#6750A4] to-[#8C75AC] hover:brightness-110 text-white text-xs font-extrabold shadow-[0_8px_24px_rgba(103,80,164,0.4)] flex items-center gap-2.5 transition-all shrink-0 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{evaluating ? 'Agents Scrutinizing Claims...' : 'Trigger Live AI Scrutiny Pipeline'}</span>
          </button>
        </div>

        {/* Live Pipeline Progress Indicator */}
        {evaluating && (
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 relative z-10 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-xs font-semibold text-[#EEE8FA]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E8E62] animate-ping" />
                {agentStep}
              </span>
              <span className="font-mono text-[#FFF3D6] font-bold">{evalProgress}%</span>
            </div>
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[#1E8E62] via-[#2970FF] to-[#6750A4] h-full transition-all duration-300 rounded-full"
                style={{ width: `${evalProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* EVALUATION RESULTS & RANKING CARDS */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-[#352A45] text-base">
              Bid Submissions & Statutory Standing ({bids.length} Bidders)
            </h3>
            <p className="text-xs text-[#8C8298]">Ranked deterministically per GFR 2017 & Rule 144(xi)</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#0D5438] font-bold bg-[#E6F3EA] px-3 py-1 rounded-full border border-[#1E8E62]/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E62]" />
              {qualifiedBids.length} Qualified
            </span>
            <span className="text-[#7A170F] font-bold bg-[#FDECEE] px-3 py-1 rounded-full border border-[#D92D20]/30 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-[#D92D20]" />
              {disqualifiedBids.length} Disqualified
            </span>
            <span className="text-[#784805] font-bold bg-[#FFF3D6] px-3 py-1 rounded-full border border-[#D48806]/30 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D48806]" />
              {redFlaggedBids.length} Red Flags
            </span>
          </div>
        </div>

        {/* Bidder Cards */}
        <div className="space-y-4">
          {bids.map((bid) => {
            const isQualified = bid.status === 'Qualified';
            const isDisqualified = bid.status === 'Disqualified';
            const isRedFlag = bid.status === 'Red Flagged';
            const isExpanded = expandedBidId === bid.id;
            const isL1 = bid.rank === 'L1';

            return (
              <div
                key={bid.id}
                className={`porcelain-card rounded-[26px] border transition-all overflow-hidden ${
                  isL1
                    ? 'border-[#1E8E62]/40 bg-white/95 shadow-[0_12px_36px_-12px_rgba(30,142,98,0.22)]'
                    : isQualified
                    ? 'border-[#1E8E62]/25 bg-white/85 shadow-sm'
                    : isDisqualified
                    ? 'border-[#D92D20]/25 bg-white/80 shadow-sm'
                    : 'border-[#D48806]/25 bg-white/80 shadow-sm'
                }`}
              >
                {/* Main Card Header */}
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm ${
                        isL1
                          ? 'bg-gradient-to-br from-[#1E8E62] to-[#126846] text-white ring-4 ring-[#E6F3EA]'
                          : isQualified
                          ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                          : isDisqualified
                          ? 'bg-[#FDECEE] text-[#7A170F] border border-[#D92D20]/30'
                          : 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                      }`}
                    >
                      {bid.rank || (isDisqualified ? 'DISQ' : 'FLAG')}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="font-extrabold text-[#352A45] text-base">{bid.vendor_name}</h4>
                        <span className="text-[11px] font-mono text-[#8C8298] bg-[#F5F4F9] px-2 py-0.5 rounded-md border border-[#352A45]/[0.08]">
                          {bid.vendor_gstin}
                        </span>
                        {isL1 && (
                          <span className="text-[10px] font-extrabold bg-[#E6F3EA] text-[#0D5438] px-2.5 py-0.5 rounded-full border border-[#1E8E62]/30 flex items-center gap-1 shadow-2xs">
                            <Award className="w-3.5 h-3.5 text-[#1E8E62]" />
                            RECOMMENDED L1 WINNER
                          </span>
                        )}
                      </div>

                      {/* Disqualification / Red Flag Reasons inline preview */}
                      {isDisqualified && bid.disqualification_reasons?.length > 0 && (
                        <div className="text-xs text-[#D92D20] font-semibold flex items-center gap-1.5 pt-0.5">
                          <XCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{bid.disqualification_reasons[0]}</span>
                        </div>
                      )}

                      {isRedFlag && bid.red_flag_reasons?.length > 0 && (
                        <div className="text-xs text-[#D48806] font-semibold flex items-center gap-1.5 pt-0.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{bid.red_flag_reasons[0]}</span>
                        </div>
                      )}

                      {isQualified && (
                        <div className="text-xs text-[#1E8E62] font-semibold flex items-center gap-1.5 pt-0.5">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>All IS 269 mandatory specifications & MCA solvency criteria verified.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financial & Delivery Details */}
                  <div className="flex items-center gap-6 justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-[#352A45]/[0.06]">
                    <div>
                      <div className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider">Quoted Unit Rate</div>
                      <div className="text-lg font-extrabold text-[#352A45]">
                        ₹{bid.price_per_unit.toFixed(2)}
                        <span className="text-xs text-[#8C8298] font-normal"> / bag</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider">Total Amount</div>
                      <div className="text-sm font-extrabold text-[#352A45]">
                        ₹{(bid.total_amount / 10000000).toFixed(2)} Cr
                      </div>
                    </div>

                    <div>
                      <div className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider">Delivery</div>
                      <div className="text-xs font-bold text-[#352A45]">{bid.delivery_days} days</div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => setExpandedBidId(isExpanded ? null : bid.id)}
                      className="p-2.5 rounded-xl bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] transition-all cursor-pointer border border-[#352A45]/[0.06]"
                      title="Inspect evidence and checks"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* EXPANDED REQUIREMENT-BY-REQUIREMENT & EVIDENCE BREAKDOWN */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-3 border-t border-[#352A45]/[0.06] space-y-5 bg-[#FAF9FD]/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#352A45] uppercase tracking-wider">
                          Autonomous Registry Findings & Evidence Citations
                        </span>
                        <span className="text-[10px] font-semibold text-[#6750A4] bg-[#EEE8FA] px-2 py-0.5 rounded-full">
                          Court Admissible OCR Evidence
                        </span>
                      </div>

                      <button
                        onClick={() => setClarificationData({
                          bidId: bid.id,
                          vendorId: bid.vendor_id,
                          vendorName: bid.vendor_name
                        })}
                        className="text-xs font-bold text-[#6750A4] hover:text-[#4D3C7C] bg-white px-3 py-1.5 rounded-xl border border-[#6750A4]/25 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Issue Official Clarification</span>
                      </button>
                    </div>

                    {/* Checks Table */}
                    <div className="overflow-x-auto border border-[#352A45]/[0.08] rounded-2xl bg-white shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF9FD] border-b border-[#352A45]/[0.06] text-[#7A7088] font-bold text-[10px] uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Verification Check</th>
                            <th className="py-3 px-4">Source Registry</th>
                            <th className="py-3 px-4">Verdict</th>
                            <th className="py-3 px-4">Detailed Scrutiny Finding</th>
                            <th className="py-3 px-4 text-right">Proof Evidence</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#352A45]/[0.05] text-[#352A45]">
                          {bid.checks?.map((chk) => (
                            <tr key={chk.id} className="hover:bg-[#EEE8FA]/20 transition-colors">
                              <td className="py-3 px-4 font-bold text-[#352A45]">
                                {chk.check_name}
                              </td>
                              <td className="py-3 px-4 text-[#6C617A]">
                                <span className="font-mono text-[11px] bg-[#F4F3F8] px-2 py-0.5 rounded border border-[#352A45]/[0.06]">
                                  {chk.source_name}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    chk.verdict === 'Pass'
                                      ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                                      : chk.verdict === 'Fail'
                                      ? 'bg-[#FDECEE] text-[#7A170F] border border-[#D92D20]/30'
                                      : 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                                  }`}
                                >
                                  {chk.verdict}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-[#6C617A] max-w-sm" title={chk.reason}>
                                {chk.reason}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => setActiveCheckForEvidence(chk)}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6750A4] hover:text-[#4D3C7C] bg-[#EEE8FA]/80 hover:bg-[#EEE8FA] px-2.5 py-1 rounded-lg border border-[#6750A4]/20 transition-all cursor-pointer"
                                >
                                  <EvidenceLoupe className="w-3.5 h-3.5" />
                                  <span>Inspect Reticle</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Claimed specs vs Tender Checklist */}
                    <div>
                      <div className="text-[10px] font-bold text-[#8C8298] mb-2 uppercase tracking-wider">
                        Technical Specifications Claimed vs Tender Requirement Checklist
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        {Object.entries(bid.technical_specs || {}).map(([param, val]) => (
                          <div key={param} className="p-3 rounded-xl bg-white border border-[#352A45]/[0.08] shadow-2xs">
                            <span className="text-[10px] text-[#8C8298] font-semibold capitalize block truncate">
                              {param.replace(/_/g, ' ')}
                            </span>
                            <span className="font-extrabold text-[#352A45] text-xs mt-0.5 block">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* OFFICER APPROVAL MODAL */}
      {approvalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="porcelain-card bg-white rounded-[28px] max-w-lg w-full p-7 shadow-2xl border border-white/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[#E6F3EA] text-[#1E8E62]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#352A45] text-base">Confirm Contract Award & File Noting</h3>
                <p className="text-xs text-[#8C8298]">Rule 173 GFR 2017 Commercial Award</p>
              </div>
            </div>

            <p className="text-xs text-[#6C617A] mb-4 leading-relaxed">
              Confirming tender award for <b>{tender.tender_no}</b> awards the contract to the compliant L1 bidder (<span className="font-bold text-[#1E8E62]">{qualifiedBids[0]?.vendor_name || 'L1 Bidder'}</span>) and issues an immutable audit entry.
            </p>

            <label className="text-xs font-bold text-[#352A45] mb-1.5 block">
              Official File Noting / Approval Minutes:
            </label>
            <textarea
              rows={4}
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-[#352A45]/[0.12] bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 text-[#352A45] font-medium"
            />

            <div className="mt-6 pt-4 border-t border-[#352A45]/[0.08] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveTender}
                className="px-5 py-2.5 bg-gradient-to-r from-[#1E8E62] to-[#126846] hover:brightness-105 text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer"
              >
                Sign & Authorize Award
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Screenshot Modal */}
      {activeCheckForEvidence && (
        <EvidenceModal
          check={activeCheckForEvidence}
          onClose={() => setActiveCheckForEvidence(null)}
        />
      )}

      {/* Clarification Drafter Modal */}
      {clarificationData && (
        <ClarificationModal
          tenderId={tender.id}
          bidId={clarificationData.bidId}
          vendorId={clarificationData.vendorId}
          vendorName={clarificationData.vendorName}
          onClose={() => setClarificationData(null)}
          onSuccess={() => alert("Clarification query successfully dispatched to vendor's inbox!")}
        />
      )}
    </div>
  );
};
