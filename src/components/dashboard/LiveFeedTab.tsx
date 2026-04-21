import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import solarDusty from '@/assets/solar-panel-dusty.jpg';
import solarCracked from '@/assets/solar-panel-cracked.jpg';
import solarClean from '@/assets/solar-panel-clean.jpg';
import solarPhysicalDamage from '@/assets/solar-panel-physical-damage.jpg';
import solarElectricalDamage from '@/assets/solar-panel-electrical-damage.jpg';
import solarSnow from '@/assets/solar-panel-snow.jpg';
import solarBirdDroppings from '@/assets/solar-panel-bird-droppings.jpg';

const LiveFeedTab = () => {
  const { t } = useLanguage();

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

  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-foreground">{t.realTimeAlerts}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts List - Left side */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
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
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{alert.id}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs border ${alert.color}`}>
                  {alert.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Image Preview - Right side */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Image with detection box overlay */}
            <div className="relative">
              <img
                src={selectedAlert.image}
                alt={`Solar Panel ${selectedAlert.id}`}
                className="w-full h-72 object-cover"
              />
              {/* Detection Box Overlay */}
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
              {/* Status Badge */}
              <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${
                selectedAlert.isDefective 
                  ? 'bg-red-500/90 text-white' 
                  : 'bg-green-500/90 text-white'
              }`}>
                {selectedAlert.isDefective ? t.defectivePanel : t.passedPanel}
              </div>
            </div>

            {/* Panel Info below image */}
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
                  <p className={`font-semibold ${selectedAlert.healthScore > 70 ? 'text-green-400' : selectedAlert.healthScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
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
      </div>
    </div>
  );
};

export default LiveFeedTab;
