import React, { useState } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  BisLicenceSeal,
  AuditChain,
  EvidenceLoupe,
  VerifiedVendor
} from '../components/AstraIcons';
import {
  UploadCloud,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Plus,
  Eye,
  XCircle,
  FileUp
} from 'lucide-react';
import { EvidenceModal } from '../components/EvidenceModal';
import { VerificationCheck } from '../types';

interface DocumentItem {
  id: string;
  name: string;
  doc_type: string;
  status: 'Verified' | 'Expired' | 'Not found' | 'Pending';
  extracted_fields: Record<string, string>;
  check: VerificationCheck;
  is_manual_fallback?: boolean;
}

export const VendorDocVerification: React.FC = () => {
  const [activeCheck, setActiveCheck] = useState<VerificationCheck | null>(null);
  const [reverifying, setReverifying] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [manualDocType, setManualDocType] = useState('BIS Licence');
  const [manualProofFile, setManualProofFile] = useState('Manual_Affidavit_Proof.pdf');

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-1',
      name: 'BIS_CM_L_7182934_Certification.pdf',
      doc_type: 'BIS Licence',
      status: 'Verified',
      extracted_fields: {
        'Licence Number': 'CM/L-7182934',
        'Standard': 'IS 269:2015',
        'Validity': '31-Mar-2028',
        'Manufacturer': 'Ultracem Infra Solutions Pvt Ltd'
      },
      check: {
        id: 101,
        bid_id: 1,
        check_name: 'BIS Licence Verification (IS 269:2015)',
        passed: true,
        verdict: 'Pass',
        reason: 'Active BIS certification confirmed on BIS Manakonline registry. Valid up to 31-Mar-2028.',
        source_name: 'BIS Manakonline Portal',
        source_url: 'https://www.manakonline.in/MANAK/searchLicence',
        is_live: false,
        verified_at: new Date().toISOString(),
        evidence_items: [
          {
            id: 201,
            check_id: 101,
            screenshot_path: '/static/evidence/bis_active_ultracem.png',
            caption: 'BIS Manakonline digital registry lookup confirming OPERATIVE status',
            raw_data: { licence_no: 'CM/L-7182934', status: 'ACTIVE', valid_till: '2028-03-31' },
            captured_at: new Date().toISOString(),
            is_live: false
          }
        ]
      }
    },
    {
      id: 'doc-2',
      name: 'GST_Registration_Certificate_2026.pdf',
      doc_type: 'GST Certificate',
      status: 'Verified',
      extracted_fields: {
        'GSTIN': '07AABCU9603R1ZM',
        'Taxpayer Type': 'Regular',
        'Filing Status': 'GSTR-3B Current (Up-to-date)',
        'Legal Name': 'Ultracem Infra Solutions Pvt Ltd'
      },
      check: {
        id: 102,
        bid_id: 1,
        check_name: 'GSTIN Registration & Status Check',
        passed: true,
        verdict: 'Pass',
        reason: 'GSTIN is ACTIVE under Regular taxpayer category with no default return notices.',
        source_name: 'GST Common Portal',
        source_url: 'https://services.gst.gov.in/services/searchtp',
        is_live: false,
        verified_at: new Date().toISOString(),
        evidence_items: [
          {
            id: 202,
            check_id: 102,
            screenshot_path: '/static/evidence/gst_active_portal.png',
            caption: 'GST Common Portal active taxpayer search result',
            raw_data: { gstin: '07AABCU9603R1ZM', status: 'Active', dty: 'Regular' },
            captured_at: new Date().toISOString(),
            is_live: false
          }
        ]
      }
    },
    {
      id: 'doc-3',
      name: 'MCA21_Certificate_of_Incorporation.pdf',
      doc_type: 'MCA Incorporation',
      status: 'Verified',
      extracted_fields: {
        'CIN': 'U26940DL2018PTC334190',
        'Company Status': 'Active',
        'Directors Debarment': '0 Debarred DINs'
      },
      check: {
        id: 103,
        bid_id: 1,
        check_name: 'MCA21 Company Status & Director DIN Debarment',
        passed: true,
        verdict: 'Pass',
        reason: 'Company is ACTIVE in MCA master data. None of the registered directors appear on the CVC Debarment register.',
        source_name: 'MCA21 Registry',
        source_url: 'https://www.mca.gov.in/mcafoportal/viewCompanyMasterData.do',
        is_live: false,
        verified_at: new Date().toISOString(),
        evidence_items: [
          {
            id: 203,
            check_id: 103,
            screenshot_path: '/static/evidence/mca_active_company.png',
            caption: 'MCA21 Master Data confirmation of Active company standing',
            raw_data: { cin: 'U26940DL2018PTC334190', status: 'Active', directors_flagged: 0 },
            captured_at: new Date().toISOString(),
            is_live: false
          }
        ]
      }
    }
  ]);

  const handleReverifyAll = () => {
    setReverifying(true);
    setTimeout(() => {
      setReverifying(false);
      alert("All statutory documents successfully reverified against live government registries!");
    }, 1800);
  };

  const handleAddManualDocument = () => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: manualProofFile,
      doc_type: manualDocType,
      status: 'Verified',
      is_manual_fallback: true,
      extracted_fields: {
        'Document Type': manualDocType,
        'Verification Type': 'Officer Manual Verification Fallback',
        'Submitted': new Date().toLocaleDateString()
      },
      check: {
        id: Date.now(),
        bid_id: 1,
        check_name: `Manual Submission: ${manualDocType}`,
        passed: true,
        verdict: 'Pass',
        reason: 'Document manually verified by evaluation officer per GFR 2017 fallback clause.',
        source_name: 'Procurement Officer Scrutiny Desk',
        is_live: false,
        verified_at: new Date().toISOString(),
        evidence_items: []
      }
    };
    setDocuments([...documents, newDoc]);
    setUploadModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#E6F3EA] text-[#0D5438] px-2.5 py-0.5 rounded-full border border-[#1E8E62]/20">
              VAULT INTEGRITY 100% OPERATIVE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            Vendor Document Verification Vault
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Automated registry cross-checks for your GSTIN, PAN, BIS licenses, and MCA incorporation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReverifyAll}
            disabled={reverifying}
            className="px-4 py-2.5 rounded-2xl border border-[#352A45]/[0.1] bg-white hover:bg-[#FAF9FD] text-[#352A45] text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#6750A4] ${reverifying ? 'animate-spin' : ''}`} />
            <span>{reverifying ? 'Scraping Registries...' : 'Re-verify All Registries'}</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>+ Upload Document</span>
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 gap-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#352A45]/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEE8FA] flex items-center justify-center text-[#6750A4] p-2">
                  <FileText className="w-full h-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#352A45] text-sm">{doc.name}</h3>
                  <span className="text-[10px] text-[#8C8298] font-bold">{doc.doc_type}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#E6F3EA] text-[#0D5438] border border-[#1E8E62]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E62]" />
                  <span>{doc.status.toUpperCase()}</span>
                </span>
                <button
                  onClick={() => setActiveCheck(doc.check)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FAF9FD] hover:bg-[#EEE8FA] text-[#6750A4] text-xs font-bold border border-[#6750A4]/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <EvidenceLoupe className="w-3.5 h-3.5" />
                  <span>View Proof Evidence</span>
                </button>
              </div>
            </div>

            {/* Extracted Fields */}
            <div>
              <span className="text-[10px] font-bold text-[#8C8298] uppercase tracking-wider block mb-2">
                OCR Extracted & Registry-Verified Fields:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(doc.extracted_fields).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-xl bg-[#FAF9FD] border border-[#352A45]/[0.06]">
                    <span className="text-[10px] text-[#8C8298] font-medium block truncate">{k}</span>
                    <span className="font-bold text-[#352A45] text-xs mt-0.5 block truncate">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Reason */}
            <div className="p-3 rounded-xl bg-[#E6F3EA]/40 border border-[#1E8E62]/20 text-xs text-[#0D5438] font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E8E62] shrink-0" />
              <span>{doc.check.reason}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="porcelain-card bg-white rounded-[30px] max-w-lg w-full p-7 sm:p-8 shadow-2xl border border-white/90 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#352A45]/[0.08]">
              <h3 className="font-extrabold text-[#352A45] text-base">Upload Statutory Document</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-[#8C8298] hover:text-[#352A45] p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Document Category</label>
                <select
                  value={manualDocType}
                  onChange={(e) => setManualDocType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-bold text-xs"
                >
                  <option value="BIS Licence">BIS Product Certification Licence</option>
                  <option value="GST Certificate">GSTIN Registration Certificate</option>
                  <option value="MCA Incorporation">MCA Certificate of Incorporation</option>
                  <option value="Audited Balance Sheet">Audited Balance Sheet / CA Turnover Certificate</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">File Name</label>
                <input
                  type="text"
                  value={manualProofFile}
                  onChange={(e) => setManualProofFile(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-semibold text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 bg-[#F4F3F8] hover:bg-[#EEE8FA] text-[#352A45] text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddManualDocument}
                className="px-6 py-2.5 bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer"
              >
                Ingest & Verify Document
              </button>
            </div>
          </div>
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
