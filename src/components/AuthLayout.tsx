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

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left: Brand canvas */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 bg-gradient-to-br from-[hsl(210_50%_10%)] via-[hsl(200_55%_14%)] to-[hsl(188_70%_18%)]">
        {/* Ambient color blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/30 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[32rem] h-[32rem] rounded-full bg-accent/25 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-[100px]" />

        {/* Solar-grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(40 30% 92%) 1px, transparent 1px), linear-gradient(90deg, hsl(40 30% 92%) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            transform: 'perspective(900px) rotateX(55deg) translateY(10%)',
            transformOrigin: 'center top',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
          }}
        />

        {/* Faint orbital rings */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 600 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="300" cy="300" r="120" stroke="hsl(40 30% 92%)" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="200" stroke="hsl(40 30% 92%)" strokeWidth="0.5" strokeDasharray="2 6" />
          <circle cx="300" cy="300" r="280" stroke="hsl(40 30% 92%)" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="360" stroke="hsl(40 30% 92%)" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>

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

      {/* Right: Form area */}
      <div className="relative flex items-center justify-center p-6 sm:p-10">
        {/* Mobile-only top logo */}
        <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
          <img src={qiyafLogo} alt="Qiyaf" className="h-14 w-auto object-contain" />
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
