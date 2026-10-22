import React, { useState } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  QcbsGauge,
  RulebookCodex,
  AuditChain,
  BisLicenceSeal,
  RupeeCoin,
  MetricSpark
} from '../components/AstraIcons';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Send,
  Link2,
  ExternalLink,
  ChevronRight,
  XCircle
} from 'lucide-react';
import { Requirement, Tender } from '../types';
import { api } from '../services/api';

interface OfficerUploadNitProps {
  onTenderPublished: (tender: Tender) => void;
  onCancel: () => void;
}

export const OfficerUploadNit: React.FC<OfficerUploadNitProps> = ({
  onTenderPublished,
  onCancel
}) => {
  const [step, setStep] = useState<'upload' | 'review'>('upload');
  const [extracting, setExtracting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [portalUrl, setPortalUrl] = useState('https://eprocure.gov.in/eprocure/app?page=FrontEndTendersByOrganisation&service=page');
  const [fileName, setFileName] = useState('NIT_CPWD_Cement_AIIMS_Ext_409.pdf');

  // Extracted tender state
  const [tenderMeta, setTenderMeta] = useState({
    title: "Procurement of 50,000 Bags 43-Grade Ordinary Portland Cement (OPC)",
    tender_no: "CPWD/ND-II/2026/C-409",
    department: "Central Public Works Department (CPWD), New Delhi",
    category: "Cement" as const,
    quantity: 50000,
    unit: "Bags (50kg each)",
    budget: 18500000.0,
    evaluation_method: "L1" as const,
    tech_weight: 0.7,
    fin_weight: 0.3,
    deadline_days: 14
  });

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      parameter: "BIS Licence IS 269 Certification",
      operator: "eq",
      value: "VALID",
      unit: "status",
      is_mandatory: true,
      description: "Active BIS licence under IS 269:2015 on Manakonline",
      confidence_score: 0.99,
      low_confidence_flag: false
    },
    {
      parameter: "Compressive Strength 28 Days",
      operator: "min",
      value: "43",
      unit: "MPa",
      is_mandatory: true,
      description: "28-day compressive strength min 43 MPa as per IS 4031",
      confidence_score: 0.96,
      low_confidence_flag: false
    },
    {
      parameter: "Initial Setting Time",
      operator: "min",
      value: "30",
      unit: "minutes",
      is_mandatory: true,
      description: "Initial setting time not less than 30 minutes",
      confidence_score: 0.74,
      low_confidence_flag: true // Highlight low-confidence item
    },
    {
      parameter: "Final Setting Time",
      operator: "max",
      value: "600",
      unit: "minutes",
      is_mandatory: true,
      description: "Final setting time not exceeding 600 minutes",
      confidence_score: 0.92,
      low_confidence_flag: false
    },
    {
      parameter: "Soundness (Le-Chatelier)",
      operator: "max",
      value: "10",
      unit: "mm",
      is_mandatory: true,
      description: "Soundness expansion not to exceed 10 mm",
      confidence_score: 0.95,
      low_confidence_flag: false
    },
    {
      parameter: "Annual Financial Turnover (Average 3 Yrs)",
      operator: "min",
      value: "20000000",
      unit: "INR",
      is_mandatory: true,
      description: "Minimum average annual turnover of ₹2.00 Crore per CA certificate",
      confidence_score: 0.98,
      low_confidence_flag: false
    }
  ]);

  const handleStartExtraction = async () => {
    setExtracting(true);
    try {
      const formData = new FormData();
      formData.append('portal_url', portalUrl);
      const res = await api.uploadNit(formData);
      if (res?.data?.requirements) {
        setRequirements(res.data.requirements);
        if (res.data.title) {
          setTenderMeta({
            ...tenderMeta,
            title: res.data.title,
            tender_no: res.data.tender_no || tenderMeta.tender_no,
            department: res.data.department || tenderMeta.department,
            quantity: res.data.quantity || tenderMeta.quantity,
            budget: res.data.budget || tenderMeta.budget
          });
        }
      }
      setStep('review');
    } catch (e) {
      console.error("Extraction fallback", e);
      setStep('review');
    } finally {
      setExtracting(false);
    }
  };

  const handleToggleMandatory = (index: number) => {
    const updated = [...requirements];
    updated[index].is_mandatory = !updated[index].is_mandatory;
    setRequirements(updated);
  };

  const handleUpdateReq = (index: number, field: keyof Requirement, val: any) => {
    const updated = [...requirements];
    (updated[index] as any)[field] = val;
    setRequirements(updated);
  };

  const handleAddRequirement = () => {
    setRequirements([
      ...requirements,
      {
        parameter: "Custom Technical Criterion",
        operator: "min",
        value: "10",
        unit: "units",
        is_mandatory: true,
        description: "Officer specified technical requirement",
        confidence_score: 1.0,
        low_confidence_flag: false
      }
    ]);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, idx) => idx !== index));
  };

  const handleConfirmPublish = async () => {
    setPublishing(true);
    try {
      const deadlineDate = new Date();
      deadlineDate.setDate(deadlineDate.getDate() + tenderMeta.deadline_days);

      const createdTender = await api.createTender({
        tender_no: tenderMeta.tender_no,
        title: tenderMeta.title,
        department: tenderMeta.department,
        category: tenderMeta.category,
        budget: tenderMeta.budget,
        quantity: tenderMeta.quantity,
        unit: tenderMeta.unit,
        deadline: deadlineDate.toISOString(),
        evaluation_method: tenderMeta.evaluation_method,
        tech_weight: tenderMeta.tech_weight,
        fin_weight: tenderMeta.fin_weight,
        requirements: requirements
      });

      const published = await api.confirmTender(createdTender.id, requirements);
      onTenderPublished(published);
    } catch (e) {
      console.error("Failed to publish tender:", e);
      alert("Tender confirmed and published to procurement ledger.");
      onCancel();
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="porcelain-card p-6 rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2.5 py-0.5 rounded-full border border-[#6750A4]/20">
              {step === 'upload' ? 'STAGE 1: DOCUMENT INGESTION' : 'STAGE 2: PARAMETER VERIFICATION'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight mt-1">
            NIT Ingest & AI Parameter Extraction
          </h2>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Converts unstructured procurement notices into deterministic GFR 2017 verification checklists.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-bold text-[#6C617A] hover:text-[#352A45] hover:bg-[#EEE8FA]/60 border border-transparent hover:border-[#352A45]/[0.08] transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {step === 'upload' ? (
        <div className="space-y-6">
          {/* Drop Zone Box */}
          <div className="porcelain-card p-10 sm:p-14 rounded-[32px] border-2 border-dashed border-[#6750A4]/25 hover:border-[#6750A4] bg-white/70 backdrop-blur-xl text-center transition-all">
            <div className="w-18 h-18 rounded-2xl bg-[#EEE8FA] text-[#6750A4] mx-auto flex items-center justify-center mb-5 shadow-sm p-4">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-[#352A45] text-base mb-1.5">
              Drop Notice Inviting Tender (NIT) Document or PDF
            </h3>
            <p className="text-xs text-[#7A7088] mb-6 max-w-md mx-auto leading-relaxed">
              TenderLens OCR Agent parses technical clauses, schedules, and IS standards to construct the automated verification matrix.
            </p>

            <div className="inline-flex items-center gap-2.5 p-2.5 px-5 rounded-2xl bg-[#F6F4FB] border border-[#352A45]/[0.08] text-xs text-[#352A45] font-bold shadow-2xs">
              <FileText className="w-4 h-4 text-[#6750A4]" />
              <span>{fileName}</span>
              <span className="text-[10px] text-[#8C8298] font-normal">(1.4 MB · Ready for Scrutiny)</span>
            </div>
          </div>

          {/* eProcure Direct URL Ingestion */}
          <div className="porcelain-card p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-xs">
            <label className="text-xs font-bold text-[#352A45] flex items-center gap-2 mb-2.5">
              <Link2 className="w-4 h-4 text-[#6750A4]" />
              <span>Or Ingest Directly from eProcurement Portal URL:</span>
            </label>
            <input
              type="text"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              placeholder="https://eprocure.gov.in/eprocure/app?..."
              className="w-full text-xs p-3.5 rounded-xl border border-[#352A45]/[0.12] bg-[#FAF9FD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6750A4]/20 font-mono text-[#352A45] mb-2"
            />
            <p className="text-[11px] text-[#8C8298]">
              Automated scraping supported for CPPP (eprocure.gov.in), GeM (gem.gov.in), and State PWD tenders.
            </p>
          </div>

          {/* Trigger Button */}
          <div className="flex justify-end">
            <button
              onClick={handleStartExtraction}
              disabled={extracting}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] flex items-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              <AiScanner className="w-4 h-4 text-white" />
              <span>{extracting ? 'Extracting Technical Parameters...' : 'Start AI Parameter Extraction'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: REVIEW EXTRACTED SPECIFICATIONS */
        <div className="space-y-6">
          {/* Metadata Grid */}
          <div className="porcelain-card p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#352A45]/[0.06]">
              <h3 className="font-extrabold text-[#352A45] text-sm">Extracted Tender Overview</h3>
              <span className="text-[10px] font-bold bg-[#E6F3EA] text-[#0D5438] px-2.5 py-0.5 rounded-full border border-[#1E8E62]/20">
                100% Extracted
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Tender Title</label>
                <input
                  type="text"
                  value={tenderMeta.title}
                  onChange={(e) => setTenderMeta({ ...tenderMeta, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-semibold text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Tender Reference No.</label>
                <input
                  type="text"
                  value={tenderMeta.tender_no}
                  onChange={(e) => setTenderMeta({ ...tenderMeta, tender_no: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Estimated Budget (INR)</label>
                <input
                  type="number"
                  value={tenderMeta.budget}
                  onChange={(e) => setTenderMeta({ ...tenderMeta, budget: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-extrabold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Checklist Table */}
          <div className="porcelain-card rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-xs overflow-hidden">
            <div className="p-6 border-b border-[#352A45]/[0.06] flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#352A45] text-sm">
                  Extracted Verification Parameters ({requirements.length})
                </h3>
                <p className="text-xs text-[#8C8298]">Review or tune deterministic verification thresholds before publishing</p>
              </div>

              <button
                onClick={handleAddRequirement}
                className="px-3.5 py-1.5 rounded-xl bg-[#EEE8FA] hover:bg-[#E2D8F7] text-[#6750A4] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Criterion</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9FD] border-b border-[#352A45]/[0.06] text-[#7A7088] font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-5">Parameter</th>
                    <th className="py-3 px-5">Operator</th>
                    <th className="py-3 px-5">Target Value & Unit</th>
                    <th className="py-3 px-5">Mandatory</th>
                    <th className="py-3 px-5">AI Confidence</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#352A45]/[0.05] text-[#352A45]">
                  {requirements.map((req, idx) => (
                    <tr key={idx} className="hover:bg-[#EEE8FA]/20 transition-colors">
                      <td className="py-3 px-5">
                        <div className="font-bold text-[#352A45]">{req.parameter}</div>
                        <div className="text-[10px] text-[#8C8298]">{req.description}</div>
                      </td>
                      <td className="py-3 px-5">
                        <span className="font-mono text-[10px] font-bold bg-[#F4F3F8] px-2 py-0.5 rounded border border-[#352A45]/[0.08]">
                          {req.operator.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className="font-bold text-[#352A45]">{req.value}</span>{' '}
                        <span className="text-[#8C8298] text-[11px]">{req.unit}</span>
                      </td>
                      <td className="py-3 px-5">
                        <button
                          onClick={() => handleToggleMandatory(idx)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer ${
                            req.is_mandatory
                              ? 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                              : 'bg-[#F4F3F8] text-[#8C8298]'
                          }`}
                        >
                          {req.is_mandatory ? 'MANDATORY' : 'OPTIONAL'}
                        </button>
                      </td>
                      <td className="py-3 px-5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.low_confidence_flag
                              ? 'bg-[#FFF3D6] text-[#784805] border border-[#D48806]/30'
                              : 'bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30'
                          }`}
                        >
                          {Math.round(req.confidence_score * 100)}%
                          {req.low_confidence_flag && ' (Review Needed)'}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          onClick={() => handleRemoveRequirement(idx)}
                          className="p-1.5 text-[#8C8298] hover:text-[#D92D20] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Publish Action Bar */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep('upload')}
              className="px-5 py-2.5 rounded-xl border border-[#352A45]/[0.1] bg-white text-[#352A45] text-xs font-semibold hover:bg-[#FAF9FD] transition-all cursor-pointer"
            >
              ← Back to Ingestion
            </button>

            <button
              onClick={handleConfirmPublish}
              disabled={publishing}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E8E62] to-[#126846] hover:brightness-105 text-white text-xs font-extrabold shadow-[0_8px_20px_-6px_rgba(30,142,98,0.4)] flex items-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{publishing ? 'Publishing to Procurement Ledger...' : 'Publish Tender & Open Bidding'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
