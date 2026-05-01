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

        {/* Insight card */}
        <div className="rounded-2xl border border-white/10 overflow-hidden relative shadow-[0_0_30px_rgba(0,108,158,0.1)]">
          <img
            src={insightCard}
            alt="Your model is in the top 15% performing models"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Recent Alerts + Live Feed + Defect Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Alerts */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-300" />
              <h3 className="text-base font-semibold text-foreground">Recent Alerts</h3>
            </div>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">View all</span>
          </div>
          <div className="space-y-3">
            {[
              { sev: 'Critical', color: 'rose', dot: 'bg-rose-500', ring: 'border-rose-500/30 bg-rose-500/10 text-rose-300', title: 'Cracks detected on panel surface', loc: 'SP-001 · Sector A-12', time: '2m ago' },
              { sev: 'Warning', color: 'amber', dot: 'bg-amber-400', ring: 'border-amber-400/30 bg-amber-400/10 text-amber-300', title: 'Heavy dust accumulation', loc: 'SP-047 · Sector B-08', time: '14m ago' },
              { sev: 'Info', color: 'sky', dot: 'bg-sky-400', ring: 'border-sky-400/30 bg-sky-400/10 text-sky-300', title: 'Inspection completed', loc: 'Sector C-15', time: '38m ago' },
              { sev: 'Warning', color: 'amber', dot: 'bg-amber-400', ring: 'border-amber-400/30 bg-amber-400/10 text-amber-300', title: 'Bird droppings detected', loc: 'SP-112 · Sector D-20', time: '1h ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition">
                <span className={`mt-1.5 w-2 h-2 rounded-full ${a.dot} shadow-[0_0_8px_currentColor]`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm text-foreground truncate">{a.title}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${a.ring}`}>{a.sev}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.loc}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Feed (RGB) */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-300" />
              <h3 className="text-base font-semibold text-foreground">Live Feed (RGB)</h3>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-cyan-300 cursor-pointer hover:text-cyan-200">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_currentColor]" />
              View live
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <img src={liveFeedImg} alt="Live RGB feed of solar panel with detected defects" className="w-full h-44 object-cover" />
            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-rose-500/90 text-white font-semibold tracking-wide shadow-[0_0_10px_rgba(244,63,94,0.5)]">
              ● DEFECTIVE
            </span>
            <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-foreground border border-white/10 backdrop-blur-sm">
              SP-001
            </span>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-foreground/90 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-white/10">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-300" />Sector A-12</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-300" />14:23:08</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs text-foreground">Cracks — heavy</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300">98% confidence</span>
          </div>
        </div>

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
                  <th className="text-left font-normal py-3 pr-4">Avg. Health Score</th>
                  <th className="text-left font-normal py-3">Trend</th>
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
                    <td className="py-3 pr-4 text-muted-foreground">{s.score}</td>
                    <td className="py-3">
                      <svg width="80" height="22" viewBox="0 0 80 22">
                        <polyline
                          fill="none"
                          stroke={s.trend}
                          strokeWidth="1.5"
                          points="0,14 10,10 20,12 30,8 40,11 50,6 60,9 70,5 80,8"
                        />
                      </svg>
                    </td>
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
