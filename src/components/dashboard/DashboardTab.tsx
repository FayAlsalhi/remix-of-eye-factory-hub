import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, CheckCircle, XCircle, TrendingUp, TrendingDown, Filter, AlertTriangle, Bell, Radio, MapPin, Clock } from 'lucide-react';
import liveFeedImg from '@/assets/live-feed-solar-panel.jpg';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
} from 'recharts';
import insightCard from '@/assets/insight-card.jpg';

const DashboardTab = () => {
  const { t } = useLanguage();

  // Sparkline datasets
  const spark = (vals: number[]) => vals.map((v, i) => ({ i, v }));

  const stats = [
    {
      label: t.totalInspected,
      value: '12,248',
      icon: Eye,
      trend: '+8.2%',
      trendUp: true,
      stroke: 'hsl(160, 70%, 55%)',
      fill: 'hsl(160, 70%, 55%)',
      data: spark([20, 24, 22, 28, 26, 30, 34, 32, 38, 42, 40, 46]),
    },
    {
      label: t.passedPanels,
      value: '11,356',
      icon: CheckCircle,
      trend: '+8.4%',
      trendUp: true,
      stroke: 'hsl(150, 75%, 55%)',
      fill: 'hsl(150, 75%, 55%)',
      data: spark([18, 22, 20, 26, 30, 28, 32, 36, 34, 40, 44, 48]),
    },
    {
      label: t.defectivePanels,
      value: '892',
      icon: XCircle,
      trend: '+5.7%',
      trendUp: false,
      stroke: 'hsl(0, 75%, 60%)',
      fill: 'hsl(0, 75%, 60%)',
      data: spark([30, 28, 32, 26, 34, 30, 36, 32, 38, 30, 36, 28]),
    },
    {
      label: t.conformanceRate,
      value: '92.6%',
      icon: TrendingUp,
      trend: '+3.2%',
      trendUp: true,
      stroke: 'hsl(190, 90%, 55%)',
      fill: 'hsl(190, 90%, 55%)',
      data: spark([60, 62, 61, 64, 66, 65, 68, 70, 69, 72, 74, 76]),
    },
  ];

  // Inspection trend (hourly)
  const trendData = Array.from({ length: 13 }, (_, i) => {
    const hour = i * 2;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      passed: 700 + Math.round(Math.sin(i / 2) * 80) + i * 6,
      defective: 180 + Math.round(Math.cos(i / 2) * 40),
      pending: 90 + Math.round(Math.sin(i) * 20),
      maintenance: 40 + Math.round(Math.cos(i) * 10),
    };
  });

  const sectors = [
    { name: 'Sector A-12', dot: 'bg-emerald-400', total: '2,456', passed: '2,276', defective: '180', rate: '92.7%', score: '88/100', trend: 'hsl(150,75%,55%)' },
    { name: 'Sector B-08', dot: 'bg-rose-500', total: '2,189', passed: '2,011', defective: '158', rate: '92.8%', score: '87/100', trend: 'hsl(0,75%,60%)' },
    { name: 'Sector C-15', dot: 'bg-amber-400', total: '1,987', passed: '1,834', defective: '153', rate: '92.3%', score: '86/100', trend: 'hsl(45,90%,55%)' },
    { name: 'Sector D-20', dot: 'bg-sky-400', total: '1,742', passed: '1,612', defective: '130', rate: '92.5%', score: '85/100', trend: 'hsl(190,90%,55%)' },
  ];

  // Health gauge values
  const healthScore = 87;
  const gaugeCircumference = 2 * Math.PI * 70; // r=70
  const gaugeOffset = gaugeCircumference - (healthScore / 100) * gaugeCircumference * 0.75;

  return (
    <div className="space-y-6 bg-[#050B16] p-2">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">System Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time overview of your solar panel analysis system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
            {['Today', '7D', '30D', '90D'].map((p, i) => (
              <button
                key={p}
                className={`px-3 py-1.5 rounded-lg transition ${
                  i === 0
                    ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-muted-foreground hover:text-foreground transition">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-3xl font-semibold text-foreground tracking-tight">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {s.trendUp ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-rose-400" />
                    )}
                    <span className={`text-xs font-medium ${s.trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {s.trend}
                    </span>
                  </div>
                </div>
                <div className="w-24 h-12 -mb-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={s.data}>
                      <defs>
                        <linearGradient id={`spark-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={s.fill} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={s.fill} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={s.stroke}
                        strokeWidth={1.8}
                        fill={`url(#spark-${idx})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspection trend + Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h3 className="text-base font-semibold text-foreground">Inspection Trend</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Passed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Defective
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Maintenance
              </span>
              <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-foreground ml-2">
                <option>Hourly</option>
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(5,11,22,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="passed" stroke="hsl(150,75%,55%)" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="defective" stroke="hsl(0,75%,60%)" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="pending" stroke="hsl(45,90%,55%)" strokeWidth={2} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="maintenance" stroke="hsl(190,90%,55%)" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Production card */}
        {(() => {
          const output = 740;
          const max = 2000;
          const pct = output / max;
          const r = 56;
          const c = 2 * Math.PI * r;
          const arcLen = c * 0.75;
          const filled = arcLen * pct;
          return (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#050B16] to-[#071426] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.1)] w-full h-full min-h-[260px] p-6 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#28E7E0]/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-[#F5A623]/5 blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 relative">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                    <Zap className="w-4 h-4 text-[#28E7E0]" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Energy Production</h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
                  Farm Online
                </div>
              </div>

              <div className="flex items-center gap-4 relative">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 160 160" className="w-full h-full -rotate-[135deg]">
                    <defs>
                      <linearGradient id="energyGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#28E7E0" />
                        <stop offset="100%" stopColor="#F5A623" />
                      </linearGradient>
                    </defs>
                    <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" strokeDasharray={`${arcLen} ${c}`} strokeLinecap="round" />
                    <circle cx="80" cy="80" r={r} fill="none" stroke="url(#energyGrad)" strokeWidth="10" strokeDasharray={`${filled} ${c}`} strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px rgba(40,231,224,0.5))' }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-foreground tracking-tight">
                      {output}<span className="text-sm text-[#28E7E0] ml-0.5">W</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Output</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative h-32">
                  <svg viewBox="0 0 160 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#28E7E0" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#0d2538" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="battGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#28E7E0" />
                        <stop offset="100%" stopColor="#F5A623" />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="28" r="10" fill="#F5A623" opacity="0.9" />
                    <g stroke="#F5A623" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
                      <line x1="32" y1="10" x2="32" y2="14" />
                      <line x1="32" y1="42" x2="32" y2="46" />
                      <line x1="14" y1="28" x2="18" y2="28" />
                      <line x1="46" y1="28" x2="50" y2="28" />
                      <line x1="19" y1="15" x2="22" y2="18" />
                      <line x1="42" y1="38" x2="45" y2="41" />
                      <line x1="45" y1="15" x2="42" y2="18" />
                      <line x1="22" y1="38" x2="19" y2="41" />
                    </g>
                    <g transform="translate(70, 50)">
                      <polygon points="0,30 60,30 70,55 -10,55" fill="url(#panelGrad)" stroke="#28E7E0" strokeWidth="0.6" opacity="0.9" />
                      <line x1="20" y1="30" x2="13" y2="55" stroke="#28E7E0" strokeWidth="0.4" opacity="0.5" />
                      <line x1="40" y1="30" x2="43" y2="55" stroke="#28E7E0" strokeWidth="0.4" opacity="0.5" />
                      <line x1="-5" y1="42" x2="65" y2="42" stroke="#28E7E0" strokeWidth="0.4" opacity="0.5" />
                    </g>
                    <g transform="translate(15, 70)">
                      <rect x="0" y="0" width="32" height="40" rx="4" fill="none" stroke="#28E7E0" strokeWidth="1" opacity="0.8" />
                      <rect x="11" y="-3" width="10" height="3" rx="1" fill="#28E7E0" opacity="0.8" />
                      <rect x="3" y="20" width="26" height="17" rx="2" fill="url(#battGrad)" opacity="0.85" />
                      <rect x="3" y="10" width="26" height="8" rx="2" fill="#28E7E0" opacity="0.3" />
                    </g>
                    <g fill="#28E7E0">
                      <circle cx="55" cy="78" r="1.2" opacity="0.8" />
                      <circle cx="62" cy="80" r="1" opacity="0.5" />
                      <circle cx="50" cy="76" r="1" opacity="0.5" />
                    </g>
                  </svg>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs relative">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Peak Today</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">1.82 <span className="text-[#28E7E0]">kW</span></p>
                </div>
                <div className="h-8 w-px bg-white/5" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Efficiency</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">86<span className="text-[#F5A623]">%</span></p>
                </div>
                <div className="h-8 w-px bg-white/5" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_currentColor]" />
                    Active
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Active Inspections in Period (heatmap) */}
      {(() => {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        const rand = (n: number) => {
          const x = Math.sin(n * 9301 + 49297) * 233280;
          return x - Math.floor(x);
        };
        const weeks = 53;
        const CELL = 10;
        const GAP = 3;
        const grid: number[][] = Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: weeks }, (_, w) => {
            const r2 = rand(r * 53 + w);
            if (r2 < 0.45) return 0;
            if (r2 < 0.7) return Math.floor(r2 * 20) + 1;
            if (r2 < 0.88) return Math.floor(r2 * 30) + 11;
            if (r2 < 0.97) return Math.floor(r2 * 50) + 31;
            return Math.floor(r2 * 40) + 61;
          })
        );
        const colorFor = (v: number) => {
          if (v === 0) return { bg: '#081018', glow: 'none' };
          if (v <= 10) return { bg: '#0d3b25', glow: 'none' };
          if (v <= 30) return { bg: '#15803d', glow: 'none' };
          if (v <= 60) return { bg: '#22c55e', glow: '0 0 5px rgba(34,197,94,0.4)' };
          return { bg: '#4ade80', glow: '0 0 8px rgba(74,222,128,0.8)' };
        };
        const gridWidth = weeks * CELL + (weeks - 1) * GAP;
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div
              className="lg:col-span-2 rounded-[18px] border bg-gradient-to-br from-[#050B16] to-[#071426] backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,220,0.08)]"
              style={{ borderColor: 'rgba(0,255,220,0.12)', padding: 24 }}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-300" />
                  <h3 className="text-base font-semibold text-foreground">Active Inspections in Period</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>Less</span>
                  {[0, 5, 20, 45, 80].map((v, i) => {
                    const c = colorFor(v);
                    return (
                      <span
                        key={i}
                        className="inline-block rounded-[2px]"
                        style={{ width: 10, height: 10, background: c.bg, boxShadow: c.glow }}
                      />
                    );
                  })}
                  <span>More</span>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                {/* Heatmap */}
                <div className="flex-1 min-w-0">
                  <div className="w-full" style={{ maxWidth: gridWidth + 24 }}>
                    {/* Months row */}
                    <div className="flex mb-1.5" style={{ marginLeft: 24, width: gridWidth }}>
                      {months.map((m) => (
                        <div
                          key={m}
                          className="text-[10px] text-muted-foreground"
                          style={{ flex: '1 1 0', minWidth: 0 }}
                        >
                          {m}
                        </div>
                      ))}
                    </div>

                    <div className="flex">
                      {/* Day labels */}
                      <div className="flex flex-col" style={{ gap: GAP, marginRight: 6, width: 18 }}>
                        {days.map((d) => (
                          <div
                            key={d}
                            className="text-[9px] text-muted-foreground flex items-center"
                            style={{ height: CELL }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Cells grid */}
                      <div className="flex flex-col" style={{ gap: GAP }}>
                        {grid.map((row, ri) => (
                          <div key={ri} className="flex" style={{ gap: GAP }}>
                            {row.map((v, ci) => {
                              const c = colorFor(v);
                              return (
                                <div
                                  key={ci}
                                  title={`${v} inspections`}
                                  style={{
                                    width: CELL,
                                    height: CELL,
                                    borderRadius: 3,
                                    background: c.bg,
                                    boxShadow: c.glow,
                                    flexShrink: 0,
                                  }}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right summary column */}
                <div className="flex flex-col justify-between gap-4 min-w-[140px] border-l border-white/5 pl-5 self-stretch">
                  {[
                    { label: 'Year 2026', value: '242', sub: 'Total Inspections' },
                    { label: 'This Month', value: '28', sub: 'Total Inspections' },
                    { label: 'Today', value: '3', sub: 'Total Inspections' },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                      <p className="text-2xl font-semibold text-foreground tracking-tight mt-0.5">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Defect Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Defect Distribution */}
        {(() => {
          const defects = [
            { label: 'Dust', value: 38, color: '#F59E0B' },
            { label: 'Bird Droppings', value: 24, color: '#FBBF24' },
            { label: 'Cracks', value: 18, color: '#F43F5E' },
            { label: 'Snow', value: 12, color: '#22D3EE' },
            { label: 'Clean', value: 8, color: '#10B981' },
          ];
          const total = defects.reduce((a, b) => a + b.value, 0);
          const r = 56;
          const c = 2 * Math.PI * r;
          let acc = 0;
          return (
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">Defect Distribution</h3>
                <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-foreground">
                  <option>7D</option>
                </select>
              </div>
              <div className="flex items-center justify-center my-2">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                    {defects.map((d, i) => {
                      const len = (d.value / total) * c;
                      const seg = (
                        <circle
                          key={i}
                          cx="80"
                          cy="80"
                          r={r}
                          fill="none"
                          stroke={d.color}
                          strokeWidth="14"
                          strokeDasharray={`${len} ${c - len}`}
                          strokeDashoffset={-acc}
                          strokeLinecap="butt"
                          style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.25))' }}
                        />
                      );
                      acc += len;
                      return seg;
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-foreground">{total}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">defects</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-1.5">
                {defects.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                      {d.label}
                    </span>
                    <span className="text-foreground font-medium">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Sector performance + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm">
          <h3 className="text-base font-semibold text-foreground mb-4">Sector Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-white/5">
                  <th className="text-left font-normal py-3 pr-4">Sector</th>
                  <th className="text-left font-normal py-3 pr-4">Total Inspected</th>
                  <th className="text-left font-normal py-3 pr-4">Passed</th>
                  <th className="text-left font-normal py-3 pr-4">Defective</th>
                  <th className="text-left font-normal py-3 pr-4">Conformance Rate</th>
                  <th className="text-left font-normal py-3">Avg. Health Score</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((s, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-foreground">{s.total}</td>
                    <td className="py-3 pr-4 text-foreground">{s.passed}</td>
                    <td className="py-3 pr-4 text-foreground">{s.defective}</td>
                    <td className="py-3 pr-4 text-foreground">{s.rate}</td>
                    <td className="py-3 text-muted-foreground">{s.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Health gauge */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-foreground">System Health</h3>
          </div>
          <div className="flex-1 flex items-center justify-center my-4">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 180 180" className="w-full h-full -rotate-[135deg]">
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="12"
                  strokeDasharray={`${gaugeCircumference * 0.75} ${gaugeCircumference}`}
                  strokeLinecap="round"
                />
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  fill="none"
                  stroke="url(#healthGrad)"
                  strokeWidth="12"
                  strokeDasharray={`${(healthScore / 100) * gaugeCircumference * 0.75} ${gaugeCircumference}`}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.5))' }}
                />
                <defs>
                  <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="hsl(190,90%,55%)" />
                    <stop offset="100%" stopColor="hsl(160,75%,55%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-semibold text-foreground">{healthScore}</span>
                <span className="text-xs text-muted-foreground">/100</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400">Healthy</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            AI systems are running optimally
          </p>
          <div className="mt-4 flex justify-center">
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-foreground">
              <option>Today</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
