import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalysisResult {
  id: string;
  label: string;
  time: string;
  healthScore: number;
  defectiveType: string;
  isDefective: boolean;
  color: string;
}

const UploadTab = () => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defectTypes = [
    { label: t.physicalDamage || 'Physical Damage', color: 'text-red-400' },
    { label: t.snowCoverage || 'Snow Coverage', color: 'text-blue-400' },
    { label: t.birdDroppings || 'Bird Droppings', color: 'text-yellow-400' },
    { label: t.dust || 'Dust', color: 'text-yellow-400' },
    { label: t.clean || 'Clean', color: 'text-green-400' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        const now = new Date();
        const generated: AnalysisResult[] = Array.from(files).map((_, i) => {
          const defect = defectTypes[Math.floor(Math.random() * defectTypes.length)];
          const isClean = defect.label === (t.clean || 'Clean');
          const healthScore = isClean
            ? Math.floor(Math.random() * 10) + 90
            : Math.floor(Math.random() * 50) + 20;
          return {
            id: `SP-${String(100 + i).padStart(3, '0')}`,
            label: defect.label,
            time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`,
            healthScore,
            defectiveType: defect.label,
            isDefective: !isClean,
            color: defect.color,
          };
        });
        setResults(generated);
      }, 2000);
    }
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.uploadFiles}</h3>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-foreground font-medium mb-2">{t.dropFilesHere}</p>
          <p className="text-sm text-muted-foreground mb-4">{t.supportedFormat}</p>
          <p className="text-muted-foreground mb-4">{t.or}</p>
          <button
            onClick={handleBrowse}
            className="text-primary hover:underline font-medium"
          >
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

        <Button className="w-full mt-4" disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            t.upload
          )}
        </Button>
      </div>

      {/* Results Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.analysisResults}</h3>
        
        {isAnalyzing ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Analyzing images...</p>
            </div>
          </div>
        ) : results && results.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {results.map((item) => (
              <div key={item.id} className="bg-secondary/30 border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${item.isDefective ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                    {item.isDefective ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.isDefective ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
                    {item.isDefective ? t.defectivePanel : t.passedPanel}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-secondary/50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{t.serialNumber}</p>
                    <p className="font-semibold text-sm text-foreground">{item.id}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{t.inspectionTime}</p>
                    <p className="font-semibold text-sm text-foreground">{item.time}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{t.healthScore}</p>
                    <p className={`font-semibold text-sm ${item.healthScore > 70 ? 'text-green-400' : item.healthScore > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {item.healthScore}%
                    </p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{t.defectiveType}</p>
                    <p className={`font-semibold text-sm ${item.color}`}>{item.defectiveType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48">
            <div className="text-center text-muted-foreground">
              <div className="w-24 h-24 mx-auto border-2 border-dashed border-border rounded-full flex items-center justify-center mb-4">
                <Upload className="w-10 h-10" />
              </div>
              <p>Upload images to see analysis results</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTab;
