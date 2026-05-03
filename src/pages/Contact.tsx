import { Mail, MapPin, GraduationCap, Linkedin, Sparkles } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "solarvision.dev26@gmail.com",
    href: "mailto:solarvision.dev26@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Qassim, Saudi Arabia",
    href: "https://maps.google.com/?q=Qassim+University",
  },
  {
    icon: GraduationCap,
    label: "Affiliation",
    value: "Qassim University",
    href: "https://qu.edu.sa",
  },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/qiyaf" },
];

const Contact = () => {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary">Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          Let’s{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, hsl(184 75% 55%), hsl(28 95% 60%))" }}
          >
            Talk Solar
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question about Qiyaf, want a demo, or interested in collaborating? Reach out through any of the
          channels below — we’d love to hear from you.
        </p>
      </section>

      {/* Contact info cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="grid md:grid-cols-3 gap-5">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/40 transition-colors text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{item.label}</p>
              <p className="font-semibold break-words">{item.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Socials */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div
          className="rounded-2xl border border-border/60 p-8 md:p-10 text-center"
          style={{ background: "radial-gradient(ellipse at top, hsl(28 95% 58% / 0.12), transparent 70%)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Follow Our Journey</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Stay updated as we keep building Qiyaf and sharing what we learn along the way.
          </p>
          <div className="flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-lg border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
