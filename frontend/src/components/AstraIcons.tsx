import type { ReactNode } from "react";

export type TenderLensIconProps = {
  className?: string;
};

const palette = {
  lavender: "#EEE8FA",
  mint: "#E6F3EA",
  butter: "#FFF3D6",
  sky: "#E8F0FC",
  plum: "#352A45",
  red: "#D92D20",
} as const;

function IconFrame({
  className = "w-5 h-5",
  children,
}: TenderLensIconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke={palette.plum}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Abstract civic crest and optical lens; not an official national emblem. */
export function TenderLensLogo(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M12 3.5 19 7.5v8L12 19.5l-7-4v-8Z"
        fill={palette.lavender}
      />
      <path
        d="M12 7.5a4 4 0 0 1 0 8Z"
        fill={palette.sky}
        stroke="none"
      />
      <circle cx="12" cy="11.5" r="4" />
      <circle cx="12" cy="11.5" r="1.15" fill={palette.plum} stroke="none" />
      <path d="M12 1.5v2M2 5.5l1.5 1M22 5.5l-1.5 1" opacity=".45" />
      <path d="M8.5 21.5h7" />
    </IconFrame>
  );
}

export function GeMShield(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M12 2.5c2.3 1.7 5.1 2.8 8 3v6.2c0 4.4-3.3 7.5-8 9.8-4.7-2.3-8-5.4-8-9.8V5.5c2.9-.2 5.7-1.3 8-3Z"
        fill={palette.mint}
      />
      <path
        d="M12 2.5v19c-4.7-2.3-8-5.4-8-9.8V5.5c2.9-.2 5.7-1.3 8-3Z"
        fill={palette.sky}
        stroke="none"
      />
      <path d="m8.1 11.8 2.6 2.6 5.2-5.3" />
      <path d="M8.5 6.8 12 5.3l3.5 1.5" opacity=".35" />
    </IconFrame>
  );
}

export function AiScanner(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M7 4.5h7l3 3v12H7Z"
        fill={palette.sky}
        stroke="none"
      />
      <path
        d="M14 4.5v3h3"
        fill={palette.lavender}
        stroke="none"
      />
      <path d="M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4" />
      <path d="M9 7.5h2M9 16.5h6M9 19h3" opacity=".45" />
      <path d="M12 8.5 15 10.25v3.5L12 15.5l-3-1.75v-3.5Z" fill={palette.lavender} />
      <path d="M3 12h6m6 0h6" />
      <circle cx="12" cy="12" r="1" fill={palette.plum} stroke="none" />
    </IconFrame>
  );
}

export function QcbsGauge(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <circle cx="6.5" cy="11" r="4.5" fill={palette.lavender} />
      <circle cx="17.5" cy="11" r="4.5" fill={palette.butter} />
      <path d="m6.5 11 1.9-2.1M17.5 11l-1.8-1.6" />
      <circle cx="6.5" cy="11" r="1" fill={palette.plum} stroke="none" />
      <circle cx="17.5" cy="11" r="1" fill={palette.plum} stroke="none" />
      <path d="M6.5 6.5v1M17.5 6.5v1" opacity=".45" />
      <path d="M6.5 18v1.5h11V18M12 19.5V22" />
    </IconFrame>
  );
}

export function RedFlagRadar(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <circle cx="11" cy="12" r="8.5" fill={palette.sky} />
      <circle cx="11" cy="12" r="4.5" opacity=".35" />
      <path
        d="M11 12V3.5a8.5 8.5 0 0 1 6 2.5Z"
        fill={palette.lavender}
        stroke="none"
      />
      <path d="m11 12 5.6-5.6M11 3.5v1M2.5 12h1M11 19.5v1" />
      <circle cx="11" cy="12" r="1.2" fill={palette.plum} stroke="none" />
      <path d="M18 13.5v8" stroke={palette.red} />
      <path
        d="M18 13.5h4l-1 2 1 2h-4Z"
        fill={palette.red}
        stroke={palette.red}
      />
    </IconFrame>
  );
}

export function EvidenceLoupe(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M12.5 21H4V3h9l4 4v2"
        fill={palette.lavender}
      />
      <path d="M13 3v4h4M7 7h2M7 11h2M7 15h1" />
      <circle cx="14.5" cy="14" r="5" fill={palette.sky} />
      <path d="m18.1 17.6 3.4 3.4" />
      <path d="M14.5 11.5v1M14.5 15.5v1M12 14h1M16 14h1" opacity=".65" />
      <circle cx="14.5" cy="14" r=".75" fill={palette.plum} stroke="none" />
    </IconFrame>
  );
}

export function BisLicenceSeal(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="m12 2 2.6 1.8 3.2.1 1.1 3 2.5 2-.9 3.1.9 3.1-2.5 2-1.1 3-3.2.1L12 22l-2.6-1.8-3.2-.1-1.1-3-2.5-2 .9-3.1-.9-3.1 2.5-2 1.1-3 3.2-.1Z"
        fill={palette.butter}
      />
      <circle cx="12" cy="12" r="6" fill={palette.mint} />
      <path d="m8.8 12 2.1 2.2 4.3-4.4" />
      <path d="M10 17.6a6 6 0 0 0 4 0" opacity=".4" />
    </IconFrame>
  );
}

export function GstinBadge(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" fill={palette.sky} />
      <path
        d="M5.5 4.5h13a3 3 0 0 1 3 3V9h-19V7.5a3 3 0 0 1 3-3Z"
        fill={palette.lavender}
        stroke="none"
      />
      <path d="M2.5 9h19M6 13h4M6 16h2.5" />
      <path d="m13 14.5 2 2 3.5-4" />
      <path d="M6 7h2" opacity=".45" />
    </IconFrame>
  );
}

export function BlacklistAlert(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M12 2.5 20 6v5.5c0 4.3-3.3 7.6-8 10-4.7-2.4-8-5.7-8-10V6Z"
        fill={palette.lavender}
      />
      <path
        d="M12 2.5 20 6v5.5c0 4.3-3.3 7.6-8 10Z"
        fill={palette.butter}
        stroke="none"
      />
      <circle cx="12" cy="11.5" r="4.5" stroke={palette.red} />
      <path d="m8.8 14.7 6.4-6.4" stroke={palette.red} />
    </IconFrame>
  );
}

export function AuditChain(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="m9 13-1 1a3.54 3.54 0 0 1-5-5l4-4a3.54 3.54 0 0 1 5 0 3.5 3.5 0 0 1 1 3"
        fill={palette.lavender}
      />
      <path
        d="m15 11 1-1a3.54 3.54 0 0 1 5 5l-4 4a3.54 3.54 0 0 1-5 0 3.5 3.5 0 0 1-1-3"
        fill={palette.sky}
      />
      <path d="m8 12 8-4" opacity=".0" stroke="none" />
      <path d="m8.5 11.5 3-3M12.5 15.5l3-3" />
      <path
        d="m12 8 3.5 2v4L12 16l-3.5-2v-4Z"
        fill={palette.mint}
      />
      <path d="m10.5 12 1 1 2-2" />
    </IconFrame>
  );
}

export function RulebookCodex(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M12 6C9.2 3.8 5.8 3.2 2.5 4v15c3.3-.8 6.7-.2 9.5 2Z"
        fill={palette.lavender}
      />
      <path
        d="M12 6c2.8-2.2 6.2-2.8 9.5-2v15c-3.3-.8-6.7-.2-9.5 2Z"
        fill={palette.butter}
      />
      <path d="M6 8.5c.9.1 1.7.3 2.5.7M6 12c.9.1 1.7.3 2.5.7M6 15.5c.9.1 1.7.3 2.5.7" opacity=".55" />
      <path
        d="M15.5 4.3v7.2l1.5-1 1.5 1V3.8"
        fill={palette.mint}
      />
      <path d="M15.5 16.2c.8-.4 1.6-.6 2.5-.7" opacity=".55" />
    </IconFrame>
  );
}

export function RupeeCoin(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <circle cx="12" cy="12" r="9.5" fill={palette.butter} />
      <path
        d="M12 2.5a9.5 9.5 0 0 1 0 19Z"
        fill={palette.lavender}
        stroke="none"
      />
      <circle cx="12" cy="12" r="7" opacity=".25" />
      <path d="M8.5 7.5h7M8.5 10.5h7M10 7.5c4.7 0 4.7 6 0 6H8.5l6 4" />
    </IconFrame>
  );
}

export function MetricSpark(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="m3 16 5-5 4 3 8-9v15H3Z"
        fill={palette.mint}
        stroke="none"
      />
      <path
        d="m12 14 8-9v15h-8Z"
        fill={palette.sky}
        stroke="none"
      />
      <path d="M3 20h18" opacity=".35" />
      <path d="m3 16 5-5 4 3 8-9M15.5 5H20v4.5" />
      <circle cx="8" cy="11" r="1.15" fill={palette.plum} stroke="none" />
      <circle cx="12" cy="14" r="1.15" fill={palette.plum} stroke="none" />
    </IconFrame>
  );
}

export function VerifiedVendor(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="m6.5 13.5-2 8L9 19.7l3 1.8v-7Z"
        fill={palette.lavender}
      />
      <path
        d="m17.5 13.5 2 8L15 19.7l-3 1.8v-7Z"
        fill={palette.lavender}
      />
      <circle cx="12" cy="8.5" r="5.5" fill={palette.mint} />
      <path d="m9.5 8.5 1.8 1.8 3.5-3.6" />
    </IconFrame>
  );
}

export function DocumentVerified(props: TenderLensIconProps = {}) {
  return (
    <IconFrame {...props}>
      <path
        d="M6 3.5h8.5L19 8v12.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"
        fill={palette.sky}
      />
      <path d="M14.5 3.5v5H19" fill={palette.lavender} />
      <path d="M8.5 12h7M8.5 15.5h4.5" opacity=".45" />
      <circle cx="15.5" cy="16.5" r="3.5" fill={palette.mint} />
      <path d="m14 16.5 1.2 1.2 2-2.2" />
    </IconFrame>
  );
}

export const ShieldCompliance = GeMShield;

