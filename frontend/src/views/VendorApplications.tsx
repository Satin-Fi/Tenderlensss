import React, { useState, useEffect } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  VerifiedVendor,
  EvidenceLoupe,
  RupeeCoin
} from '../components/AstraIcons';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Bid, VerificationCheck } from '../types';
import { api } from '../services/api';
import { EvidenceModal } from '../components/EvidenceModal';

export const VendorApplications: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCheck, setActiveCheck] = useState<VerificationCheck | null>(null);

  useEffect(() => {
    api.getVendorApplications()
      .then(res => setBids(res))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-[#8C8298]">Loading submitted applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
              COMMERCIAL PROPOSALS REPOSITORY
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            My Submitted Tender Applications
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Real-time compliance status from Submission &rarr; Forensic Scrutiny &rarr; L1 / QCBS Standing & Award.
          </p>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] text-xs font-bold text-[#1E8E62]">
          <VerifiedVendor className="w-4 h-4 text-[#1E8E62]" />
          <span>{bids.length} Active Proposals Filed</span>
        </div>
      </div>

      {bids.length === 0 ? (
        <div className="porcelain-card p-16 rounded-[28px] border border-white/80 bg-white/70 text-center">
          <FileText className="w-10 h-10 text-[#8C8298] mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-[#352A45]">No Applications Submitted Yet</h3>
          <p className="text-xs text-[#8C8298] mt-1">Browse open notices in the Tender Discovery section to file a compliant proposal.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {bids.map((b) => {
            const isQualified = b.status === 'Qualified';
            const isDisqualified = b.status === 'Disqualified';
            const isAwarded = b.status === 'Awarded';
            const isRedFlag = b.status === 'Red Flagged';

            return (
              <div
                key={b.id}
                className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-5"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#352A45]/[0.06]">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#6750A4] bg-[#EEE8FA] px-2 py-0.5 rounded-md">
                        App #{b.id}
                      </span>
                      <span className="text-xs font-semibold text-[#8C8298]">
                        Tender ID: #{b.tender_id}
                      </span>
                      {b.rank && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30 flex items-center gap-1">
                          <Award className="w-3 h-3 text-[#1E8E62]" />
                          RANKED {b.rank}
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-[#352A45] text-base">
                      Ordinary Portland Cement (OPC 43 Grade) Supply
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full ${
                        isAwarded
                          ? 'bg-[#EEE8FA] text-[#6750A4] border border-[#6750A4]/30'
                          : isQualified
                          ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                          : isDisqualified
                          ? 'bg-[#FDECEE] text-[#7A170F] border border-[#D92D20]/30'
                          : isRedFlag
                          ? 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isAwarded && <Award className="w-3.5 h-3.5" />}
                      {isQualified && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isDisqualified && <XCircle className="w-3.5 h-3.5" />}
                      {isRedFlag && <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{b.status.toUpperCase()}</span>
                    </span>
                  </div>
                </div>

                {/* Financial Quotation Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] text-xs">
                  <div>
                    <span className="text-[#8C8298] text-[10px] font-bold uppercase block">Quoted Unit Rate</span>
                    <span className="text-base font-extrabold text-[#352A45]">
                      ₹{b.price_per_unit.toFixed(2)}
                      <span className="text-[11px] text-[#8C8298] font-normal"> / bag</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8C8298] text-[10px] font-bold uppercase block">Total Proposal Amount</span>
                    <span className="font-extrabold text-[#1E8E62] text-sm">
                      ₹{(b.total_amount / 10000000).toFixed(2)} Cr
                    </span>
                  </div>
                  <div>
                    <span className="text-[#8C8298] text-[10px] font-bold uppercase block">Delivery Commitment</span>
                    <span className="font-extrabold text-[#352A45] text-xs">{b.delivery_days} calendar days</span>
                  </div>
                  <div>
                    <span className="text-[#8C8298] text-[10px] font-bold uppercase block">Submitted On</span>
                    <span className="font-semibold text-[#352A45]">{new Date(b.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Statutory Scrutiny Findings */}
                {b.checks && b.checks.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#8C8298] uppercase tracking-wider block">
                      Autonomous Scrutiny Checks On Your Submission:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {b.checks.map((chk) => (
                        <div
                          key={chk.id}
                          className="p-3 rounded-xl bg-white border border-[#352A45]/[0.08] flex items-center justify-between"
                        >
                          <div className="truncate pr-2">
                            <span className="font-bold text-[#352A45] block truncate">{chk.check_name}</span>
                            <span className="text-[10px] text-[#8C8298]">{chk.source_name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                chk.verdict === 'Pass'
                                  ? 'bg-[#E6F3EA] text-[#0D5438]'
                                  : chk.verdict === 'Fail'
                                  ? 'bg-[#FDECEE] text-[#7A170F]'
                                  : 'bg-[#FFF3D6] text-[#784805]'
                              }`}
                            >
                              {chk.verdict}
                            </span>
                            <button
                              onClick={() => setActiveCheck(chk)}
                              className="p-1 text-[#6750A4] hover:bg-[#EEE8FA] rounded-md transition-colors cursor-pointer"
                              title="Inspect evidence screenshot"
                            >
                              <EvidenceLoupe className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Evidence Modal */}
      {activeCheck && (
        <EvidenceModal
          check={activeCheck}
          onClose={() => setActiveCheck(null)}
        />
      )}
    </div>
  );
};
