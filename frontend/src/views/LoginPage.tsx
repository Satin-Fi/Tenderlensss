import React, { useState } from 'react';
import type { User } from '../types';
import {
  TenderLensLogo,
  GeMShield,
  AiScanner,
  RedFlagRadar,
  RupeeCoin,
  VerifiedVendor,
  AuditChain,
  BisLicenceSeal,
} from '../components/AstraIcons';
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface LoginPageProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

type Portal = 'officer' | 'vendor';

interface Persona {
  user: User;
  name: string;
  email: string;
  organization: string;
  portal: Portal;
  initials: string;
}

const DEMO_PASSWORD = 'tenderlens';

function readString(user: User, keys: string[]): string {
  const record = user as unknown as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return '';
}

function toPersona(user: User): Persona {
  const name =
    readString(user, ['name', 'fullName', 'displayName', 'companyName']) ||
    'TenderLens member';
  const email = readString(user, ['email', 'emailAddress']);
  const role = readString(user, ['role', 'userType', 'type']);
  const organization = readString(user, [
    'organization',
    'department',
    'company',
    'companyName',
    'ministry',
  ]);

  const isVendor =
    /vendor|supplier|bidder|contractor/i.test(role) ||
    (!/officer|government|admin|evaluator/i.test(role) &&
      /ultratech|tata steel|supreme industries|ashoka buildcon/i.test(name));

  const fallbackOrganization = /sharma/i.test(name)
    ? 'Ministry of Jal Shakti · Drinking Water'
    : /verma/i.test(name)
      ? 'CPWD · Chief Engineer'
      : isVendor
        ? 'Empanelled procurement supplier'
        : 'Government evaluation officer';

  const initials = name
    .replace(/^(shri|smt|mr|mrs|ms|dr)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return {
    user,
    name,
    email,
    organization: organization || fallbackOrganization,
    portal: isVendor ? 'vendor' : 'officer',
    initials,
  };
}

const avatarColors = [
  'bg-[#EEE8FA] text-[#625079]',
  'bg-[#E6F3EA] text-[#476953]',
  'bg-[#E8F0FC] text-[#50678A]',
  'bg-[#FFF3D6] text-[#866D37]',
];

function IconTile({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center [&_svg]:h-full [&_svg]:w-full ${className}`}
    >
      {children}
    </span>
  );
}

export default function LoginPage({
  users,
  onSelectUser,
}: LoginPageProps) {
  const [portal, setPortal] = useState<Portal>('officer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const personas = users.map(toPersona);
  const visiblePersonas = personas.filter((persona) => persona.portal === portal);
  const isOfficer = portal === 'officer';

  function switchPortal(nextPortal: Portal) {
    setPortal(nextPortal);
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
  }

  function enterAs(persona: Persona) {
    setPassword('');
    setError('');

    try {
      onSelectUser(persona.user);
    } catch {
      setError('We couldn’t open this workspace. Please try again.');
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const match = visiblePersonas.find(
      (persona) =>
        persona.email &&
        persona.email.toLowerCase() === email.trim().toLowerCase(),
    );

    // This component selects supplied demo users; it does not authenticate.
    // Production password authentication must be handled by a trusted backend.
    if (!match || password !== DEMO_PASSWORD) {
      setError(
        'Use an email from this portal’s demo profiles and the demo password “tenderlens”.',
      );
      return;
    }

    enterAs(match);
  }

  return (
    <div className="tl-login relative isolate min-h-screen overflow-x-hidden bg-[#F8F9FB] font-sans text-[#352A45] antialiased selection:bg-[#DDD1F1] selection:text-[#352A45]">
      <style>{`
        .tl-login {
          --tl-focus: #786293;
          background-image:
            radial-gradient(ellipse at 4% 18%, #eee8fa 0%, transparent 42%),
            radial-gradient(ellipse at 97% 40%, #e8f0fc 0%, transparent 40%),
            radial-gradient(ellipse at 45% 100%, #e6f3ea 0%, transparent 45%);
        }
        .tl-login :where(button, input):focus-visible {
          outline: 3px solid var(--tl-focus);
          outline-offset: 4px;
        }
        .tl-login .tl-enter {
          animation: tl-enter 420ms cubic-bezier(.2,.7,.2,1) both;
        }
        .tl-login .tl-porcelain {
          box-shadow:
            0 24px 80px -35px rgba(53,42,69,.22),
            0 4px 20px -12px rgba(53,42,69,.12),
            inset 0 1px 0 rgba(255,255,255,.95);
        }
        .tl-login .tl-persona {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.95),
            0 2px 4px rgba(53,42,69,.02);
        }
        .tl-login .tl-persona:hover {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 8px 24px -12px rgba(53,42,69,.22);
        }
        .tl-login input:-webkit-autofill {
          -webkit-text-fill-color: #352A45;
          -webkit-box-shadow: 0 0 0 1000px #fbfafc inset;
        }
        @keyframes tl-enter {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tl-login *, .tl-login *::before, .tl-login *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="relative z-10 border-b border-[#352A45]/[0.07] bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex min-h-12 max-w-[1440px] flex-wrap items-center justify-between gap-x-5 gap-y-2 px-5 py-3 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6F6679] sm:text-[11px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E6F3EA]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#53816A]" />
            </span>
            National Procurement Intelligence Network
          </div>

          <div className="flex items-center gap-2 text-[10px] font-medium tracking-wide text-[#55705F] sm:text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            GFR 2017 / GeM v3.2 Verified
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid w-full max-w-[1320px] items-center gap-12 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[calc(100svh-145px)] lg:grid-cols-[1fr_1.08fr] lg:gap-16 lg:px-12 lg:py-12 xl:gap-24">
        <section aria-labelledby="tl-intro-title" className="tl-enter min-w-0">
          <div className="mb-9 flex items-center gap-3 lg:mb-14">
            <IconTile className="h-12 w-12 rounded-2xl border border-white bg-white/75 p-2 shadow-[0_6px_20px_-10px_rgba(53,42,69,0.25)]">
              <TenderLensLogo />
            </IconTile>
            <div>
              <p className="text-[25px] font-semibold leading-none tracking-[-0.06em]">
                TenderLens<span className="text-[#8A719F]">.</span>
              </p>
              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7C7188]">
                Clarity. Compliance. Confidence.
              </p>
            </div>
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white bg-white/65 px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C75AC]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#756286]">
              Procurement, with perspective
            </span>
          </div>

          <h1
            id="tl-intro-title"
            className="max-w-lg text-[42px] font-medium leading-[1.08] tracking-[-0.055em] sm:text-[54px] lg:text-[58px]"
          >
            Public procurement.
            <br />
            <span className="text-[#8C78A3]">Private peace of mind.</span>
          </h1>

          <p className="mt-6 max-w-[400px] text-[15px] leading-7 text-[#776D82]">
            From the first bid to the final decision. Verify every credential,
            surface every risk, and move forward with evidence.
          </p>

          <div className="tl-porcelain relative mt-9 hidden max-w-[430px] rounded-[24px] border border-white/90 bg-white/55 p-5 backdrop-blur-xl sm:block lg:mt-11">
            <div className="absolute -right-5 -top-6 -z-10 h-32 w-32 rounded-full bg-[#FFF3D6]/80 blur-2xl" />

            <div className="flex items-center justify-between gap-3 border-b border-[#352A45]/[0.07] pb-4">
              <div className="flex items-center gap-2.5">
                <IconTile className="h-9 w-9 rounded-xl bg-[#EEE8FA] p-1.5">
                  <AiScanner />
                </IconTile>
                <div>
                  <p className="text-xs font-semibold">An intelligence layer.</p>
                  <p className="mt-0.5 text-[11px] text-[#81758D]">
                    Across your entire evaluation.
                  </p>
                </div>
              </div>
              <span className="rounded-md border border-[#352A45]/[0.06] bg-white/70 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#81758D]">
                AI assisted
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5 py-5">
              {[
                {
                  icon: <GeMShield />,
                  title: 'Policy-aligned',
                  description: 'GFR & GeM checks',
                  color: 'bg-[#E8F0FC]',
                },
                {
                  icon: <RedFlagRadar />,
                  title: 'Risk-aware',
                  description: 'Early red-flag detection',
                  color: 'bg-[#EEE8FA]',
                },
                {
                  icon: <RupeeCoin />,
                  title: 'Value-conscious',
                  description: 'Financial scrutiny',
                  color: 'bg-[#FFF3D6]',
                },
                {
                  icon: <VerifiedVendor />,
                  title: 'Evidence-led',
                  description: 'Vendor verification',
                  color: 'bg-[#E6F3EA]',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-2.5">
                  <IconTile
                    className={`h-8 w-8 rounded-lg p-1.5 ${feature.color}`}
                  >
                    {feature.icon}
                  </IconTile>
                  <div className="pt-0.5">
                    <p className="text-[11px] font-semibold">{feature.title}</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#82778D]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-[#E6F3EA]/65 px-3 py-2.5 text-[10px] font-medium text-[#5A7864]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Human judgment at the center. Intelligence all around.
            </div>
          </div>

          <p className="mt-6 hidden items-center gap-2 text-[11px] text-[#8A8093] lg:flex">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Built for accountable decisions. Designed for you.
          </p>
        </section>

        <section
          aria-labelledby="tl-login-title"
          className="tl-porcelain tl-enter relative min-w-0 rounded-[28px] border border-white/90 bg-white/75 p-5 backdrop-blur-2xl sm:p-8 lg:p-9"
          style={{ animationDelay: '80ms' }}
        >
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#96839F]">
                Your procurement workspace
              </p>
              <h2
                id="tl-login-title"
                className="text-[28px] font-semibold leading-tight tracking-[-0.045em]"
              >
                Welcome to clarity.
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#81758D]">
                Choose your portal or jump in directly with a verified persona.
              </p>
            </div>
            <IconTile className="hidden h-11 w-11 rounded-2xl border border-white bg-white/80 p-2 shadow-sm sm:flex">
              <AuditChain />
            </IconTile>
          </div>

          {/* Portal Switcher Tabs */}
          <div className="mb-6 flex rounded-2xl border border-[#352A45]/[0.08] bg-[#F2F0F7] p-1.5">
            <button
              type="button"
              onClick={() => switchPortal('officer')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                isOfficer
                  ? 'bg-white text-[#352A45] shadow-sm'
                  : 'text-[#7B7088] hover:text-[#352A45]'
              }`}
            >
              <GeMShield className="w-4 h-4" />
              <span>Government Officers</span>
            </button>
            <button
              type="button"
              onClick={() => switchPortal('vendor')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                !isOfficer
                  ? 'bg-white text-[#352A45] shadow-sm'
                  : 'text-[#7B7088] hover:text-[#352A45]'
              }`}
            >
              <VerifiedVendor className="w-4 h-4" />
              <span>Empanelled Suppliers</span>
            </button>
          </div>

          {/* Quick 1-Click Persona Cards */}
          <div className="mb-6 space-y-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#91859D]">
              Fast-Access Demo Personas (1-Click)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {visiblePersonas.map((persona, idx) => (
                <button
                  key={persona.email || idx}
                  type="button"
                  onClick={() => enterAs(persona)}
                  className="tl-persona group flex items-start gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#6750A4]/30"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                      avatarColors[idx % avatarColors.length]
                    }`}
                  >
                    {persona.initials || 'TL'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#352A45] group-hover:text-[#6750A4]">
                      {persona.name}
                    </p>
                    <p className="truncate text-[10px] text-[#81758D]">
                      {persona.organization}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-[#1E8E62]">
                      <span className="h-1 w-1 rounded-full bg-[#1E8E62]" /> Active
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#B2A8C0] transition-transform group-hover:translate-x-0.5 group-hover:text-[#6750A4]" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#352A45]/[0.08]" />
            </div>
            <span className="relative bg-white/80 px-3 text-[10px] uppercase tracking-wider text-[#998EA5]">
              Or sign in with email
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-[#D92D20]/20 bg-[#FDECEE] p-3 text-xs font-medium text-[#7A170F]">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="tl-email"
                className="mb-1.5 block text-xs font-semibold text-[#544863]"
              >
                Official Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-[#998EA5]" />
                <input
                  id="tl-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isOfficer
                      ? 'officer@cpwd.gov.in'
                      : 'contact@ultratech.com'
                  }
                  className="w-full rounded-xl border border-[#352A45]/[0.12] bg-white/90 py-2.5 pl-10 pr-4 text-xs font-medium placeholder-[#A499B0] transition-colors focus:border-[#6750A4] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="tl-password"
                  className="text-xs font-semibold text-[#544863]"
                >
                  Password
                </label>
                <span className="text-[10px] text-[#81758D]">
                  Demo: <code className="font-mono text-[#6750A4]">tenderlens</code>
                </span>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-[#998EA5]" />
                <input
                  id="tl-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#352A45]/[0.12] bg-white/90 py-2.5 pl-10 pr-10 text-xs font-medium transition-colors focus:border-[#6750A4] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-[#998EA5] hover:text-[#352A45]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6750A4] to-[#4D3C7C] py-3 px-4 text-xs font-bold text-white shadow-[0_8px_20px_-6px_rgba(103,80,164,0.4)] transition-all hover:brightness-105 active:scale-[0.99]"
            >
              <span>Access Secure Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Security Badges Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#352A45]/[0.08] pt-4 text-[10px] text-[#8C8097]">
            <div className="flex items-center gap-1.5">
              <BisLicenceSeal className="w-3.5 h-3.5" />
              <span>IS/ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AuditChain className="w-3.5 h-3.5" />
              <span>Rule 144(xi) GFR 2017 Compliant</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export { LoginPage };
