import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MetricSpark } from './AstraIcons';

interface KpiCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  caption?: string;
  icon?: React.ReactNode;
  tone?: 'lavender' | 'mint' | 'butter' | 'sky' | 'rose';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  trend,
  trendType = 'positive',
  caption,
  icon,
  tone = 'lavender'
}) => {
  const isPositive = trendType === 'positive';
  const isNegative = trendType === 'negative';

  const toneConfig = {
    lavender: {
      border: 'hover:border-[#6750A4]/30',
      badgeBg: 'bg-[#EEE8FA]',
      badgeText: 'text-[#6750A4]',
      glow: 'shadow-[0_20px_48px_-24px_rgba(103,80,164,0.18)]'
    },
    mint: {
      border: 'hover:border-[#1E8E62]/30',
      badgeBg: 'bg-[#E6F3EA]',
      badgeText: 'text-[#1E8E62]',
      glow: 'shadow-[0_20px_48px_-24px_rgba(30,142,98,0.18)]'
    },
    butter: {
      border: 'hover:border-[#D48806]/30',
      badgeBg: 'bg-[#FFF3D6]',
      badgeText: 'text-[#D48806]',
      glow: 'shadow-[0_20px_48px_-24px_rgba(212,136,6,0.18)]'
    },
    sky: {
      border: 'hover:border-[#2970FF]/30',
      badgeBg: 'bg-[#E8F0FC]',
      badgeText: 'text-[#2970FF]',
      glow: 'shadow-[0_20px_48px_-24px_rgba(41,112,255,0.18)]'
    },
    rose: {
      border: 'hover:border-[#D92D20]/30',
      badgeBg: 'bg-[#FDECEE]',
      badgeText: 'text-[#D92D20]',
      glow: 'shadow-[0_20px_48px_-24px_rgba(217,45,32,0.18)]'
    }
  };

  const currentTone = toneConfig[tone] || toneConfig.lavender;

  return (
    <div
      className={`porcelain-card porcelain-card-hover p-5 sm:p-6 rounded-[22px] border border-white/80 bg-white/75 backdrop-blur-xl transition-all duration-200 relative overflow-hidden ${currentTone.border} ${currentTone.glow}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className={`p-2 rounded-xl ${currentTone.badgeBg} ${currentTone.badgeText} shrink-0`}>
              {icon}
            </div>
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7E738B]">{label}</span>
        </div>

        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-[#E6F3EA] text-[#1E8E62] border border-[#1E8E62]/20'
                : isNegative
                ? 'bg-[#FDECEE] text-[#D92D20] border border-[#D92D20]/20'
                : 'bg-[#EEE8FA] text-[#6750A4]'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : isNegative ? (
              <ArrowDownRight className="w-3.5 h-3.5" />
            ) : null}
            {trend}
          </span>
        )}
      </div>

      <div className="text-3xl font-extrabold tracking-tight text-[#352A45] mb-1.5 metric-counter">
        {value}
      </div>

      {caption && (
        <div className="text-xs text-[#8C8298] font-medium flex items-center justify-between">
          <span>{caption}</span>
          <MetricSpark className="w-4 h-4 opacity-40 text-[#6750A4]" />
        </div>
      )}
    </div>
  );
};
