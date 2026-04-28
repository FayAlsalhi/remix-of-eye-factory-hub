import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Loader2, Zap, Snowflake, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import solarPanelImg from '@/assets/solar-panel-physical-damage.jpg';

type Severity = 'critical' | 'warning' | 'normal';

interface Detection {
  label: string;
  severity: Severity;
  // bounding box in % (left, top, width, height)
  box: { left: number; top: number; width: number; height: number };
}

type RecTone = 'red' | 'blue' | 'amber';

interface Recommendation {
  title: string;
  description: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  cta: string;
  icon: React.ReactNode;
  tone: RecTone;
}

const recTones: Record<RecTone, { card: string; iconWrap: string; pill: string; button: string }> = {
  red: {
    card: 'border-red-500/40 bg-gradient-to-br from-red-950/40 via-[#1a0a10] to-[#0a0508] shadow-[0_0_25px_rgba(239,68,68,0.08)] hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]',
    iconWrap: 'text-red-400',
    pill: 'bg-red-500/15 text-red-400 border-red-500/40',
    button: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/40',
  },
  blue: {
    card: 'border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-[#0a1424] to-[#05080f] shadow-[0_0_25px_rgba(59,130,246,0.08)] hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
    iconWrap: 'text-blue-400',
    pill: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
    button: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/40',
  },
  amber: {
    card: 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-[#1a1408] to-[#0a0805] shadow-[0_0_25px_rgba(251,191,36,0.08)] hover:shadow-[0_0_30px_rgba(251,191,36,0.18)]',
    iconWrap: 'text-amber-400',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    button: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40',
  },
};

interface RecentUpload {
  fileName: string;
  sector: string;
  uploadedAt: string;
  result: 'Physical Damage' | 'Snow Coverage' | 'Clean' | 'Dust Accumulation';
}

const severityStyles: Record<Severity, { dot: string; pill: string; border: string; label: string }> = {
  critical: {
    dot: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
    pill: 'bg-red-500/15 text-red-400 border-red-500/30',
    border: 'border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.5)]',
    label: 'Critical',
  },
  warning: {
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    border: 'border-amber-400/70 shadow-[0_0_12px_rgba(251,191,36,0.5)]',
    label: 'Warning',
  },
  normal: {
    dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    border: 'border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.5)]',
    label: 'Normal',
  },
};

const detections: Detection[] = [
  { label: 'Physical Damage', severity: 'critical', box: { left: 12, top: 18, width: 26, height: 22 } },
  { label: 'Snow Coverage', severity: 'warning', box: { left: 55, top: 12, width: 32, height: 28 } },
  { label: 'Dust Accumulation', severity: 'warning', box: { left: 30, top: 58, width: 38, height: 24 } },
];

const recommendations: Recommendation[] = [
  {
    title: 'Repair Cracked Cells',
    priority: 'High Priority',
    cta: 'Repair Now',
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    title: 'Clean Snow',
    priority: 'Medium Priority',
    cta: 'Schedule Cleaning',
    icon: <CalendarClock className="w-4 h-4" />,
  },
  {
    title: 'Clean Panels',
    priority: 'Medium Priority',
    cta: 'Schedule Cleaning',
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const recentUploads: RecentUpload[] = [
  { fileName: 'panel_A12.jpg', sector: 'Sector A', uploadedAt: '2026-04-28 09:14', result: 'Physical Damage' },
  { fileName: 'panel_B07.jpg', sector: 'Sector B', uploadedAt: '2026-04-28 09:02', result: 'Snow Coverage' },
  { fileName: 'panel_C21.jpg', sector: 'Sector C', uploadedAt: '2026-04-28 08:48', result: 'Clean' },
  { fileName: 'panel_A05.jpg', sector: 'Sector A', uploadedAt: '2026-04-28 08:30', result: 'Dust Accumulation' },
  { fileName: 'panel_D14.jpg', sector: 'Sector D', uploadedAt: '2026-04-28 08:11', result: 'Clean' },
];

const resultStyles: Record<RecentUpload['result'], string> = {
  'Physical Damage': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Snow Coverage': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Clean': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Dust Accumulation': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

const priorityStyles: Record<Recommendation['priority'], string> = {
  'High Priority': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Medium Priority': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Low Priority': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

const UploadTab = () => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      setIsAnalyzing(true);
      setHasResult(false);
      setTimeout(() => {
        setIsAnalyzing(false);
        setHasResult(true);
      }, 1800);
    }
  };

  const handleBrowse = () => fileInputRef.current?.click();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-[0_0_30px_rgba(0,108,158,0.05)]">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t.uploadFiles || 'Upload File'}</h3>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
          >
            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-foreground font-medium mb-2">{t.dropFilesHere}</p>
            <p className="text-sm text-muted-foreground mb-4">{t.supportedFormat}</p>
            <p className="text-muted-foreground mb-4">{t.or}</p>
            <button onClick={handleBrowse} className="text-primary hover:underline font-medium">
              {t.browseFiles}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <Button className="w-full mt-4" disabled={isAnalyzing} onClick={handleBrowse}>
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze File'
            )}
          </Button>
        </div>

        {/* Analysis Result */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-[0_0_30px_rgba(0,108,158,0.05)]">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t.analysisResults || 'Analysis Result'}
          </h3>

          {isAnalyzing ? (
            <div className="flex items-center justify-center h-72">
              <div className="text-center">
                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Analyzing image...</p>
              </div>
            </div>
          ) : hasResult ? (
            <div className="space-y-5">
              {/* Issue Map Card */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-[#0a1620] to-[#050B16] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">Issue Map</p>
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-2 py-0.5">
                    AI Detected
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Image with overlays */}
                  <div className="md:col-span-3 relative rounded-lg overflow-hidden border border-border/70">
                    <img src={solarPanelImg} alt="Analyzed solar panel" className="w-full h-56 object-cover" />
                    <div className="absolute inset-0">
                      {detections.map((d, i) => {
                        const s = severityStyles[d.severity];
                        return (
                          <div
                            key={i}
                            className={`absolute border-2 ${s.border} rounded-md`}
                            style={{
                              left: `${d.box.left}%`,
                              top: `${d.box.top}%`,
                              width: `${d.box.width}%`,
                              height: `${d.box.height}%`,
                            }}
                          >
                            <span className={`absolute -top-5 left-0 text-[10px] px-1.5 py-0.5 rounded ${s.pill} border whitespace-nowrap`}>
                              {d.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Defects list */}
                  <div className="md:col-span-2 space-y-2">
                    {detections.map((d, i) => {
                      const s = severityStyles[d.severity];
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                            <span className="text-sm text-foreground">{d.label}</span>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Recommendations</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendations.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border bg-gradient-to-br from-[#0a1620] to-[#050B16] p-4 hover:border-primary/40 transition-colors shadow-[0_0_20px_rgba(0,108,158,0.05)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                          {r.icon}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{r.title}</p>
                      </div>
                      <span
                        className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 ${priorityStyles[r.priority]}`}
                      >
                        {r.priority}
                      </span>
                      <Button size="sm" className="w-full h-8 text-xs">
                        {r.cta}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto border-2 border-dashed border-border rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-10 h-10" />
                </div>
                <p>Upload an image to see analysis results</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Uploads Table */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-[0_0_30px_rgba(0,108,158,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Uploads</h3>
          <span className="text-xs text-muted-foreground">{recentUploads.length} files</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 px-3 font-medium">File Name</th>
                <th className="py-3 px-3 font-medium">Sector</th>
                <th className="py-3 px-3 font-medium">Uploaded At</th>
                <th className="py-3 px-3 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 px-3 text-foreground font-medium">{row.fileName}</td>
                  <td className="py-3 px-3 text-muted-foreground">{row.sector}</td>
                  <td className="py-3 px-3 text-muted-foreground">{row.uploadedAt}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block text-[11px] px-2.5 py-1 rounded-full border ${resultStyles[row.result]}`}
                    >
                      {row.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadTab;
