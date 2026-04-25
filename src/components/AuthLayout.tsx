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

  // Compact isometric grid sits to the right side of the brand zone.
  // Coordinates inside a 600x500 viewBox.
  const dataNodes = [
    { x: 230, y: 180, delay: '0s' },
    { x: 360, y: 150, delay: '0.6s' },
    { x: 470, y: 200, delay: '1.2s' },
    { x: 300, y: 260, delay: '0.4s' },
    { x: 420, y: 290, delay: '1.0s' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(210_55%_6%)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ============ BACKGROUND BASE ============ */}
      <div className="absolute inset-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210_55%_5%)] via-[hsl(200_50%_8%)] to-[hsl(210_55%_4%)]" />

        {/* Soft ambient glow behind the brand area (left-center) */}
        <div className="pointer-events-none absolute top-[30%] left-[18%] w-[36rem] h-[36rem] rounded-full bg-primary/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[40%] w-[28rem] h-[28rem] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      {/* ============ FOREGROUND: TWO-COLUMN LAYOUT ============ */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left: Brand zone with the compact isometric mesh on the right side */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
          {/* Top: Small logo (color-shifted to match theme — removes orange) */}
          <div className="flex items-center gap-3">
            <img
              src={qiyafLogo}
              alt="Qiyaf"
              className="h-9 w-auto object-contain opacity-90"
              style={{ filter: 'hue-rotate(150deg) saturate(0.85) brightness(1.05)' }}
            />
          </div>

          {/* Compact isometric grid — positioned to the right of the brand zone */}
          <svg
            className="pointer-events-none absolute right-[-4%] top-[20%] h-[70%] w-[70%]"
            viewBox="0 0 600 500"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="nodeGradient">
                <stop offset="0%" stopColor="hsl(188 100% 80%)" stopOpacity="1" />
                <stop offset="50%" stopColor="hsl(188 90% 55%)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="hsl(188 90% 45%)" stopOpacity="0" />
              </radialGradient>

              {/* Smaller, denser isometric diamond pattern */}
              <pattern id="isoGrid" x="0" y="0" width="60" height="34" patternUnits="userSpaceOnUse">
                <path d="M 0 17 L 30 0 L 60 17 L 30 34 Z" stroke="hsl(188 75% 55%)" strokeWidth="0.5" fill="none" opacity="0.45" />
              </pattern>

              {/* Radial fade so the grid blends softly into the background */}
              <radialGradient id="gridFade" cx="50%" cy="55%" r="55%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="gridMask">
                <rect x="0" y="0" width="600" height="500" fill="url(#gridFade)" />
              </mask>
            </defs>

            {/* Grid floor */}
            <g mask="url(#gridMask)">
              <rect x="0" y="120" width="600" height="380" fill="url(#isoGrid)" />
            </g>

            {/* Vertical poles */}
            {dataNodes.map((node, i) => (
              <line
                key={`pole-${i}`}
                x1={node.x}
                y1={node.y}
                x2={node.x}
                y2={node.y + 80}
                stroke="hsl(188 90% 60%)"
                strokeWidth="0.9"
                opacity="0.55"
                strokeDasharray="2 3"
              />
            ))}

            {/* Connecting beams */}
            <g stroke="hsl(188 85% 55%)" strokeWidth="0.9" opacity="0.4">
              <line x1="230" y1="180" x2="360" y2="150" />
              <line x1="360" y1="150" x2="470" y2="200" />
              <line x1="230" y1="180" x2="300" y2="260" />
              <line x1="300" y1="260" x2="420" y2="290" />
              <line x1="420" y1="290" x2="470" y2="200" />
              <line x1="360" y1="150" x2="300" y2="260" />
            </g>

            {/* Nodes */}
            {dataNodes.map((node, i) => (
              <g key={`node-${i}`} filter="url(#nodeGlow)">
                <circle cx={node.x} cy={node.y} r="12" fill="url(#nodeGradient)">
                  <animate attributeName="r" values="9;15;9" dur="3s" begin={node.delay} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="3s" begin={node.delay} repeatCount="indefinite" />
                </circle>
                <circle cx={node.x} cy={node.y} r="3.5" fill="hsl(188 100% 88%)" />
                <circle cx={node.x} cy={node.y + 80} r="1.8" fill="hsl(188 90% 60%)" opacity="0.7" />
              </g>
            ))}
          </svg>

          {/* Center-left: Big brand mark (color-shifted to match theme) */}
          <div className="relative z-10 flex flex-col items-start justify-center pl-4 xl:pl-10">
            <img
              src={qiyafLogo}
              alt="Qiyaf"
              className="h-44 xl:h-56 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              style={{ filter: 'hue-rotate(150deg) saturate(0.85) brightness(1.05)' }}
            />
          </div>

          {/* Bottom: Tagline */}
          <div className="relative z-10 max-w-md">
            <div className="h-px w-16 bg-primary mb-5" />
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground leading-tight tracking-tight">
              {tagline}
            </h2>
            <p className="mt-3 text-foreground/70 text-base xl:text-lg leading-relaxed">
              {subline}
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-foreground/40">
              <span>UAV</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>AI Vision</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>Solar</span>
            </div>
          </div>
        </div>

        {/* Right: Glassmorphism form card */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          {/* Mobile-only top logo */}
          <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 z-20">
            <img
              src={qiyafLogo}
              alt="Qiyaf"
              className="h-14 w-auto object-contain"
              style={{ filter: 'hue-rotate(150deg) saturate(0.85) brightness(1.05)' }}
            />
          </div>

          {/* Glass container */}
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl backdrop-saturate-150">
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
