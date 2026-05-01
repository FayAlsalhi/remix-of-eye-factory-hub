import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (name: string, email: string) => void;
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
}

// Default demo users (always available)
const defaultUsers = [
  { email: 'admin@eyefactory.com', password: 'admin123', name: 'Admin User' },
  { email: 'user@eyefactory.com', password: 'user123', name: 'Test User' },
];

const LoginForm = ({ onLogin, onSwitchToSignup, onForgotPassword }: LoginFormProps) => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Combine default users with any users registered via Signup (stored in localStorage)
    const registeredUsers = JSON.parse(localStorage.getItem('eyefactory_users') || '[]');
    const allUsers = [...defaultUsers, ...registeredUsers];

    const user = allUsers.find(
      (u: { email: string; password: string }) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      onLogin(user.name, user.email);
    } else {
      setError(isRTL ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    window.open('https://accounts.google.com', '_blank');
  };

  const handleFacebookLogin = () => {
    window.open('https://www.facebook.com/login', '_blank');
  };

  return (
    <div
      className="w-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">
          <span className="w-6 h-px bg-gradient-to-r from-[#11C5D9] to-[#FF9800]" />
          {isRTL ? 'مرحباً مجدداً' : 'Welcome Back'}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-gradient-warm">{t.logIn}</span>
        </h2>
        <p className="text-white/55 mt-2">{t.welcomeBack}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-premium h-14 rounded-xl text-white placeholder:text-white/35 ${isRTL ? 'pr-12' : 'pl-12'}`}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 ${isRTL ? 'right-4' : 'left-4'}`} />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input-premium h-14 rounded-xl text-white placeholder:text-white/35 ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 hover:text-white transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Forgot Password Link */}
        <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {t.forgotPassword}
          </button>
        </div>

        <button
          type="submit"
          className="btn-qiyaf-gradient relative overflow-hidden w-full h-[58px] rounded-xl font-semibold text-white text-base tracking-wide"
        >
          {t.logIn}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-muted-foreground">{t.orContinueWith}</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button 
            variant="social" 
            className="flex-1"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.google}
          </Button>
          <Button 
            variant="social" 
            className="flex-1"
            onClick={handleFacebookLogin}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t.facebook}
          </Button>
        </div>
      </div>

      {/* Don't have an account */}
      <div className="mt-6 text-center">
        <span className="text-muted-foreground">{t.dontHaveAccount} </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary hover:underline font-medium"
        >
          {t.signUp}
        </button>
      </div>

      {/* Demo credentials hint */}
      <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          {isRTL ? 'للتجربة: admin@eyefactory.com / admin123' : 'Demo: admin@eyefactory.com / admin123'}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
