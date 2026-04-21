import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import DroneHeroIcon from '@/components/DroneHeroIcon';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending reset email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl">
      <CardHeader className="text-center pb-2">
        <DroneHeroIcon />
        <h1 className="text-2xl font-bold text-foreground">
          {language === 'ar' ? 'استعادة كلمة المرور' : 'Reset Password'}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {language === 'ar' 
            ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور'
            : 'Enter your email and we\'ll send you a link to reset your password'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${language === 'ar' ? 'right-3' : 'left-3'}`} />
              <Input
                type="email"
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-primary h-12 ${language === 'ar' ? 'pr-10 text-right' : 'pl-10'}`}
                required
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isLoading 
                ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                : (language === 'ar' ? 'إرسال رابط الاستعادة' : 'Send Reset Link')}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onBackToLogin}
              className="w-full h-10 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'ar' ? 'تم إرسال الرابط!' : 'Link Sent!'}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === 'ar' 
                ? `تم إرسال رابط استعادة كلمة المرور إلى ${email}`
                : `A password reset link has been sent to ${email}`}
            </p>
            <p className="text-muted-foreground text-xs">
              {language === 'ar' 
                ? 'تحقق من بريدك الإلكتروني واتبع التعليمات'
                : 'Check your email and follow the instructions'}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={onBackToLogin}
              className="mt-4"
            >
              <ArrowLeft className={`h-4 w-4 ${language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
