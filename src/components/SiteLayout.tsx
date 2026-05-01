import { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import qiyafLogo from "@/assets/qiyaf-logo-new.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Solution", to: "/solution" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAuth = (view: "login" | "signup") => {
    navigate(`/?auth=${view}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border/50 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
        <nav className="max-w-7xl mx-auto pl-2 pr-6 lg:pl-4 lg:pr-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" aria-label="Qiyaf home">
              <img src={qiyafLogo} alt="Qiyaf" className="h-16 w-auto object-contain" />
            </Link>
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={`text-sm transition-colors ${
                        isActive ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => goToAuth("login")}
              className="h-10 px-5 bg-transparent border-border hover:bg-secondary/50 text-foreground rounded-lg"
            >
              Login
            </Button>
            <Button
              onClick={() => goToAuth("signup")}
              className="h-10 px-5 rounded-lg text-primary-foreground font-medium border-0"
              style={{ background: "var(--gradient-brand)" }}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <img src={qiyafLogo} alt="Qiyaf" className="h-44 w-auto object-contain mb-4" />
              <p className="text-sm text-muted-foreground max-w-xs">
                AI-powered solar panel inspection platform built for enterprise scale.
              </p>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Qiyaf. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
