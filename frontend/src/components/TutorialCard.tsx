import React, { useState } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  RulebookCodex
} from './AstraIcons';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, X, FileText, Search, Sparkles } from 'lucide-react';

export const TutorialCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="porcelain-card porcelain-card-hover p-6 rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-[#EEE8FA] text-[#6750A4]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#352A45]">Quick Masterclass</span>
        </div>
        <p className="text-xs text-[#7A7088] leading-relaxed mb-4">
          Master the statutory AI Verification Engine and deterministic scrutiny pipeline step-by-step.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6750A4] hover:text-[#4D3C7C] transition-colors group cursor-pointer"
        >
          <span>Launch 3-Minute Walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Tutorial Walkthrough Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="porcelain-card bg-white rounded-[30px] max-w-xl w-full p-7 sm:p-8 shadow-2xl border border-white/90 animate-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#352A45]/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EEE8FA] flex items-center justify-center text-[#6750A4] p-2">
                  <Zap className="w-full h-full text-[#6750A4]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#352A45] text-sm">3-Minute Platform Script</h3>
                  <p className="text-xs text-[#8C8298]">TenderLens: "Verify the claims with court-admissible evidence."</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8C8298] hover:text-[#352A45] p-1.5 rounded-lg hover:bg-[#FAF9FD] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#352A45]">
              <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center font-extrabold text-[11px] shrink-0">1</div>
                <div>
                  <div className="font-extrabold text-[#352A45]">Ingest NIT & Extract Parameter Checklist</div>
                  <p className="text-[#7A7088] mt-0.5">Click <b>"+ Create Tender"</b>. The OCR Document Extractor parses technical parameters with confidence scores.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center font-extrabold text-[11px] shrink-0">2</div>
                <div>
                  <div className="font-extrabold text-[#352A45]">Review Submitted Bids (Tender C-409)</div>
                  <p className="text-[#7A7088] mt-0.5">Open Tender <b>CPWD/ND-II/2026/C-409</b> (Cement). 4 vendor proposals are submitted with differing quotes and claims.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EEE8FA]/60 border border-[#6750A4]/25 flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center font-extrabold text-[11px] shrink-0">3</div>
                <div>
                  <div className="font-extrabold text-[#6750A4]">Trigger Live Multi-Agent Scrutiny</div>
                  <p className="text-[#55466D] mt-0.5">Watch parallel agents verify BIS Manakonline, GSTIN, and GeM pricing. <b>Vendor A (₹340) is disqualified</b> for expired licence; <b>Vendor D (₹290) is red-flagged</b> for collusion!</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#6750A4] text-white flex items-center justify-center font-extrabold text-[11px] shrink-0">4</div>
                <div>
                  <div className="font-extrabold text-[#352A45]">Inspect Evidence Reticle & Export Report</div>
                  <p className="text-[#7A7088] mt-0.5">Click <b>"Inspect Reticle"</b> to view the BIS registry screenshot. Then click <b>"Official PDF Report"</b> for the complete audit noting.</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#352A45]/[0.08] flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer hover:brightness-105"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
