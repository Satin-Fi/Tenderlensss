import React, { useMemo, useState } from 'react';
import { ShieldCheck, UserCheck, Building2, ArrowRight, Sparkles, LockKeyhole, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { User } from '../types';

interface LoginPageProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

const DEMO_PASSWORD = 'demo123';

export const LoginPage: React.FC<LoginPageProps> = ({ users, onSelectUser }) => {
  const officerUser = users.find(u => u.role === 'officer') || {
    id: 1,
    name: 'Rajesh Sharma',
    email: 'officer@cpwd.gov.in',
    role: 'officer' as const,
    department: 'Central Public Works Department (CPWD), New Delhi',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    created_at: new Date().toISOString()
  };
  const vendorUsers = users.filter(u => u.role === 'vendor');
  const defaultVendor = vendorUsers.find(v => v.email.includes('vendor_b')) || vendorUsers[0];
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  const selectedRole = selectedUser?.role;
  const vendorLabel = useMemo(() => selectedUser?.department || 'Vendor / Contractor', [selectedUser]);

  const choosePortal = (user: User) => {
    setSelectedUser(user);
    setEmail(user.email);
    setPassword('');
    setError('');
    setShowHint(false);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!selectedUser) {
      setError('Please select a portal first.');
      return;
    }
    if (email.trim().toLowerCase() !== selectedUser.email.toLowerCase()) {
      setError('Email does not match the selected demo account.');
      return;
    }
    if (password !== DEMO_PASSWORD) {
      setError('Incorrect demo password. Use the demo password shown below.');
      return;
    }
    onSelectUser(selectedUser);
  };

  return (
    <div className="min-h-screen login-shell flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl login-brand-mark text-white mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TenderLens</h1>
        <p className="mt-2 text-sm text-slate-600 font-medium">Verify the vendor's claims. Don't just read them.</p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full login-pill text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> AI Verification for Indian Procurement
        </div>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="login-card py-7 px-5 sm:px-8 rounded-3xl space-y-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] login-eyebrow">Secure demo access</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">Sign in to your portal</h2>
            <p className="mt-1 text-sm text-slate-600">Choose your role, then enter the demo credentials.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" onClick={() => choosePortal(officerUser)} aria-pressed={selectedRole === 'officer'} className={`portal-choice ${selectedRole === 'officer' ? 'portal-choice-active' : ''}`}>
              <span className="portal-icon officer-icon"><UserCheck className="w-5 h-5" /></span>
              <span className="block font-bold text-slate-900">Government Officer</span>
              <span className="block mt-1 text-xs text-slate-600">Publish tenders and review compliance</span>
              <span className="mt-3 flex items-center gap-2 text-xs font-semibold login-accent"><span className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden"><img src={officerUser.avatar_url} alt="" className="w-full h-full object-cover" /></span>{officerUser.name}</span>
            </button>
            <button type="button" onClick={() => defaultVendor && choosePortal(defaultVendor)} aria-pressed={selectedRole === 'vendor'} className={`portal-choice ${selectedRole === 'vendor' ? 'portal-choice-active portal-choice-vendor' : ''}`}>
              <span className="portal-icon vendor-icon"><Building2 className="w-5 h-5" /></span>
              <span className="block font-bold text-slate-900">Vendor / Contractor</span>
              <span className="block mt-1 text-xs text-slate-600">Check tenders and submit compliant bids</span>
              <span className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700"><span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center"><Building2 className="w-4 h-4" /></span>{defaultVendor?.department || 'Ultracem Infra Solutions'}</span>
            </button>
          </div>

          {selectedUser && (
            <form onSubmit={handleLogin} className="login-form-panel space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold login-eyebrow">Selected portal</p>
                  <p className="text-sm font-bold text-slate-900">{selectedRole === 'officer' ? 'Government Officer' : vendorLabel}</p>
                </div>
                <span className="login-demo-badge"><CheckCircle2 className="w-3.5 h-3.5" /> Demo account</span>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email address</span>
                <span className="login-input-wrap"><Mail className="w-4 h-4 text-slate-400" /><input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required className="login-input" placeholder="name@example.com" /></span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-700">Demo password</span>
                <span className="login-input-wrap"><LockKeyhole className="w-4 h-4 text-slate-400" /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required className="login-input" placeholder="Enter demo password" /><button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></span>
              </label>
              {error && <p role="alert" className="login-error">{error}</p>}
              <button type="submit" className="login-submit"><span>Sign in to TenderLens</span><ArrowRight className="w-4 h-4" /></button>
              <p className="text-center text-xs text-slate-500">Demo only — this does not provide production-grade security.</p>
            </form>
          )}

          {!selectedUser && <div className="login-instruction"><LockKeyhole className="w-4 h-4 shrink-0" /> Select a portal above to reveal the sign-in form.</div>}

          <div className="login-credentials">
            <button type="button" onClick={() => setShowHint(v => !v)} className="text-xs font-semibold login-accent hover:underline cursor-pointer">{showHint ? 'Hide demo credentials' : 'Need demo credentials?'}</button>
            {showHint && <div className="mt-2 text-xs text-slate-600 leading-relaxed">Choose a portal above. The email is prefilled for that demo account. Password for all demo accounts: <code className="rounded bg-white px-1.5 py-0.5 font-bold text-slate-800">{DEMO_PASSWORD}</code></div>}
            {vendorUsers.length > 1 && <div className="mt-4 pt-3 border-t border-[#D8D5E4]"><p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Try a specific vendor scenario</p><div className="flex flex-wrap gap-2">{vendorUsers.map(v => <button key={v.id} type="button" onClick={() => choosePortal(v)} className={`vendor-chip ${selectedUser?.id === v.id ? 'vendor-chip-active' : ''}`}>{v.department}</button>)}</div></div>}
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-500">TenderLens · Procurement integrity workspace</p>
      </div>
    </div>
  );
};
