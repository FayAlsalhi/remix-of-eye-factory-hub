import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SignupForm from '@/components/SignupForm';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import Dashboard from '@/components/Dashboard';
import IntroPage from '@/components/IntroPage';

type AuthView = 'intro' | 'signup' | 'login' | 'forgot-password';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authView, setAuthView] = useState<AuthView>('intro');

  const handleSignup = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogin = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setAuthView('intro');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        {!isLoggedIn ? (
          authView === 'intro' ? (
            <IntroPage onStart={() => setAuthView('signup')} />
          ) : (
            <>
              <LanguageSwitcher />
              <div className="flex items-center justify-center min-h-screen px-4">
                {authView === 'signup' && (
                  <SignupForm 
                    onSignup={handleSignup} 
                    onSwitchToLogin={() => setAuthView('login')}
                  />
                )}
                {authView === 'login' && (
                  <LoginForm 
                    onLogin={handleLogin} 
                    onSwitchToSignup={() => setAuthView('signup')}
                    onForgotPassword={() => setAuthView('forgot-password')}
                  />
                )}
                {authView === 'forgot-password' && (
                  <ForgotPasswordForm 
                    onBackToLogin={() => setAuthView('login')}
                  />
                )}
              </div>
            </>
          )
        ) : (
          <Dashboard 
            userName={userName} 
            userEmail={userEmail} 
            onLogout={handleLogout}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
