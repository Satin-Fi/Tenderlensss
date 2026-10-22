import React, { useState, useEffect } from 'react';
import {
  TenderLensLogo,
  GeMShield,
  BisLicenceSeal,
  VerifiedVendor,
  RupeeCoin,
  AuditChain
} from '../components/AstraIcons';
import {
  Building2,
  FileCheck,
  Award,
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Save
} from 'lucide-react';
import { VendorProfile } from '../types';
import { api } from '../services/api';

interface VendorProfileWizardProps {
  onProfileUpdated: () => void;
}

export const VendorProfileWizard: React.FC<VendorProfileWizardProps> = ({ onProfileUpdated }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<VendorProfile>>({
    company_name: '',
    gstin: '',
    cin: '',
    pan: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    directors: [],
    categories_supplied: [],
    annual_turnover: 0,
    past_projects: [],
    bis_licences: [],
    completeness_pct: 50
  });

  const [newDirector, setNewDirector] = useState('');
  const [newProject, setNewProject] = useState({ client: '', project: '', value: 10000000, year: '2025' });
  const [newLicence, setNewLicence] = useState({ licence_no: '', is_code: 'IS 269:2015', product_name: 'Ordinary Portland Cement', valid_upto: '2028-03-31', status: 'Valid' });

  useEffect(() => {
    api.getVendorProfile().then((p) => {
      setFormData(p);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.updateVendorProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      onProfileUpdated();
    } catch (e) {
      console.error("Failed to save profile:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleCategory = (cat: string) => {
    const cats = formData.categories_supplied || [];
    if (cats.includes(cat)) {
      setFormData({ ...formData, categories_supplied: cats.filter(c => c !== cat) });
    } else {
      setFormData({ ...formData, categories_supplied: [...cats, cat] });
    }
  };

  const handleAddDirector = () => {
    if (!newDirector.trim()) return;
    setFormData({
      ...formData,
      directors: [...(formData.directors || []), newDirector.trim()]
    });
    setNewDirector('');
  };

  const handleRemoveDirector = (index: number) => {
    setFormData({
      ...formData,
      directors: (formData.directors || []).filter((_, i) => i !== index)
    });
  };

  const handleAddProject = () => {
    if (!newProject.project.trim()) return;
    setFormData({
      ...formData,
      past_projects: [...(formData.past_projects || []), { ...newProject }]
    });
    setNewProject({ client: '', project: '', value: 10000000, year: '2025' });
  };

  const handleRemoveProject = (index: number) => {
    setFormData({
      ...formData,
      past_projects: (formData.past_projects || []).filter((_, i) => i !== index)
    });
  };

  const handleAddLicence = () => {
    if (!newLicence.licence_no.trim()) return;
    setFormData({
      ...formData,
      bis_licences: [...(formData.bis_licences || []), { ...newLicence }]
    });
    setNewLicence({ licence_no: '', is_code: 'IS 269:2015', product_name: 'Ordinary Portland Cement', valid_upto: '2028-03-31', status: 'Valid' });
  };

  const handleRemoveLicence = (index: number) => {
    setFormData({
      ...formData,
      bis_licences: (formData.bis_licences || []).filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-[#6750A4] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-[#8C8298]">Loading enterprise profile credentials...</p>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Company & Statutory IDs', icon: Building2 },
    { number: 2, title: 'Categories & Turnover', icon: Layers },
    { number: 3, title: 'Past Track Record', icon: FileCheck },
    { number: 4, title: 'BIS Certification', icon: Award }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Wizard Header */}
      <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/80 backdrop-blur-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold bg-[#E6F3EA] text-[#0D5438] px-2.5 py-0.5 rounded-full border border-[#1E8E62]/20">
              CLASS-1 LOCAL SUPPLIER VERIFIED
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#352A45] tracking-tight">
            Vendor Profile Builder Wizard
          </h1>
          <p className="text-xs text-[#7A7088] mt-0.5">
            Configure statutory identifiers and licenses for instant AI eligibility scoring against tenders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#EEE8FA] border border-[#6750A4]/20 px-3.5 py-1.5 rounded-xl shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#6750A4]" />
            <span className="text-xs font-extrabold text-[#6750A4]">
              {formData.completeness_pct}% Completeness
            </span>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold rounded-2xl shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : saveSuccess ? 'Profile Saved!' : 'Save Progress'}</span>
          </button>
        </div>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.number;
          const isDone = currentStep > s.number;

          return (
            <button
              key={s.number}
              onClick={() => setCurrentStep(s.number)}
              className={`porcelain-card p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-[#6750A4] bg-white shadow-sm ring-2 ring-[#6750A4]/20'
                  : isDone
                  ? 'border-[#1E8E62]/30 bg-[#E6F3EA]/30 text-[#0D5438]'
                  : 'border-white/80 bg-white/60 text-[#8C8298]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  isActive ? 'bg-[#6750A4] text-white' : isDone ? 'bg-[#E6F3EA] text-[#0D5438]' : 'bg-[#F2EFF7] text-[#8C8298]'
                }`}>
                  STEP {s.number}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E62]" />}
              </div>
              <div className="text-xs font-bold text-[#352A45] flex items-center gap-1.5 truncate">
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#6750A4]' : 'text-[#8C8298]'}`} />
                <span className="truncate">{s.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* STEP 1: COMPANY & STATUTORY IDS */}
      {currentStep === 1 && (
        <div className="porcelain-card p-7 sm:p-8 rounded-[28px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-5">
          <div className="border-b border-[#352A45]/[0.06] pb-3">
            <h3 className="font-extrabold text-[#352A45] text-base">Corporate & Statutory Identifiers</h3>
            <p className="text-xs text-[#8C8298]">Verified against MCA21, GST Portal & Income Tax Database</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Company Legal Entity Name</label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-bold text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">GSTIN (15 Digits)</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-mono font-bold text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Corporate Identity Number (CIN)</label>
              <input
                type="text"
                value={formData.cin}
                onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-mono text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Permanent Account Number (PAN)</label>
              <input
                type="text"
                value={formData.pan}
                onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-mono font-bold text-xs"
              />
            </div>
          </div>

          {/* Directors List */}
          <div>
            <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-2">Registered Board of Directors (CVC Debarment Scrutiny)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add director full name..."
                value={newDirector}
                onChange={(e) => setNewDirector(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-semibold"
              />
              <button
                type="button"
                onClick={handleAddDirector}
                className="px-4 py-2.5 rounded-xl bg-[#EEE8FA] hover:bg-[#6750A4] hover:text-white text-[#6750A4] text-xs font-bold transition-all cursor-pointer"
              >
                + Add Director
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.directors?.map((dir, i) => (
                <span key={i} className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-[#FAF9FD] border border-[#352A45]/[0.08] text-xs font-bold text-[#352A45]">
                  <span>{dir}</span>
                  <button onClick={() => handleRemoveDirector(i)} className="text-[#8C8298] hover:text-[#D92D20]">✕</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: CATEGORIES & TURNOVER */}
      {currentStep === 2 && (
        <div className="porcelain-card p-7 sm:p-8 rounded-[28px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-6">
          <div className="border-b border-[#352A45]/[0.06] pb-3">
            <h3 className="font-extrabold text-[#352A45] text-base">Categories Supplied & Financial Capacity</h3>
            <p className="text-xs text-[#8C8298]">Determines procurement quota eligibility and threshold qualification</p>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-2.5">Procurement Categories Supplied</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {['Cement', 'TMT Steel', 'PVC Pipes', 'Services'].map((cat) => {
                const selected = formData.categories_supplied?.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleToggleCategory(cat)}
                    className={`p-3.5 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#EEE8FA] text-[#6750A4] border-[#6750A4]/30 shadow-xs'
                        : 'bg-[#FAF9FD] text-[#8C8298] border-[#352A45]/[0.08]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#8C8298] uppercase block mb-1">Average Annual Turnover (INR)</label>
            <input
              type="number"
              value={formData.annual_turnover}
              onChange={(e) => setFormData({ ...formData, annual_turnover: parseFloat(e.target.value) || 0 })}
              className="w-full p-3 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-[#352A45] font-extrabold text-sm"
            />
            <p className="text-[11px] text-[#8C8298] mt-1 font-semibold">
              Current: ₹{((formData.annual_turnover || 0) / 10000000).toFixed(2)} Crore (Certified by CA)
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: PAST PROJECTS */}
      {currentStep === 3 && (
        <div className="porcelain-card p-7 sm:p-8 rounded-[28px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-6">
          <div className="border-b border-[#352A45]/[0.06] pb-3">
            <h3 className="font-extrabold text-[#352A45] text-base">Past Government & Enterprise Track Record</h3>
            <p className="text-xs text-[#8C8298]">Satisfies GFR Rule 173 past experience eligibility clauses</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              placeholder="Client (e.g. NHAI / CPWD)"
              value={newProject.client}
              onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
              className="p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-semibold"
            />
            <input
              type="text"
              placeholder="Project description"
              value={newProject.project}
              onChange={(e) => setNewProject({ ...newProject, project: e.target.value })}
              className="p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-semibold"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Value (INR)"
                value={newProject.value}
                onChange={(e) => setNewProject({ ...newProject, value: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-semibold"
              />
              <button
                type="button"
                onClick={handleAddProject}
                className="px-4 py-2.5 bg-[#6750A4] text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {formData.past_projects?.map((proj, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-[#352A45] block">{proj.project}</span>
                  <span className="text-[10px] text-[#8C8298] font-bold">{proj.client} · Year {proj.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-[#1E8E62]">₹{(proj.value / 10000000).toFixed(2)} Cr</span>
                  <button onClick={() => handleRemoveProject(i)} className="text-[#8C8298] hover:text-[#D92D20]">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: BIS CERTIFICATION */}
      {currentStep === 4 && (
        <div className="porcelain-card p-7 sm:p-8 rounded-[28px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs space-y-6">
          <div className="border-b border-[#352A45]/[0.06] pb-3">
            <h3 className="font-extrabold text-[#352A45] text-base">BIS / ISI Licences (Manakonline)</h3>
            <p className="text-xs text-[#8C8298]">Mandatory for Cement (IS 269), Steel (IS 1786), and PVC (IS 4985)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <input
              type="text"
              placeholder="Licence CM/L-..."
              value={newLicence.licence_no}
              onChange={(e) => setNewLicence({ ...newLicence, licence_no: e.target.value })}
              className="p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-mono font-bold"
            />
            <input
              type="text"
              placeholder="IS Code (IS 269:2015)"
              value={newLicence.is_code}
              onChange={(e) => setNewLicence({ ...newLicence, is_code: e.target.value })}
              className="p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-mono font-bold"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newLicence.product_name}
              onChange={(e) => setNewLicence({ ...newLicence, product_name: e.target.value })}
              className="p-2.5 rounded-xl border border-[#352A45]/[0.1] bg-[#FAF9FD] text-xs font-semibold"
            />
            <button
              type="button"
              onClick={handleAddLicence}
              className="px-4 py-2.5 bg-[#6750A4] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              + Ingest Licence
            </button>
          </div>

          <div className="space-y-2.5">
            {formData.bis_licences?.map((lic, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#352A45]/[0.06] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-[#6750A4]">{lic.licence_no}</span>
                    <span className="text-[10px] font-bold bg-[#EEE8FA] text-[#6750A4] px-2 py-0.5 rounded-md">{lic.is_code}</span>
                  </div>
                  <span className="text-[11px] text-[#6C617A] mt-1 block font-medium">{lic.product_name} · Valid upto {lic.valid_upto}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold bg-[#E6F3EA] text-[#0D5438] px-2.5 py-0.5 rounded-full border border-[#1E8E62]/30">
                    OPERATIVE
                  </span>
                  <button onClick={() => handleRemoveLicence(i)} className="text-[#8C8298] hover:text-[#D92D20]">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stepper Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-xl border border-[#352A45]/[0.1] bg-white text-[#352A45] text-xs font-semibold hover:bg-[#FAF9FD] transition-all cursor-pointer disabled:opacity-40"
        >
          ← Previous Step
        </button>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] hover:brightness-105 text-white text-xs font-extrabold shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            <span>Next: Step {currentStep + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#1E8E62] to-[#126846] hover:brightness-105 text-white text-xs font-extrabold shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finalize & Update Profile</span>
          </button>
        )}
      </div>
    </div>
  );
};
