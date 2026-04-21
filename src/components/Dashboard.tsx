import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LayoutDashboard, Video, Upload, Settings, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import DashboardTab from './dashboard/DashboardTab';
import LiveFeedTab from './dashboard/LiveFeedTab';
import UploadTab from './dashboard/UploadTab';
import SettingsTab from './dashboard/SettingsTab';
import qiyafLogo from '@/assets/qiyaf-logo-dark.png';

type TabType = 'dashboard' | 'livefeed' | 'upload' | 'settings';
interface DashboardProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

const Dashboard = ({ userName, userEmail, onLogout }: DashboardProps) => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulate notifications count based on defective panels
  const notificationCount = 4;

  const sidebarItems = [
    { id: 'dashboard' as TabType, label: t.dashboard, icon: LayoutDashboard },
    { id: 'livefeed' as TabType, label: t.liveFeedRGB, icon: Video },
    { id: 'upload' as TabType, label: t.uploadSolarPanel, icon: Upload },
  ];

  const notifications = [
    { id: 'SP-001', type: 'Physical Damage', time: '10:32 AM' },
    { id: 'SP-002', type: 'Electrical Damage', time: '10:28 AM' },
    { id: 'SP-003', type: 'Snow Coverage', time: '10:25 AM' },
    { id: 'SP-004', type: 'Bird Droppings', time: '10:20 AM' },
  ];

  const handleUpdateProfile = (newName: string, newEmail: string) => {
    // In a real app, this would update the user's profile
    console.log('Profile updated:', newName, newEmail);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'livefeed':
        return <LiveFeedTab />;
      case 'upload':
        return <UploadTab />;
      case 'settings':
        return <SettingsTab userName={userName} userEmail={userEmail} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src={qiyafLogo}
              alt="Qiyaf"
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="font-bold text-foreground">{t.projectName}</h1>
              <p className="text-xs text-muted-foreground">{t.category}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>{t.settings}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6 gap-2">
          {/* Language Switcher - Fixed in header */}
          <LanguageSwitcher isInHeader={true} />


          {/* Notifications with badge */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
                <div className="p-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">{t.notifications}</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif, index) => (
                    <div key={index} className="p-3 hover:bg-secondary/50 border-b border-border last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {t.newAlert}: {notif.id}
                          </p>
                          <p className="text-xs text-muted-foreground">{notif.type}</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 p-1 hover:bg-secondary rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <div className={`absolute top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{userName}</p>
                      <p className="text-sm text-muted-foreground truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-background overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileDropdown || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowProfileDropdown(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
