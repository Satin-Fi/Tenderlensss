import React, { useState } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  RupeeCoin,
  RulebookCodex
} from '../components/AstraIcons';
import {
  Plus,
  Filter,
  LayoutGrid,
  List,
  ArrowRight,
  Clock,
  ShieldCheck,
  FileText,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Tender } from '../types';

interface OfficerTenderListProps {
  tenders: Tender[];
  onSelectTender: (id: number) => void;
  onCreateTender: () => void;
  selectedCategory: string;
}

export const OfficerTenderList: React.FC<OfficerTenderListProps> = ({
  tenders,
  onSelectTender,
  onCreateTender,
  selectedCategory
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = tenders.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  const kanbanColumns = [
    { title: 'Drafting', status: 'Draft', color: 'border-slate-300' },
    { title: 'Published / Open', status: 'Published', color: 'border-[#2970FF]/40' },
    { title: 'Under Scrutiny', status: 'Under Evaluation', color: 'border-[#D48806]/40' },
    { title: 'Awarded & Finalized', status: 'Awarded', color: 'border-[#1E8E62]/40' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
              NATIONAL PROCUREMENT LEDGER
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            Tender Portfolio & Pipeline
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Active category: <span className="font-bold text-[#352A45]">{selectedCategory}</span> · Rule 144(xi) GFR 2017 compliant tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F2F0F7] p-1 rounded-2xl border border-[#352A45]/[0.08]">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white shadow-xs text-[#352A45]'
                  : 'text-[#7E738B] hover:text-[#352A45]'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-white shadow-xs text-[#352A45]'
                  : 'text-[#7E738B] hover:text-[#352A45]'
              }`}
              title="Kanban view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onCreateTender}
            className="px-5 py-2.5 bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold rounded-2xl shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] flex items-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Tender</span>
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        /* KANBAN PIPELINE VIEW */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {kanbanColumns.map((col) => {
            const colTenders = tenders.filter(t => {
              if (col.status === 'Published') {
                return t.status === 'Published' || t.status === 'Bids Open';
              }
              return t.status === col.status;
            });

            return (
              <div
                key={col.status}
                className="porcelain-card p-4 rounded-[24px] border border-white/80 bg-white/70 backdrop-blur-xl space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#352A45]/[0.06]">
                  <span className="text-xs font-extrabold text-[#352A45]">{col.title}</span>
                  <span className="text-[10px] font-extrabold text-[#6750A4] bg-[#EEE8FA] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
                    {colTenders.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colTenders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#A198AF]">No tenders</div>
                  ) : (
                    colTenders.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => onSelectTender(t.id)}
                        className="porcelain-card porcelain-card-hover p-4 rounded-2xl border border-white/90 bg-white/90 shadow-2xs cursor-pointer group space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#8C8298] font-bold">{t.tender_no}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#EEE8FA] text-[#6750A4]">
                            {t.category}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-xs text-[#352A45] group-hover:text-[#6750A4] transition-colors line-clamp-2">
                          {t.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#352A45]/[0.05]">
                          <span className="font-extrabold text-[#1E8E62]">
                            ₹{(t.budget / 10000000).toFixed(2)} Cr
                          </span>
                          <span className="text-[10px] text-[#8C8298] font-medium">
                            {t.quantity.toLocaleString()} {t.unit}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* HIGH-DENSITY LEDGER TABLE */
        <div className="porcelain-card rounded-[28px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_-25px_rgba(53,42,69,0.12)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9FD] border-b border-[#352A45]/[0.06] text-[#7A7088] font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">Tender Title & Reference</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Estimated Budget</th>
                  <th className="py-4 px-6">Quantity</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#352A45]/[0.05] text-[#352A45]">
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => onSelectTender(t.id)}
                    className="hover:bg-[#EEE8FA]/20 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#352A45] group-hover:text-[#6750A4] transition-colors">
                        {t.title}
                      </div>
                      <div className="text-[10px] text-[#8C8298] font-mono mt-0.5">{t.tender_no}</div>
                    </td>
                    <td className="py-4 px-6 text-[#6C617A]">{t.department}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F0EDF7] text-[#55466D] border border-[#352A45]/[0.08]">
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
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6750A4] group-hover:text-[#4D3C7C] bg-[#EEE8FA]/80 hover:bg-[#EEE8FA] px-3 py-1.5 rounded-xl border border-[#6750A4]/20 transition-all cursor-pointer"
                      >
                        <span>Evaluate Bids</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
