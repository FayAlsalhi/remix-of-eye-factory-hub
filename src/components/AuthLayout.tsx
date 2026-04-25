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

  // Glowing data nodes positioned on the isometric grid (in viewBox 1200x800 coords)
  // Each node sits at a grid intersection and has a vertical "pole" connecting to ground
  const dataNodes = [
    { x: 380, y: 340, delay: '0s' },
    { x: 560, y: 300, delay: '0.6s' },
    { x: 740, y: 360, delay: '1.2s' },
    { x: 900, y: 320, delay: '1.8s' },
    { x: 470, y: 430, delay: '0.3s' },
    { x: 650, y: 460, delay: '0.9s' },
    { x: 830, y: 440, delay: '1.5s' },
    { x: 1010, y: 420, delay: '2.1s' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(210_55%_6%)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ============ FULL-SCREEN BACKGROUND: 3D ISOMETRIC GRID ============ */}
      <div className="absolute inset-0">
        {/* Deep dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210_55%_5%)] via-[hsl(200_50%_8%)] to-[hsl(210_55%_4%)]" />

        {/* Ambient color glows */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/8 blur-[160px]" />

        {/* Isometric 3D grid SVG — fills full screen */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            {/* Glow filters */}
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

            {/* Reusable isometric grid pattern */}
            <pattern id="isoGrid" x="0" y="0" width="80" height="46" patternUnits="userSpaceOnUse">
              {/* Two diagonal lines forming isometric diamond */}
              <path d="M 0 23 L 40 0 L 80 23 L 40 46 Z" stroke="hsl(188 75% 50%)" strokeWidth="0.6" fill="none" opacity="0.35" />
            </pattern>
          </defs>

          {/* Apply isometric grid across the floor area, masked with vertical fade */}
          <g style={{ mask: 'url(#gridFade)' }}>
            <rect x="0" y="280" width="1200" height="520" fill="url(#isoGrid)" />
          </g>
          {/* Horizontal soft mask via gradient overlay — using a rect with linear gradient fill above is the trick */}
          <mask id="gridFade">
            <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="20%" stopColor="white" stopOpacity="1" />
              <stop offset="80%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
            <rect x="0" y="280" width="1200" height="520" fill="url(#fadeGrad)" />
          </mask>

          {/* Vertical poles connecting nodes to the ground */}
          {dataNodes.map((node, i) => (
            <line
              key={`pole-${i}`}
              x1={node.x}
              y1={node.y}
              x2={node.x}
              y2={node.y + 90}
              stroke="hsl(188 90% 60%)"
              strokeWidth="1"
              opacity="0.55"
              strokeDasharray="2 3"
            />
          ))}

          {/* Connecting beams between adjacent nodes */}
          <g stroke="hsl(188 85% 55%)" strokeWidth="1" opacity="0.4">
            <line x1="380" y1="340" x2="560" y2="300" />
            <line x1="560" y1="300" x2="740" y2="360" />
            <line x1="740" y1="360" x2="900" y2="320" />
            <line x1="470" y1="430" x2="650" y2="460" />
            <line x1="650" y1="460" x2="830" y2="440" />
            <line x1="830" y1="440" x2="1010" y2="420" />
            <line x1="380" y1="340" x2="470" y2="430" />
            <line x1="560" y1="300" x2="650" y2="460" />
            <line x1="740" y1="360" x2="830" y2="440" />
            <line x1="900" y1="320" x2="1010" y2="420" />
          </g>

          {/* Glowing data nodes (orbs) with pulsing rings */}
          {dataNodes.map((node, i) => (
            <g key={`node-${i}`} filter="url(#nodeGlow)">
              {/* Outer pulsing ring */}
              <circle cx={node.x} cy={node.y} r="14" fill="url(#nodeGradient)">
                <animate attributeName="r" values="10;18;10" dur="3s" begin={node.delay} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" begin={node.delay} repeatCount="indefinite" />
              </circle>
              {/* Inner bright core */}
              <circle cx={node.x} cy={node.y} r="4" fill="hsl(188 100% 85%)" />
              {/* Ground point */}
              <circle cx={node.x} cy={node.y + 90} r="2" fill="hsl(188 90% 60%)" opacity="0.7" />
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
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150">
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
