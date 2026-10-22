import React, { useState } from 'react';
import {
  TenderLensLogo,
  RulebookCodex,
  AuditChain
} from './AstraIcons';
import { X, Send, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

interface ClarificationModalProps {
  tenderId: number;
  bidId: number;
  vendorId: number;
  vendorName: string;
  defaultTopic?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ClarificationModal: React.FC<ClarificationModalProps> = ({
  tenderId,
  bidId,
  vendorId,
  vendorName,
  defaultTopic = "BIS Licence Clarification",
  onClose,
  onSuccess
}) => {
  const [queryText, setQueryText] = useState(
    `Dear ${vendorName},\n\nDuring statutory verification of your submitted proposal for Tender #${tenderId}, automated verification queries against the BIS Manakonline registry indicated that your licence record requires clarification. Please submit an official renewal endorsement or current test report within 48 hours to prevent disqualification under GFR Rule 173.\n\nRegards,\nProcurement Officer, Central Works Department`
  );
  const [submitting, setSubmitting] = useState(false);

  const handleAutoDraft = () => {
    setQueryText(
      `Dear ${vendorName},\n\nWith reference to your bid submission for Tender #${tenderId}, the Technical Evaluation Committee requests clarification regarding technical specifications and mandatory certification compliance under Rule 144(xi) GFR 2017. Please provide documentary evidence for the cited parameters.\n\nSincerely,\nEvaluation Committee`
    );
  };

  const handleSend = async () => {
    if (!queryText.trim()) return;
    setSubmitting(true);
    try {
      await api.createClarification({
        tender_id: tenderId,
        bid_id: bidId,
        vendor_id: vendorId,
        query_text: queryText
      });
      onSuccess();
      onClose();
    } catch (e) {
      console.error("Failed to send clarification:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="porcelain-card bg-white rounded-[30px] max-w-lg w-full p-7 sm:p-8 shadow-2xl border border-white/90 animate-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#352A45]/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EEE8FA] flex items-center justify-center text-[#6750A4] p-2">
              <RulebookCodex className="w-full h-full text-[#6750A4]" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#352A45] text-sm">Issue Official Clarification Query</h3>
              <p className="text-xs text-[#8C8298]">Recipient: <b className="text-[#352A45]">{vendorName}</b> (Bid #{bidId})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8298] hover:text-[#352A45] p-1.5 rounded-lg hover:bg-[#FAF9FD] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#352A45]">Official File Inquiry Draft:</label>
          <button
            type="button"
            onClick={handleAutoDraft}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6750A4] hover:text-[#4D3C7C] bg-[#EEE8FA] px-2.5 py-1 rounded-lg cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Auto-Draft</span>
          </button>
        </div>

        <textarea
          rows={6}
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          className="w-full text-xs p-3.5 rounded-2xl border border-[#352A45]/[0.12] bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 text-[#352A45] leading-relaxed font-sans"
        />

        <p className="text-[11px] text-[#8C8298] leading-relaxed">
          Notice: This query is cryptographically logged in the public procurement audit vault and appears immediately in the vendor's Clarification Inbox.
        </p>

        <div className="pt-3 border-t border-[#352A45]/[0.08] flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-bold rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={submitting || !queryText.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Dispatching...' : 'Dispatch Signed Query'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
