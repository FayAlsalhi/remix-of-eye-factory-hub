import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isRTL } = useLanguage();

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

      {/* === Ambient glows (kept from previous hero) === */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Teal glow — left */}
        <div
          className="absolute animate-auth-breathe"
          style={{
            left: '-10%',
            top: '20%',
            width: '620px',
            height: '620px',
            background:
              'radial-gradient(circle, rgba(17,197,217,0.22) 0%, rgba(17,197,217,0.06) 40%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />
        {/* Amber glow — right */}
        <div
          className="absolute animate-auth-breathe"
          style={{
            right: '-8%',
            bottom: '10%',
            width: '680px',
            height: '680px',
            background:
              'radial-gradient(circle, rgba(255,152,0,0.22) 0%, rgba(255,152,0,0.06) 45%, transparent 75%)',
            filter: 'blur(28px)',
            animationDelay: '2s',
          }}
        />

        {/* Thin curved sweeping lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.14]"
          viewBox="0 0 1600 1000"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradCenter" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#11C5D9" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FF9800" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M -50 ${180 + i * 110} Q 800 ${80 + i * 70} 1700 ${-50 + i * 50}`}
              stroke="url(#lineGradCenter)"
              strokeWidth="0.7"
            />
          ))}
        </svg>

        {/* Floating particles */}
        {[
          { left: '15%', top: '28%', delay: '0s', size: 3 },
          { left: '78%', top: '38%', delay: '2s', size: 2 },
          { left: '32%', top: '72%', delay: '4s', size: 2 },
          { left: '68%', top: '78%', delay: '1s', size: 3 },
          { left: '50%', top: '18%', delay: '3s', size: 2 },
          { left: '22%', top: '60%', delay: '5s', size: 2 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40 animate-auth-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              boxShadow: '0 0 6px rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>

      {/* === Centered single-card layout === */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md -mt-6">
          {children}
        </div>
      </div>

      {/* Tiny footer */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/30">
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
  );
};

export default AuthLayout;
