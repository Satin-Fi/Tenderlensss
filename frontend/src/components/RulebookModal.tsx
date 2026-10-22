import React, { useEffect, useState } from 'react';
import {
  TenderLensLogo,
  RulebookCodex,
  BisLicenceSeal,
  GeMShield,
  AuditChain,
  RupeeCoin
} from './AstraIcons';
import {
  X,
  BookOpen,
  CheckCircle,
  ShieldAlert,
  FileCode2,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { Rulebook } from '../types';
import { api } from '../services/api';

interface RulebookModalProps {
  category: string;
  onClose: () => void;
}

export const RulebookModal: React.FC<RulebookModalProps> = ({ category, onClose }) => {
  const [rulebook, setRulebook] = useState<Rulebook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getRulebook(category)
      .then((data) => setRulebook(data))
      .catch((err) => console.error("Failed to fetch rulebook:", err))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="porcelain-card bg-white rounded-[30px] max-w-2xl w-full p-7 sm:p-8 shadow-2xl border border-white/90 my-8 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#352A45]/[0.08] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEE8FA] flex items-center justify-center text-[#6750A4] p-3 shadow-xs">
              <RulebookCodex className="w-6 h-6 text-[#6750A4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#6750A4] uppercase tracking-wider bg-[#EEE8FA] px-2 py-0.5 rounded-full border border-[#6750A4]/20">
                  GFR 2017 & CVC DIRECTIVES
                </span>
                <span className="text-[10px] bg-[#E6F3EA] text-[#0D5438] px-2 py-0.5 rounded-full font-bold">
                  Rulebook v2.4
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#352A45] tracking-tight mt-0.5">
                {rulebook?.title || `${category} Statutory Standards`}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8298] hover:text-[#352A45] p-2 rounded-xl hover:bg-[#EEE8FA]/60 transition-all cursor-pointer"
            title="Close rulebook"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-[#8C8298]">
            <div className="w-8 h-8 border-2 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading statutory standard specification rules...
          </div>
        ) : !rulebook ? (
          <div className="py-12 text-center text-xs text-[#D92D20]">
            Failed to load rulebook for category: {category}
          </div>
        ) : (
          <div className="space-y-6 text-xs">
            {/* 1. Mandatory Bureau of Indian Standards (BIS) */}
            <div>
              <h4 className="font-extrabold text-[#352A45] mb-2.5 flex items-center gap-2 text-xs">
                <BisLicenceSeal className="w-4 h-4 text-[#1E8E62]" />
                <span>Mandated BIS Standards & Statutory Codes</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rulebook.applicable_is_standards?.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#352A45] text-xs font-mono">{s.code}</span>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                        s.mandatory ? 'bg-[#EEE8FA] text-[#6750A4] border border-[#6750A4]/20' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {s.mandatory ? 'MANDATORY' : 'RECOMMENDED'}
                      </span>
                    </div>
                    <p className="text-[#6C617A] text-[11px] mt-1.5 line-clamp-2 font-medium">{s.title}</p>
                    <span className="text-[10px] text-[#8C8298] mt-1.5 block font-semibold">Regulator: {s.authority}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Verification Sources Scraped */}
            <div>
              <h4 className="font-extrabold text-[#352A45] mb-2.5 flex items-center gap-2 text-xs">
                <GeMShield className="w-4 h-4 text-[#2970FF]" />
                <span>Statutory Registries Automated by Agents</span>
              </h4>
              <div className="space-y-2">
                {rulebook.verification_sources?.map((src, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06]">
                    <div>
                      <span className="font-bold text-[#352A45] text-xs">{src.name}</span>
                      <div className="text-[10px] text-[#8C8298] mt-0.5">
                        Audit Checks: {src.checks.join(' · ')}
                      </div>
                    </div>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-[#6750A4] hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Registry</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Benchmark Pricing Guidance */}
            {rulebook.benchmark_price_range && (
              <div className="p-3.5 rounded-2xl bg-[#FFF3D6]/70 border border-[#D48806]/30 text-xs">
                <div className="font-extrabold text-[#784805] mb-1 flex items-center gap-1.5">
                  <RupeeCoin className="w-4 h-4 text-[#D48806]" />
                  <span>GeM Benchmark Price Band & Collusion Threshold</span>
                </div>
                <p className="text-[#784805] text-[11px] leading-relaxed">
                  Expected unit price: <b>₹{rulebook.benchmark_price_range.min} - ₹{rulebook.benchmark_price_range.max} / {rulebook.benchmark_price_range.unit}</b>. Bids below <b>₹{rulebook.benchmark_price_range.suspect_low_threshold}</b> are flagged for price justification per CVC Vigilance Guidelines.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#352A45]/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Close Rulebook
          </button>
        </div>
      </div>
    </div>
  );
};
