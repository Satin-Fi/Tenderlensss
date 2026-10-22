import React, { useState, useEffect } from 'react';
import {
  TenderLensLogo,
  RulebookCodex,
  AuditChain,
  VerifiedVendor,
  GeMShield
} from '../components/AstraIcons';
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { Clarification } from '../types';
import { api } from '../services/api';

interface ClarificationsPageProps {
  isOfficer: boolean;
}

export const ClarificationsPage: React.FC<ClarificationsPageProps> = ({ isOfficer }) => {
  const [clarifications, setClarifications] = useState<Clarification[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [id: number]: string }>({});
  const [submittingId, setSubmittingId] = useState<number | null>(null);

  const loadData = () => {
    api.getClarifications()
      .then(res => setClarifications(res))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendReply = async (id: number) => {
    const text = replyText[id];
    if (!text || !text.trim()) return;
    setSubmittingId(id);
    try {
      await api.replyClarification(id, text);
      setReplyText({ ...replyText, [id]: '' });
      loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-[#8C8298]">Loading clarification records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
              GFR 2017 RULE 173 AUDITED CHANNEL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            Clarifications & Legal Inquiries
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Formal, immutable query-response thread between Procuring Officers and Bidders.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 p-2 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] text-xs font-bold text-[#6750A4]">
          <RulebookCodex className="w-4 h-4 text-[#6750A4]" />
          <span>{isOfficer ? 'Procurement Officer Desk' : 'Supplier Response Desk'}</span>
        </div>
      </div>

      {clarifications.length === 0 ? (
        <div className="porcelain-card p-16 rounded-[28px] border border-white/80 bg-white/70 text-center">
          <MessageSquare className="w-10 h-10 text-[#8C8298] mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-[#352A45]">No Active Clarifications</h3>
          <p className="text-xs text-[#8C8298] mt-1">All bidder queries and technical inquiries have been resolved.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {clarifications.map((c) => {
            const isReplied = c.status === 'Replied' || c.status === 'Closed';

            return (
              <div
                key={c.id}
                className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#352A45]/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold text-[#6750A4] bg-[#EEE8FA] px-2 py-0.5 rounded-md">
                      Ref #CLR-{c.id}
                    </span>
                    <span className="text-xs font-extrabold text-[#352A45]">
                      {c.vendor_name}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1 rounded-full ${
                      isReplied
                        ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                        : 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                    }`}
                  >
                    {isReplied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    <span>{isReplied ? 'Resolved & Replied' : 'Awaiting Formal Response'}</span>
                  </span>
                </div>

                {/* Query Body */}
                <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-[#8C8298] font-bold uppercase tracking-wider">
                    <span>Officer Query / Deficiency Raised:</span>
                    <span>{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-[#352A45] leading-relaxed font-medium">
                    {c.query_text}
                  </p>
                </div>

                {/* Vendor Reply */}
                {c.response_text ? (
                  <div className="p-4 rounded-2xl bg-[#E6F3EA]/50 border border-[#1E8E62]/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[#0D5438] font-bold uppercase tracking-wider">
                      <span>Vendor Clarification Response:</span>
                      {c.replied_at && <span>{new Date(c.replied_at).toLocaleString()}</span>}
                    </div>
                    <p className="text-xs text-[#0D5438] leading-relaxed font-medium">
                      {c.response_text}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold text-[#352A45] block">
                      {isOfficer ? 'Supplemental Officer File Noting:' : 'Enter Formal Vendor Explanation / Certificate Reference:'}
                    </label>
                    <textarea
                      rows={3}
                      value={replyText[c.id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [c.id]: e.target.value })}
                      placeholder={isOfficer ? "Enter supplementary remarks..." : "State your formal explanation with IS standard license / CA certificate number..."}
                      className="w-full text-xs p-3.5 rounded-xl border border-[#352A45]/[0.12] bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 text-[#352A45]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSendReply(c.id)}
                        disabled={submittingId === c.id || !replyText[c.id]?.trim()}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{submittingId === c.id ? 'Submitting...' : 'Dispatch Signed Clarification'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
