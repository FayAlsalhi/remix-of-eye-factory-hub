import { ReactNode, Suspense, lazy } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import qiyafLogo from '@/assets/qiyaf-logo-dark.png';

const SolarField3D = lazy(() => import('./SolarField3D'));

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



  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(210_55%_6%)]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ============ FULL-SCREEN BACKGROUND: ISOMETRIC TECH GRID ============ */}
      <div className="absolute inset-0">
        {/* Deep dark teal gradient base (matches reference) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195_45%_8%)] via-[hsl(200_50%_6%)] to-[hsl(210_55%_4%)]" />

        {/* Concentric circular grid (radar-like) on the left */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1600 900"
        >
          <defs>
            <radialGradient id="ringFade" cx="20%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#9be9f5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#9be9f5" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[120, 220, 340, 470, 610, 760].map((r) => (
            <circle
              key={r}
              cx="320"
              cy="450"
              r={r}
              fill="none"
              stroke="url(#ringFade)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Big soft teal glow on the left (sun-like aura from reference) */}
        <div className="pointer-events-none absolute top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-[hsl(180_70%_55%)]/25 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] rounded-full bg-[hsl(180_80%_70%)]/30 blur-[80px]" />

        {/* 3D Canvas with isometric platforms + nodes */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SolarField3D />
          </Suspense>
        </div>

        {/* Subtle warm accent low-right (matches yellow/orange glow in reference) */}
        <div className="pointer-events-none absolute bottom-[20%] left-[35%] w-[28rem] h-[16rem] rounded-full bg-amber-500/10 blur-[120px] mix-blend-screen" />

        {/* Top + bottom vignette for legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[hsl(210_55%_4%)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(210_55%_4%)] to-transparent" />
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
