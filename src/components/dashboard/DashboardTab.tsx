import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DashboardTab = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t.totalInspected, value: '1,248', icon: Eye, color: 'bg-primary/20 text-primary' },
    { label: t.passedPanels, value: '1,156', icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
    { label: t.defectivePanels, value: '92', icon: XCircle, color: 'bg-red-500/20 text-red-400' },
    { label: t.conformanceRate, value: '92.6%', icon: TrendingUp, color: 'bg-cyan-500/20 text-cyan-400' },
  ];

  const barData = [
    { name: 'Q1', passed: 280, defective: 20, pending: 15, maintenance: 10 },
    { name: 'Q2', passed: 310, defective: 25, pending: 12, maintenance: 8 },
    { name: 'Q3', passed: 290, defective: 22, pending: 18, maintenance: 12 },
    { name: 'Q4', passed: 276, defective: 25, pending: 14, maintenance: 9 },
  ];

  const pieData = [
    { name: 'Passed', value: 65, color: 'hsl(var(--primary))' },
    { name: 'Defective', value: 15, color: 'hsl(0, 70%, 50%)' },
    { name: 'Pending', value: 12, color: 'hsl(45, 70%, 50%)' },
    { name: 'Maintenance', value: 8, color: 'hsl(200, 70%, 50%)' },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <h2 className="text-xl font-semibold text-foreground">{t.overview}</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Reports Header */}
      <h2 className="text-xl font-semibold text-foreground">{t.detailedReports}</h2>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-primary"></span> Passed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Defective
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Pending
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span> Maintenance
              </span>
            </div>
            <select className="bg-secondary text-foreground text-sm rounded-lg px-3 py-1 border border-border">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Bar dataKey="passed" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              <Bar dataKey="defective" fill="hsl(0, 70%, 50%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(45, 70%, 50%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="maintenance" fill="hsl(200, 70%, 50%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
