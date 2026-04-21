import { useLanguage } from '@/contexts/LanguageContext';

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage = ({ onStart }: IntroPageProps) => {
  const { language } = useLanguage();
  
  const buttonText = language === 'ar' ? 'ابدأ الآن' : 'Start Now';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dark teal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a5565] via-[#1d4555] to-[#122d3d]" />
      
      {/* Large circular glow behind drone */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#3a7585]/40 via-[#2a6575]/20 to-transparent blur-3xl" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-[#4a95a5]/25 blur-2xl" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-[#5ab5c5]/15 blur-xl" />
      </div>

      {/* Drone icon centered */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-120px' }}>
        <svg 
          viewBox="0 0 100 100" 
          className="relative z-10 w-24 h-24 md:w-32 md:h-32"
          style={{ color: '#2596a8' }}
        >
          <rect x="38" y="38" width="24" height="24" rx="3" fill="currentColor" />
          <line x1="42" y1="42" x2="22" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="58" y1="42" x2="78" y2="22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="58" x2="22" y2="78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <line x1="58" y1="58" x2="78" y2="78" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="22" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="78" cy="22" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="22" cy="78" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="78" cy="78" r="11" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="22" cy="22" r="4" fill="currentColor" />
          <circle cx="78" cy="22" r="4" fill="currentColor" />
          <circle cx="22" cy="78" r="4" fill="currentColor" />
          <circle cx="78" cy="78" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* Content at the bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-8 pb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight text-center">
          Factory Eye
        </h1>
        <p className="text-white/80 text-lg md:text-xl mb-10 text-center max-w-xl">
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
