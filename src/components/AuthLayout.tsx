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
      {/* ============ FULL-SCREEN BACKGROUND: 3D SOLAR PANEL FIELD ============ */}
      <div className="absolute inset-0">
        {/* Deep dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210_55%_5%)] via-[hsl(200_50%_8%)] to-[hsl(210_55%_4%)]" />

        {/* 3D Canvas with real solar panels */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <SolarField3D />
          </Suspense>
        </div>

        {/* Ambient color glows on top to integrate with brand */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-[160px] mix-blend-screen" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-[160px] mix-blend-screen" />

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
