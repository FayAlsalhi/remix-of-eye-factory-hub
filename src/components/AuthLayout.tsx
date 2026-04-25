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

  // Pre-computed glowing data nodes on the 3D grid
  const dataNodes = [
    { x: 20, y: 35, size: 6, delay: '0s' },
    { x: 45, y: 28, size: 5, delay: '0.8s' },
    { x: 70, y: 40, size: 7, delay: '1.5s' },
    { x: 30, y: 55, size: 5, delay: '0.4s' },
    { x: 60, y: 62, size: 6, delay: '2.1s' },
    { x: 85, y: 58, size: 4, delay: '1.2s' },
    { x: 15, y: 72, size: 5, delay: '0.6s' },
    { x: 50, y: 78, size: 6, delay: '1.8s' },
    { x: 78, y: 75, size: 5, delay: '2.4s' },
    { x: 38, y: 42, size: 4, delay: '1.0s' },
  ];

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left: 3D technical grid canvas */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 bg-gradient-to-br from-[hsl(210_55%_6%)] via-[hsl(200_60%_9%)] to-[hsl(188_70%_12%)]">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[32rem] h-[32rem] rounded-full bg-accent/15 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/15 blur-[100px]" />

        {/* 3D Technical Grid Mesh */}
        <div className="pointer-events-none absolute inset-0">
          {/* Perspective floor grid */}
          <div
            className="absolute inset-x-0 bottom-0 h-[80%] opacity-60"
            style={{
              backgroundImage: `
                linear-gradient(hsl(188 75% 50% / 0.35) 1px, transparent 1px),
                linear-gradient(90deg, hsl(188 75% 50% / 0.35) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: 'perspective(800px) rotateX(60deg) translateY(15%)',
              transformOrigin: 'center bottom',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 85%, transparent 100%)',
            }}
          />

          {/* Subtle ceiling grid */}
          <div
            className="absolute inset-x-0 top-0 h-[55%] opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(hsl(188 75% 50% / 0.25) 1px, transparent 1px),
                linear-gradient(90deg, hsl(188 75% 50% / 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '70px 70px',
              transform: 'perspective(800px) rotateX(-55deg) translateY(-15%)',
              transformOrigin: 'center top',
              maskImage: 'linear-gradient(to top, transparent 0%, black 30%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 30%, black 80%, transparent 100%)',
            }}
          />

          {/* Glowing data nodes with connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Connecting beams between nodes */}
            <g stroke="hsl(188 85% 55%)" strokeWidth="0.08" opacity="0.5">
              <line x1="20" y1="35" x2="45" y2="28" />
              <line x1="45" y1="28" x2="70" y2="40" />
              <line x1="20" y1="35" x2="38" y2="42" />
              <line x1="38" y1="42" x2="60" y2="62" />
              <line x1="30" y1="55" x2="60" y2="62" />
              <line x1="60" y1="62" x2="85" y2="58" />
              <line x1="30" y1="55" x2="15" y2="72" />
              <line x1="15" y1="72" x2="50" y2="78" />
              <line x1="50" y1="78" x2="78" y2="75" />
              <line x1="70" y1="40" x2="85" y2="58" />
              <line x1="45" y1="28" x2="38" y2="42" />
            </g>
          </svg>

          {/* Pulsing data node points */}
          {dataNodes.map((node, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                background: i % 3 === 0 ? 'hsl(32 95% 60%)' : 'hsl(188 90% 60%)',
                boxShadow: i % 3 === 0
                  ? '0 0 12px 2px hsl(32 95% 60% / 0.8), 0 0 24px 4px hsl(32 95% 60% / 0.4)'
                  : '0 0 12px 2px hsl(188 90% 60% / 0.8), 0 0 24px 4px hsl(188 90% 60% / 0.4)',
                animation: `pulse-node 3s ease-in-out ${node.delay} infinite`,
              }}
            />
          ))}
        </div>

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img src={qiyafLogo} alt="Qiyaf" className="h-14 w-auto object-contain drop-shadow-2xl" />
        </div>

        {/* Center: Brand mark */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <img
            src={qiyafLogo}
            alt="Qiyaf"
            className="h-56 xl:h-72 w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Bottom: Tagline */}
        <div className="relative z-10 max-w-md">
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

      {/* Right: Form area with glass background */}
      <div className="relative flex items-center justify-center p-6 sm:p-10 overflow-hidden bg-gradient-to-br from-[hsl(210_50%_8%)] via-[hsl(200_55%_10%)] to-[hsl(210_45%_7%)]">
        {/* Decorative glow behind glass card */}
        <div className="pointer-events-none absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-primary/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 -left-20 w-96 h-96 rounded-full bg-accent/15 blur-[120px]" />

        {/* Mobile-only top logo */}
        <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <img src={qiyafLogo} alt="Qiyaf" className="h-14 w-auto object-contain" />
        </div>

        {/* Glassmorphism container */}
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150">
          {/* Inner highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent" />
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
