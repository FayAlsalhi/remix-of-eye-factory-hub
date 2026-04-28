import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, CheckCircle, Video, Clock, Filter, X, Sparkles, FileText, Brain, Zap, MessageSquare } from 'lucide-react';
import solarDusty from '@/assets/solar-panel-dusty.jpg';
import solarCracked from '@/assets/solar-panel-cracked.jpg';
import solarClean from '@/assets/solar-panel-clean.jpg';
import solarPhysicalDamage from '@/assets/solar-panel-physical-damage.jpg';
import solarElectricalDamage from '@/assets/solar-panel-electrical-damage.jpg';
import solarSnow from '@/assets/solar-panel-snow.jpg';
import solarBirdDroppings from '@/assets/solar-panel-bird-droppings.jpg';

const LiveFeedTab = () => {
  const { t } = useLanguage();
  const alertsSectionRef = useRef<HTMLDivElement>(null);

  const alerts = [
    {
      id: 'SP-001',
      type: 'physicalDamage',
      image: solarPhysicalDamage,
      time: '10:32 AM',
      healthScore: 35,
      label: t.physicalDamage,
      description: 'Cracks or fractures caused by pressure, weather, or material aging.',
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      boxColor: 'border-red-500',
      isDefective: true,
      boxPosition: { top: '35%', left: '30%', width: '40%', height: '30%' },
    },
    {
      id: 'SP-002',
      type: 'snowCoverage',
      image: solarSnow,
      time: '10:25 AM',
      healthScore: 40,
      label: t.snowCoverage,
      description: 'Accumulation of snow blocking sunlight from reaching the cells.',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      boxColor: 'border-blue-500',
      isDefective: true,
      boxPosition: { top: '60%', left: '20%', width: '60%', height: '30%' },
    },
    {
      id: 'SP-003',
      type: 'birdDroppings',
      image: solarBirdDroppings,
      time: '10:20 AM',
      healthScore: 60,
      label: t.birdDroppings,
      description: 'Environmental residues reducing light absorption and energy output.',
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      boxColor: 'border-yellow-500',
      isDefective: true,
      boxPosition: { top: '35%', left: '35%', width: '35%', height: '35%' },
    },
    {
      id: 'SP-004',
      type: 'dust',
      image: solarDusty,
      time: '10:15 AM',
      healthScore: 72,
      label: t.dust,
      description: 'Dust accumulation reducing panel efficiency.',
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      boxColor: 'border-yellow-500',
      isDefective: true,
      boxPosition: { top: '20%', left: '25%', width: '50%', height: '40%' },
    },
    {
      id: 'SP-005',
      type: 'clean',
      image: solarClean,
      time: '10:05 AM',
      healthScore: 98,
      label: t.clean,
      description: 'Panel is in optimal condition.',
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      boxColor: 'border-green-500',
      isDefective: false,
      boxPosition: null,
    },
  ];

  const detectionTypes = [
    { key: 'physicalDamage', label: 'Physical Damage', dot: 'bg-red-500' },
    { key: 'snowCoverage', label: 'Snow Coverage', dot: 'bg-blue-400' },
    { key: 'dust', label: 'Dust Accumulation', dot: 'bg-yellow-400' },
    { key: 'birdDroppings', label: 'Bird Droppings', dot: 'bg-amber-500' },
    { key: 'other', label: 'Other', dot: 'bg-slate-400' },
  ];

  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredAlerts = useMemo(() => {
    if (!filterType) return alerts;
    if (filterType === 'other') {
      const known = ['physicalDamage', 'snowCoverage', 'dust', 'birdDroppings'];
      return alerts.filter((a) => !known.includes(a.type));
    }
    return alerts.filter((a) => a.type === filterType);
  }, [filterType]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    detectionTypes.forEach((dt) => {
      if (dt.key === 'other') {
        const known = ['physicalDamage', 'snowCoverage', 'dust', 'birdDroppings'];
        counts[dt.key] = alerts.filter((a) => !known.includes(a.type)).length;
      } else {
        counts[dt.key] = alerts.filter((a) => a.type === dt.key).length;
      }
    });
    return counts;
  }, []);

  const handleTypeClick = (key: string) => {
    setFilterType(key);
    setTimeout(() => {
      alertsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const currentFilterLabel = filterType
    ? detectionTypes.find((d) => d.key === filterType)?.label
    : 'All types';

  return (
    <div className="space-y-6">
      {/* Top: Image preview + Detection Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Image Preview */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="relative">
              <img
                src={selectedAlert.image}
                alt={`Solar Panel ${selectedAlert.id}`}
                className="w-full h-72 object-cover"
              />
              {selectedAlert.isDefective && selectedAlert.boxPosition && (
                <div
                  className={`absolute border-3 ${selectedAlert.boxColor} rounded pointer-events-none`}
                  style={{
                    top: selectedAlert.boxPosition.top,
                    left: selectedAlert.boxPosition.left,
                    width: selectedAlert.boxPosition.width,
                    height: selectedAlert.boxPosition.height,
                    borderWidth: '3px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className={`absolute -top-5 left-0 px-2 py-0.5 text-xs font-bold rounded ${selectedAlert.color}`}>
                    {selectedAlert.label}
                  </div>
                </div>
              )}
              <div
                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${
                  selectedAlert.isDefective ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'
                }`}
              >
                {selectedAlert.isDefective ? t.defectivePanel : t.passedPanel}
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">{selectedAlert.description}</p>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{t.serialNumber}</p>
                  <p className="font-semibold text-foreground">{selectedAlert.id}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{t.inspectionTime}</p>
                  <p className="font-semibold text-foreground">{selectedAlert.time}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{t.healthScore}</p>
                  <p
                    className={`font-semibold ${
                      selectedAlert.healthScore > 70
                        ? 'text-green-400'
                        : selectedAlert.healthScore > 50
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {selectedAlert.healthScore}%
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{t.defectiveType}</p>
                  <p className="font-semibold text-foreground">{selectedAlert.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: AI Copilot + Detection Summary */}
        <div className="space-y-6">
        {/* AI Copilot - Smart Tools Panel */}
        <div className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/40 via-yellow-500/20 to-amber-600/30 transition-all duration-300 hover:from-amber-300/60 hover:via-yellow-400/40 hover:to-amber-500/50">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.25),transparent_60%)] blur-2xl" />
          </div>
          <div className="relative bg-gradient-to-br from-[#1a1408] via-card to-[#0f0a04] rounded-2xl p-4 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/30 to-yellow-600/20 border border-amber-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-300 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent leading-tight">AI Copilot</h3>
                  <p className="text-[10px] text-amber-200/60 mt-0.5">Smart analysis & instant reporting</p>
                </div>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-amber-300/80 font-medium px-1.5 py-0.5 rounded border border-amber-400/30 bg-amber-400/5">AI</span>
            </div>

            {/* Quick Actions grid */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {[
                { icon: FileText, label: 'Create Report' },
                { icon: Brain, label: 'AI Summary' },
                { icon: Zap, label: 'Deep Analysis' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-amber-400/5 border border-amber-400/15 hover:border-amber-300/50 hover:bg-amber-400/10 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[9.5px] text-amber-100/80 font-medium text-center leading-tight">{label}</span>
                </button>
              ))}
            </div>

            {/* Ask AI primary button */}
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 text-[#1a1408] text-xs font-semibold shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:brightness-110 transition-all">
              <MessageSquare className="w-3.5 h-3.5" />
              Ask AI
            </button>
          </div>
        </div>

        {/* Detection Summary */}
        <div className="bg-gradient-to-br from-card to-card/60 border border-border rounded-2xl p-5 backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)]">
          {/* Camera status header */}
          <div className="space-y-3 pb-4 border-b border-border/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 ring-2 ring-card animate-pulse" />
                </div>
                <span className="text-sm font-semibold text-foreground">Camera Online</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-green-400 font-medium">Live</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/40 rounded-lg p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  28 <span className="text-muted-foreground font-normal">/ 32</span>
                </p>
              </div>
              <div className="bg-secondary/40 rounded-lg p-2.5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Uptime
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">2h 34m</p>
              </div>
            </div>
          </div>

          {/* Detection Summary list */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Detection Summary</h3>
            <div className="space-y-2">
              {detectionTypes.map((dt) => {
                const active = filterType === dt.key;
                return (
                  <button
                    key={dt.key}
                    onClick={() => handleTypeClick(dt.key)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left group ${
                      active
                        ? 'border-cyan-500/50 bg-cyan-500/10'
                        : 'border-border/60 bg-secondary/30 hover:border-cyan-500/40 hover:bg-secondary/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${dt.dot}`} />
                      <span className="text-sm text-foreground">{dt.label}</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-cyan-400">
                      {typeCounts[dt.key]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Alerts section */}
      <div ref={alertsSectionRef} className="space-y-4 scroll-mt-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-foreground">{t.realTimeAlerts}</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span>
                Showing alerts for:{' '}
                <span className="text-foreground font-medium">{currentFilterLabel}</span>
              </span>
            </div>
            {filterType && (
              <button
                onClick={() => setFilterType(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary/60 hover:bg-secondary border border-border text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
            No alerts found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedAlert.id === alert.id ? 'border-primary' : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${alert.color}`}>
                    {alert.isDefective ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.id}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${alert.color} whitespace-nowrap`}>
                    {alert.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveFeedTab;
