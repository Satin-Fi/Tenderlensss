import React, { useState, useEffect } from 'react';
import {
  TenderLensLogo,
  AuditChain,
  GeMShield,
  AiScanner,
  RulebookCodex
} from '../components/AstraIcons';
import {
  History,
  ShieldCheck,
  Filter,
  Download,
  Sparkles,
  Terminal,
  Clock,
  ChevronDown,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { AuditLog } from '../types';
import { api } from '../services/api';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    setLoading(true);
    api.getAuditLog(roleFilter)
      .then(res => setLogs(res))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [roleFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
              TAMPER-EVIDENT CRYPTOGRAPHIC LOG
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            Procurement Audit Vault
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Immutable log of all autonomous agent actions, OCR extractions, and statutory verifications under Rule 144(xi) GFR 2017.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2.5 px-3.5 rounded-xl border border-[#352A45]/[0.1] bg-white text-xs font-bold text-[#352A45] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 cursor-pointer"
            >
              <option value="All">All Actors & Agents</option>
              <option value="officer">Government Officer Actions</option>
              <option value="agent">Autonomous AI Scrutiny Agents</option>
              <option value="system">Deterministic Compliance Engine</option>
              <option value="vendor">Vendor Bid Ingestions</option>
            </select>
          </div>
        </div>
      </div>

      <div className="porcelain-card rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(53,42,69,0.12)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FD] border-b border-[#352A45]/[0.06] text-[#7A7088] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6">Timestamp (IST)</th>
                <th className="py-4 px-6">Actor</th>
                <th className="py-4 px-6">Role Authority</th>
                <th className="py-4 px-6">Action Executed</th>
                <th className="py-4 px-6">Target Resource</th>
                <th className="py-4 px-6">Audit Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#352A45]/[0.05] text-[#352A45]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#8C8298]">
                    <div className="w-8 h-8 border-2 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Validating cryptographic signatures...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#8C8298]">No audit records found.</td>
                </tr>
              ) : (
                logs.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedLog(l)}
                    className="hover:bg-[#EEE8FA]/20 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 text-[#8C8298] font-mono text-[11px] whitespace-nowrap">
                      {new Date(l.timestamp).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-[#352A45] group-hover:text-[#6750A4]">
                      {l.actor}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        l.role === 'officer'
                          ? 'bg-[#EEE8FA] text-[#6750A4] border border-[#6750A4]/25'
                          : l.role === 'agent'
                          ? 'bg-[#E8F0FC] text-[#153E90] border border-[#2970FF]/25'
                          : l.role === 'system'
                          ? 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/25'
                          : 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/25'
                      }`}>
                        {l.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px] font-extrabold text-[#352A45]">{l.action}</td>
                    <td className="py-4 px-6 text-[#6C617A] font-semibold">{l.target}</td>
                    <td className="py-4 px-6 font-mono text-[10px] text-[#8C8298] max-w-xs truncate" title={JSON.stringify(l.details)}>
                      {JSON.stringify(l.details)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Log Drawer Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="porcelain-card bg-white rounded-[28px] max-w-xl w-full p-7 shadow-2xl border border-white/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#352A45]/[0.08]">
              <div className="flex items-center gap-2.5">
                <AuditChain className="w-5 h-5 text-[#6750A4]" />
                <h3 className="font-extrabold text-[#352A45] text-sm">Audit Event #{selectedLog.id}</h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-[#8C8298] hover:text-[#352A45] p-1.5 rounded-lg hover:bg-[#F4F3F8] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#352A45]/[0.05]">
                <span className="text-[#8C8298]">Timestamp:</span>
                <span className="font-mono font-bold">{new Date(selectedLog.timestamp).toISOString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#352A45]/[0.05]">
                <span className="text-[#8C8298]">Actor:</span>
                <span className="font-bold">{selectedLog.actor} ({selectedLog.role})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#352A45]/[0.05]">
                <span className="text-[#8C8298]">Action:</span>
                <span className="font-mono font-bold text-[#6750A4]">{selectedLog.action}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#352A45]/[0.05]">
                <span className="text-[#8C8298]">Resource:</span>
                <span className="font-bold">{selectedLog.target}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1.5">Event JSON Diff Payload:</span>
              <pre className="p-3 bg-[#1D162B] text-[#EEE8FA] rounded-2xl overflow-x-auto text-[10px] font-mono leading-relaxed">
                {JSON.stringify(selectedLog.details, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Audit Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
