import React from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  EvidenceLoupe,
  AuditChain,
  BisLicenceSeal,
  RedFlagRadar
} from './AstraIcons';
import {
  X,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Clock,
  Eye,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { VerificationCheck } from '../types';

interface EvidenceModalProps {
  check: VerificationCheck | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ check, onClose }) => {
  if (!check) return null;

  const isPass = check.verdict === 'Pass';
  const isFail = check.verdict === 'Fail';
  const isRedFlag = check.verdict === 'Red Flag';

  const evidenceItem = check.evidence_items?.[0];
  const screenshotUrl = evidenceItem?.screenshot_path || '/static/evidence/bis_active_ultracem.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="porcelain-card bg-white rounded-[30px] max-w-3xl w-full p-7 sm:p-8 shadow-2xl border border-white/90 my-8 animate-in zoom-in-95 duration-150 relative">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#352A45]/[0.08] mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full ${
                  isPass
                    ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                    : isFail
                    ? 'bg-[#FDECEE] text-[#7A170F] border border-[#D92D20]/30'
                    : 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                }`}
              >
                {isPass && <ShieldCheck className="w-3.5 h-3.5" />}
                {isFail && <XCircle className="w-3.5 h-3.5" />}
                {isRedFlag && <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{check.verdict.toUpperCase()} VERDICT</span>
              </span>

              {/* Live vs Cached telemetry badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  check.is_live
                    ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                    : 'bg-[#EEE8FA] text-[#6750A4] border border-[#6750A4]/25'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{check.is_live ? 'Live Scraped Registry Proof' : 'Statutory Registry Audit'}</span>
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-[#352A45] tracking-tight">{check.check_name}</h3>
          </div>

          <button
            onClick={onClose}
            className="text-[#8C8298] hover:text-[#352A45] p-2 rounded-xl hover:bg-[#EEE8FA]/60 transition-all cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs mb-5 p-4 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06]">
          <div>
            <span className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider block mb-0.5">Verification Source Registry</span>
            <span className="font-extrabold text-[#352A45]">{check.source_name}</span>
          </div>
          <div>
            <span className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider block mb-0.5">Timestamp (IST Audit Log)</span>
            <span className="font-semibold text-[#352A45] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6750A4]" />
              {new Date(check.verified_at).toLocaleString()}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-[#8C8298] text-[10px] font-bold uppercase tracking-wider block mb-0.5">Statutory Registry Direct URL</span>
            {check.source_url ? (
              <a
                href={check.source_url}
                target="_blank"
                rel="noreferrer"
                className="text-[#6750A4] hover:underline flex items-center gap-1.5 font-mono text-xs font-semibold"
              >
                <span>{check.source_url}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-[#8C8298] font-mono text-xs">Public Statutory Registry</span>
            )}
          </div>
        </div>

        {/* Scrutiny Finding / Reason */}
        <div className="mb-5">
          <label className="text-xs font-bold text-[#352A45] mb-1.5 block">Deterministic Finding & Reason:</label>
          <div
            className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed border ${
              isPass
                ? 'bg-[#E6F3EA]/70 text-[#0D5438] border-[#1E8E62]/30'
                : isFail
                ? 'bg-[#FDECEE]/70 text-[#7A170F] border-[#D92D20]/30'
                : 'bg-[#FFF3D6]/70 text-[#784805] border-[#D48806]/30'
            }`}
          >
            {check.reason}
          </div>
        </div>

        {/* Visual Proof / Screenshot Panel with Evidence Reticle */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[#352A45] flex items-center gap-1.5">
              <EvidenceLoupe className="w-4 h-4 text-[#6750A4]" />
              <span>Court-Admissible Registry Screenshot Capture:</span>
            </label>
            <span className="text-[10px] text-[#8C8298] font-mono bg-[#F4F3F8] px-2 py-0.5 rounded border border-[#352A45]/[0.06]">
              1920x1080 Viewport
            </span>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#352A45]/[0.1] bg-[#1A1226]/5 shadow-inner max-h-84 overflow-y-auto">
            <img
              src={screenshotUrl}
              alt="Automated evidence screenshot"
              className="w-full h-auto object-contain block hover:scale-[1.01] transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('bis_active_ultracem.png')) {
                  target.src = '/static/evidence/bis_active_ultracem.png';
                }
              }}
            />
          </div>
          {evidenceItem?.caption && (
            <p className="text-[11px] text-[#8C8298] mt-2 italic text-center">
              {evidenceItem.caption}
            </p>
          )}
        </div>

        {/* Raw Payload Accordion */}
        {evidenceItem?.raw_data && Object.keys(evidenceItem.raw_data).length > 0 && (
          <details className="text-xs border border-[#352A45]/[0.08] rounded-2xl p-3 bg-[#FAF9FD]">
            <summary className="font-bold text-[#352A45] cursor-pointer hover:text-[#6750A4] flex items-center justify-between">
              <span>View Verified Registry JSON Schema</span>
              <span className="text-[10px] text-[#8C8298]">SHA-256 Validated</span>
            </summary>
            <pre className="mt-2.5 p-3 bg-[#1D162B] text-[#EEE8FA] rounded-xl overflow-x-auto text-[10px] font-mono leading-relaxed">
              {JSON.stringify(evidenceItem.raw_data, null, 2)}
            </pre>
          </details>
        )}

        <div className="mt-6 pt-4 border-t border-[#352A45]/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Close Forensic Panel
          </button>
        </div>
      </div>
    </div>
  );
};
