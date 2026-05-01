import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import qiyafLogo from '@/assets/qiyaf-logo-dark.png';
import emblemHero from '@/assets/qiyaf-emblem-hero.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { language, isRTL } = useLanguage();

  const tagline = language === 'ar' ? 'رؤية ذكية من الأعالي' : 'Smart Vision from Above';
  const subline =
    language === 'ar'
      ? 'فحص الألواح الشمسية بالطائرات بدون طيار، مدعوم بالذكاء الاصطناعي.'
      : 'AI-powered solar panel inspection, delivered by autonomous UAVs.';

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-[#070707] text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* === Global matte black gradient + vignette + noise === */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 50%, #0A0A0A 0%, #050505 60%, #020202 100%)',
          }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)',
          }}
        />
        {/* Fine noise */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* === Two-column 40 / 60 layout === */}
      <div className="relative z-10 grid min-h-screen lg:grid-cols-[2fr_3fr]">
        {/* ============== LEFT (40%) — FORM ============== */}
        <div className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
          {/* Top brand */}
          <div className="absolute top-8 left-6 sm:left-12 lg:left-16 flex items-center gap-3">
            <img src={qiyafLogo} alt="Qiyaf" className="h-9 w-auto object-contain opacity-90" />
          </div>

          {/* Form wrapper — slightly above center */}
          <div className="w-full max-w-md mx-auto -mt-6">
            {children}
          </div>

          {/* Tiny footer */}
          <div className="absolute bottom-6 left-6 sm:left-12 lg:left-16 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/30">
            <span>© Qiyaf</span>
            <div className="flex items-center gap-3">
              <span>UAV</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>AI Vision</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Solar</span>
            </div>
          </div>
        </div>

        {/* ============== RIGHT (60%) — HERO ============== */}
        <div className="relative hidden lg:block overflow-hidden">
          {/* Inner deep gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 70% at 70% 60%, #0C0C0C 0%, #060606 60%, #020202 100%)',
            }}
          />

          {/* Teal glow (left of emblem) */}
          <div
            className="absolute animate-auth-breathe"
            style={{
              right: '38%',
              bottom: '18%',
              width: '520px',
              height: '520px',
              background:
                'radial-gradient(circle, rgba(17,197,217,0.28) 0%, rgba(17,197,217,0.08) 40%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          {/* Amber glow (right of emblem) */}
          <div
            className="absolute animate-auth-breathe"
            style={{
              right: '5%',
              bottom: '10%',
              width: '620px',
              height: '620px',
              background:
                'radial-gradient(circle, rgba(255,152,0,0.30) 0%, rgba(255,152,0,0.08) 45%, transparent 75%)',
              filter: 'blur(24px)',
              animationDelay: '2s',
            }}
          />

          {/* Subtle smoke / fog */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(40% 30% at 75% 70%, rgba(255,255,255,0.04), transparent 70%)',
            }}
          />

          {/* Thin curved sweeping lines (decorative SVG) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.18]"
            viewBox="0 0 1000 1000"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#11C5D9" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#FF9800" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M -50 ${200 + i * 90} Q 400 ${100 + i * 60} 1050 ${-50 + i * 40}`}
                stroke="url(#lineGrad)"
                strokeWidth="0.7"
              />
            ))}
          </svg>

          {/* Emblem image — bottom-right */}
          <img
            src={emblemHero}
            alt=""
            aria-hidden="true"
            className="absolute right-0 bottom-0 w-[78%] max-w-[860px] object-contain animate-auth-float select-none pointer-events-none"
            style={{
              filter:
                'drop-shadow(0 20px 60px rgba(255,152,0,0.18)) drop-shadow(0 10px 40px rgba(17,197,217,0.18))',
            }}
          />

          {/* Floating particles */}
          {[
            { left: '20%', bottom: '25%', delay: '0s', size: 3 },
            { left: '35%', bottom: '40%', delay: '2s', size: 2 },
            { left: '55%', bottom: '20%', delay: '4s', size: 2 },
            { left: '70%', bottom: '55%', delay: '1s', size: 3 },
            { left: '45%', bottom: '60%', delay: '3s', size: 2 },
            { left: '25%', bottom: '15%', delay: '5s', size: 2 },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/40 animate-auth-particle"
              style={{
                left: p.left,
                bottom: p.bottom,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                boxShadow: '0 0 6px rgba(255,255,255,0.6)',
              }}
            />
          ))}

          {/* Hero copy — top-left of right pane */}
          <div className="absolute top-16 left-12 right-12 max-w-md">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50 mb-4">
              <span className="w-6 h-px bg-gradient-to-r from-[#11C5D9] to-[#FF9800]" />
              {language === 'ar' ? 'منصة قياف' : 'Qiyaf Platform'}
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
              <span className="text-gradient-warm">{tagline}</span>
            </h2>
            <p className="mt-4 text-white/55 text-base xl:text-lg leading-relaxed max-w-sm">
              {subline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
