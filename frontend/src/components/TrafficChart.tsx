import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { MetricSpark } from './AstraIcons';

interface DataPoint {
  time: string;
  verified: number;
  compliant: number;
  qualified: number;
  baseline: number;
}

const defaultData: DataPoint[] = [
  { time: '0', verified: 17, compliant: 24, qualified: 19, baseline: 11 },
  { time: '5K', verified: 16, compliant: 15, qualified: 16, baseline: 10 },
  { time: '10K', verified: 11, compliant: 14, qualified: 13, baseline: 8 },
  { time: '15K', verified: 12, compliant: 16, qualified: 15, baseline: 9 },
  { time: '20K', verified: 17, compliant: 15, qualified: 14, baseline: 8 },
  { time: '25K', verified: 19, compliant: 13, qualified: 14, baseline: 7 },
  { time: '30K', verified: 15, compliant: 13, qualified: 13, baseline: 7 },
  { time: '35K', verified: 13, compliant: 12, qualified: 13, baseline: 7 },
  { time: '40K', verified: 18, compliant: 15, qualified: 14, baseline: 8 },
  { time: '45K', verified: 17, compliant: 16, qualified: 14, baseline: 8 },
  { time: '50K', verified: 12, compliant: 18, qualified: 14, baseline: 8 },
];

export const TrafficChart: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('Jun 2026');

  return (
    <div className="porcelain-card p-6 sm:p-7 rounded-[26px] border border-white/80 bg-white/85 backdrop-blur-xl shadow-xs">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#352A45]/[0.06] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E738B]">
              Deterministic Compliance & Bid Volume Telemetry
            </h3>
            <span className="text-[10px] font-bold bg-[#E6F3EA] text-[#0D5438] px-2 py-0.2 rounded">
              Live
            </span>
          </div>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl font-extrabold text-[#352A45] tracking-tight metric-counter">86%</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E8E62] bg-[#E6F3EA] px-2 py-0.5 rounded-full border border-[#1E8E62]/20">
                <TrendingUp className="w-3 h-3" />
                +32% AI Verification Speed
              </span>
            </div>
            <div className="h-8 w-px bg-[#352A45]/[0.08] hidden sm:block" />
            <div className="hidden sm:block">
              <div className="text-2xl font-extrabold text-[#6750A4]">₹18.5 Cr</div>
              <div className="text-[10px] text-[#8C8298] font-bold">₹2.4 Cr protected against substandard bids</div>
            </div>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-1 bg-[#FAF9FD] border border-[#352A45]/[0.08] rounded-xl px-2 py-1 text-xs font-bold text-[#352A45]">
          <button
            onClick={() => setCurrentMonth('May 2026')}
            className="p-1 hover:bg-[#EEE8FA] rounded-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-[#8C8298]" />
          </button>
          <span className="px-2 font-extrabold text-[#352A45]">{currentMonth}</span>
          <button
            onClick={() => setCurrentMonth('Jul 2026')}
            className="p-1 hover:bg-[#EEE8FA] rounded-md transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 text-[#8C8298]" />
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={defaultData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE8F5" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C8298', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C8298', fontSize: 11 }}
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1D162B',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#EEE8FA',
                fontSize: '11px',
                padding: '10px 14px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
              }}
              itemStyle={{ color: '#EEE8FA' }}
            />
            <Line
              type="monotone"
              dataKey="verified"
              stroke="#6750A4"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#6750A4' }}
              name="Verified Registries"
            />
            <Line
              type="monotone"
              dataKey="compliant"
              stroke="#1E8E62"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#1E8E62' }}
              name="Compliant Specifications"
            />
            <Line
              type="monotone"
              dataKey="qualified"
              stroke="#2970FF"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="QCBS Qualified Bids"
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#D48806"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
              name="Benchmark Floor"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#352A45]/[0.06] text-[11px] font-bold text-[#6C617A]">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6750A4]" />
            Verified Registries (BIS/GST)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E8E62]" />
            Compliant Specifications
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2970FF]" />
            QCBS Qualified Bids
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D48806]" />
            GeM Floor Baseline
          </span>
        </div>
      </div>
    </div>
  );
};
