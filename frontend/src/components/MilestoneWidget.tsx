import React from 'react';
import { MetricSpark, ShieldCompliance } from './AstraIcons';

interface MilestoneWidgetProps {
  title?: string;
  metric?: string;
  description?: string;
  milestoneLabel?: string;
  startLabel?: string;
  endLabel?: string;
  percentage?: number;
  secondaryTitle?: string;
  secondaryPercentage?: number;
}

export const MilestoneWidget: React.FC<MilestoneWidgetProps> = ({
  title = "Procurement Milestone Overview",
  metric = "₹18.5 Cr",
  description = "Scrutinized 75% of mandatory tender compliance criteria. All critical alerts logged to immutable vault.",
  milestoneLabel = "Scrutiny to next statutory milestone",
  startLabel = "₹10 Cr",
  endLabel = "₹25 Cr",
  percentage = 68,
  secondaryTitle = "Statutory BIS Verification Clearance",
  secondaryPercentage = 75
}) => {
  const totalBars = 26;
  const primaryFilledBars = Math.round((percentage / 100) * totalBars);
  const secondaryFilledBars = Math.round((secondaryPercentage / 100) * totalBars);

  return (
    <div className="porcelain-card porcelain-card-hover p-6 rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-xs space-y-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#7E738B] mb-1">{title}</div>
        <div className="text-2xl font-extrabold tracking-tight text-[#352A45] metric-counter">{metric}</div>
        <p className="text-xs text-[#7A7088] leading-relaxed mt-1">
          {description}
        </p>
      </div>

      {/* Primary Vertical Bars Milestone */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-[#352A45] mb-2">
          <span>{milestoneLabel}</span>
          <span className="text-[#6750A4] font-extrabold">{percentage}%</span>
        </div>
        <div className="flex items-center gap-1.5 h-6 p-1 rounded-xl bg-[#F6F4FB] border border-[#352A45]/[0.06]">
          {Array.from({ length: totalBars }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-full rounded-xs transition-all duration-300 ${
                idx < primaryFilledBars
                  ? 'bg-gradient-to-t from-[#6750A4] to-[#8C75AC] shadow-xs'
                  : 'bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#8C8298] mt-1.5 font-bold">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      </div>

      {/* Secondary Mint Vertical Bars Milestone */}
      <div className="pt-2 border-t border-[#352A45]/[0.06]">
        <div className="flex items-center justify-between text-xs font-bold text-[#352A45] mb-2">
          <span>{secondaryTitle}</span>
          <span className="text-[#1E8E62] font-extrabold">{secondaryPercentage}%</span>
        </div>
        <div className="flex items-center gap-1.5 h-5 p-1 rounded-xl bg-[#F6F4FB] border border-[#352A45]/[0.06]">
          {Array.from({ length: totalBars }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-full rounded-xs transition-all duration-300 ${
                idx < secondaryFilledBars
                  ? 'bg-gradient-to-t from-[#1E8E62] to-[#34A87C] shadow-xs'
                  : 'bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#8C8298] mt-1.5 font-bold">
          <span>{secondaryPercentage}% Compliant</span>
          <span>100% Target Registry Clearance</span>
        </div>
      </div>
    </div>
  );
};
