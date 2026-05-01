import { ChevronDown, Play, ArrowRight, Sparkles, Activity, BarChart3, Shield, Eye, Bell, FileText, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import qiyafLogo from "@/assets/qiyaf-logo-new.png";
import heroComposition from "@/assets/hero-composition.png";
import dashboardPreview from "@/assets/dashboard-preview.png";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const navItems = ["Product", "Solutions", "Resources", "Pricing", "Company"];

const heroFeatures = [
  { icon: ScanLine, title: "AI-Powered Accuracy", desc: "Deep learning models for high precision" },
  { icon: Activity, title: "Real-time Monitoring", desc: "Live analysis and instant alerts anywhere" },
  { icon: BarChart3, title: "Actionable Insights", desc: "Data-driven reports to optimize performance" },
  { icon: Shield, title: "Enterprise Ready", desc: "Secure, scalable, and built for large-scale operations" },
];

const partners = ["ACWA POWER", "MASDAR", "edf renewables", "TotalEnergies", "JinKO Solar"];

const stats = [
  { value: "99.2%", label: "Detection Accuracy" },
  { value: "50%+", label: "Reduction in Manual\nInspection Time" },
  { value: "24/7", label: "Real-time Monitoring" },
  { value: "ROI", label: "Higher Energy Yield\n& Lower O&M Costs" },
];

const capabilities = [
  { icon: Eye, title: "Defect Detection", desc: "Identify cracks, hotspots, dirt, and micro-cracks with high precision." },
  { icon: Activity, title: "Live Feed Analysis", desc: "Monitor your sites in real-time with low-latency video streams." },
  { icon: Bell, title: "Smart Alerts", desc: "Get instant notifications for critical issues that matter." },
  { icon: FileText, title: "Reports & Analytics", desc: "Detailed insights and trends to drive better decisions." },
];

const LandingPage = ({ onGetStarted, onLogin }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <img src={qiyafLogo} alt="Qiyaf" className="h-44 w-auto object-contain" />
            <ul className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <button className="flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {item}
                    {item !== "Pricing" && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onLogin}
              className="h-10 px-5 bg-transparent border-border hover:bg-secondary/50 text-foreground rounded-lg"
            >
              Login
            </Button>
            <Button
              onClick={onGetStarted}
              className="h-10 px-5 rounded-lg text-primary-foreground font-medium border-0"
              style={{ background: "var(--gradient-brand)" }}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-20">
        {/* Center seam blend — cinematic dark bridge between text and hero image */}
        <div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block"
          style={{
            top: "8%",
            bottom: "-8%",
            left: "36%",
            width: "24%",
            zIndex: 2,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 12%, rgba(0,0,0,0.52) 28%, rgba(0,0,0,0.88) 48%, rgba(0,0,0,0.95) 58%, rgba(0,0,0,0.62) 76%, rgba(0,0,0,0.18) 90%, rgba(0,0,0,0) 100%)",
            filter: "blur(55px)",
            boxShadow: "0 0 160px rgba(0,0,0,0.95), 0 0 90px rgba(0,0,0,0.75)",
          }}
        />
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-4 items-center min-h-[calc(100vh-5rem)]">
          {/* Left content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-7">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                AI Powered Inspection Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              AI Vision for{" "}
              <span className="block">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
                >
                  Smarter Solar
                </span>
              </span>
              <span className="block">Operations</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Detect defects, reduce downtime, and maximize performance with real-time AI analysis of solar panel assets.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                onClick={onGetStarted}
                className="h-12 px-7 rounded-lg text-primary-foreground font-semibold border-0 shadow-lg group"
                style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="h-12 px-7 rounded-lg bg-transparent border-border/80 hover:bg-secondary/50 text-foreground"
              >
                <Play className="w-4 h-4 mr-1 fill-current" />
                Watch Demo
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
              {heroFeatures.map((f) => (
                <div key={f.title}>
                  <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual — single combined hero composition */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              className="relative"
              style={{
                width: "58vw",
                maxWidth: "920px",
                minWidth: "320px",
                transform: "translate(30px, -20px) scale(1.2)",
                transformOrigin: "center center",
              }}
            >
              {/* Large circular black radial shadow behind image */}
              <div
                aria-hidden
                className="pointer-events-none absolute -z-10"
                style={{
                  inset: "-80px",
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0) 72%)",
                  filter: "blur(45px)",
                }}
              />

              <img
                src={heroComposition}
                alt="Qiyaf AI drone inspecting solar panels with live dashboard analytics"
                className="relative block w-full h-auto"
                style={{
                  borderRadius: "24px",
                  boxShadow:
                    "0 50px 140px rgba(0,0,0,0.75), 0 0 80px rgba(0,220,220,0.08)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border/50 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Trusted by solar leaders worldwide
          </p>
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
              {partners.map((p) => (
                <span key={p} className="text-base md:text-lg font-semibold text-foreground/60 hover:text-foreground/90 transition-colors">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {stats.map((s) => (
                <div key={s.label} className="min-w-[110px]">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground whitespace-pre-line leading-tight mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              Advanced AI for every panel
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Powerful Capabilities Built for Solar Excellence
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Our platform combines computer vision, machine learning, and analytics to help you operate at peak efficiency.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {capabilities.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <c.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-1.5">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
                  <button className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Video preview card */}
          <div className="relative rounded-2xl overflow-hidden border border-border/60 group cursor-pointer h-full min-h-[400px]">
            <img
              src={videoPreviewImg}
              alt="See it in action"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-background/40 backdrop-blur-md border border-foreground/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold mb-1">See it in Action</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Watch how Qiyaf AI transforms solar operations
              </p>
              <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                Play Video <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

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
            {[
              { title: "Product", links: ["Features", "Solutions", "Pricing", "Demo"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { title: "Resources", links: ["Docs", "Blog", "Support", "Status"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Qiyaf. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <a className="hover:text-foreground transition-colors cursor-pointer">Privacy</a>
              <a className="hover:text-foreground transition-colors cursor-pointer">Terms</a>
              <a className="hover:text-foreground transition-colors cursor-pointer">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
