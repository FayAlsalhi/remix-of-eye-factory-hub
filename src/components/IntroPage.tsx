import { useLanguage } from '@/contexts/LanguageContext';
import heroVideo from '@/assets/hero-intro.mp4';

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage = ({ onStart }: IntroPageProps) => {
  const { language } = useLanguage();
  
  const buttonText = language === 'ar' ? 'ابدأ الآن' : 'Start Now';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content at the bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-8 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight text-center drop-shadow-lg">
          Factory Eye
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 text-center max-w-xl drop-shadow-md">
          Smart Vision from the UAV powered Solar Panel Inspection
        </p>
        <button 
          onClick={onStart}
          className="py-3 px-10 bg-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-cyan-400 transition-all duration-300 flex items-center gap-3"
        >
          <span>{buttonText}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
