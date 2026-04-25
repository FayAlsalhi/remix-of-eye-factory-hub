import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import qiyafLogo from '@/assets/qiyaf-logo-dark.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { language, isRTL } = useLanguage();

  const tagline = language === 'ar'
    ? 'رؤية ذكية من الأعالي'
    : 'Smart Vision from Above';

  const subline = language === 'ar'
    ? 'فحص الألواح الشمسية بالطائرات بدون طيار، مدعوم بالذكاء الاصطناعي.'
    : 'AI-powered solar panel inspection, delivered by autonomous UAVs.';

  // Glowing data nodes positioned on the solar field (in viewBox 1200x800 coords)
  const dataNodes = [
    { x: 320, y: 380, delay: '0s' },
    { x: 560, y: 340, delay: '0.6s' },
    { x: 800, y: 400, delay: '1.2s' },
    { x: 980, y: 360, delay: '1.8s' },
    { x: 440, y: 520, delay: '0.3s' },
    { x: 700, y: 560, delay: '0.9s' },
    { x: 920, y: 540, delay: '1.5s' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(210_55%_6%)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ============ FULL-SCREEN BACKGROUND: SOLAR PANEL FIELD ============ */}
      <div className="absolute inset-0">
        {/* Deep dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210_55%_5%)] via-[hsl(200_50%_8%)] to-[hsl(210_55%_4%)]" />

        {/* Ambient color glows (teal/cyan brand) */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-[160px]" />

        {/* Solar panel field SVG — perspective grid that mimics PV array */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="hsl(188 100% 75%)" stopOpacity="1" />
              <stop offset="40%" stopColor="hsl(188 90% 55%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(188 90% 45%)" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="panelCell" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(210 70% 14%)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(210 80% 8%)" stopOpacity="0.95" />
            </linearGradient>

            {/* A single solar panel = 6x4 cells with frame */}
            <pattern id="solarPanel" x="0" y="0" width="180" height="120" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="176" height="116" fill="url(#panelCell)" stroke="hsl(188 60% 35%)" strokeWidth="1" />
              <line x1="32" y1="4" x2="32" y2="116" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="62" y1="4" x2="62" y2="116" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="92" y1="4" x2="92" y2="116" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="122" y1="4" x2="122" y2="116" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="152" y1="4" x2="152" y2="116" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="4" y1="32" x2="176" y2="32" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="4" y1="60" x2="176" y2="60" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="4" y1="88" x2="176" y2="88" stroke="hsl(210 50% 5%)" strokeWidth="1" />
              <line x1="6" y1="6" x2="28" y2="28" stroke="hsl(188 50% 45%)" strokeWidth="0.4" opacity="0.4" />
              <line x1="36" y1="6" x2="58" y2="28" stroke="hsl(188 50% 45%)" strokeWidth="0.4" opacity="0.4" />
              <line x1="66" y1="6" x2="88" y2="28" stroke="hsl(188 50% 45%)" strokeWidth="0.4" opacity="0.4" />
              <line x1="96" y1="6" x2="118" y2="28" stroke="hsl(188 50% 45%)" strokeWidth="0.4" opacity="0.4" />
              <line x1="126" y1="6" x2="148" y2="28" stroke="hsl(188 50% 45%)" strokeWidth="0.4" opacity="0.4" />
            </pattern>

            <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="25%" stopColor="white" stopOpacity="1" />
              <stop offset="80%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.25" />
            </linearGradient>
            <mask id="panelFade">
              <rect x="0" y="260" width="1200" height="540" fill="url(#fadeGrad)" />
            </mask>
          </defs>

          {/* Solar panel field with perspective tilt */}
          <g style={{ transform: 'perspective(900px) rotateX(55deg)', transformOrigin: '50% 80%' }} mask="url(#panelFade)">
            <rect x="-200" y="260" width="1600" height="540" fill="url(#solarPanel)" opacity="0.85" />
          </g>

          {/* Connecting beams between adjacent nodes (data flow) */}
          <g stroke="hsl(188 85% 55%)" strokeWidth="1" opacity="0.35">
            <line x1="320" y1="380" x2="560" y2="340" />
            <line x1="560" y1="340" x2="800" y2="400" />
            <line x1="800" y1="400" x2="980" y2="360" />
            <line x1="440" y1="520" x2="700" y2="560" />
            <line x1="700" y1="560" x2="920" y2="540" />
            <line x1="320" y1="380" x2="440" y2="520" />
            <line x1="560" y1="340" x2="700" y2="560" />
            <line x1="800" y1="400" x2="920" y2="540" />
          </g>

          {/* Glowing data nodes (inspection points on the solar field) */}
          {dataNodes.map((node, i) => (
            <g key={`node-${i}`} filter="url(#nodeGlow)">
              <circle cx={node.x} cy={node.y} r="14" fill="url(#nodeGradient)">
                <animate attributeName="r" values="10;18;10" dur="3s" begin={node.delay} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" begin={node.delay} repeatCount="indefinite" />
              </circle>
              <circle cx={node.x} cy={node.y} r="4" fill="hsl(188 100% 85%)" />
            </g>
          ))}
        </svg>
      </div>

      {/* ============ FOREGROUND: TWO-COLUMN LAYOUT ============ */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left: Brand zone (transparent — grid shows through) */}
        <div className="relative hidden lg:flex flex-col justify-between p-12">
          {/* Top: Small logo */}
          <div className="flex items-center gap-3">
            <img src={qiyafLogo} alt="Qiyaf" className="h-10 w-auto object-contain opacity-90" />
          </div>

          {/* Center: Big brand mark */}
          <div className="flex flex-col items-center justify-center text-center">
            <img
              src={qiyafLogo}
              alt="Qiyaf"
              className="h-48 xl:h-64 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Bottom: Tagline */}
          <div className="max-w-md">
            <div className="h-px w-16 bg-accent mb-5" />
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight tracking-tight">
              {tagline}
            </h2>
            <p className="mt-3 text-foreground/70 text-base xl:text-lg leading-relaxed">
              {subline}
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-foreground/40">
              <span>UAV</span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span>AI Vision</span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span>Solar</span>
            </div>
          </div>
        </div>

        {/* Right: Glassmorphism form card */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          {/* Mobile-only top logo */}
          <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 z-20">
            <img src={qiyafLogo} alt="Qiyaf" className="h-14 w-auto object-contain" />
          </div>

          {/* Glass container */}
          <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)] [backdrop-filter:blur(40px)_saturate(180%)] [-webkit-backdrop-filter:blur(40px)_saturate(180%)]">
            {/* Inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.07] via-transparent to-transparent" />
            <div className="relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
