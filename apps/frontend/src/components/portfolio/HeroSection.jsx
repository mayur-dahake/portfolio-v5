import React from "react";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AnimatedCounter from "./AnimatedCounter";

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function HeroSection({ profile, darkMode }) {
  const { toast } = useToast();

  if (!profile) return null;

  const socialLinks = [
    { icon: Github, url: profile.github, label: "GitHub" },
    { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
    { icon: XIcon, url: profile.twitterUrl, label: "X" },
    { icon: Mail, url: `mailto:${profile.email}`, label: "Email" }
  ].filter((link) => link.url);

  const resumeUrl = profile.resumeUrl || "/resume.pdf";

  const handleResumeClick = async (e) => {
    if (resumeUrl.startsWith("/") || resumeUrl.includes("resume.pdf")) {
      try {
        const res = await fetch(resumeUrl, { method: "HEAD" });
        if (!res.ok) {
          e.preventDefault();
          toast({
            title: "Resume Document Updating",
            description:
              "Please reach out directly via email or LinkedIn for the latest CV."
          });
        }
      } catch {
        e.preventDefault();
        toast({
          title: "Resume Document Updating",
          description:
            "Please reach out directly via email or LinkedIn for the latest CV."
        });
      }
    }
  };

  return (
    <section
      className={`min-h-screen relative overflow-hidden flex items-center pt-24 pb-16 px-6 md:px-12 lg:px-24 ${
        darkMode ? "bg-[#0a0a0a]" : "bg-[#f8fafc]"
      }`}
      aria-label="Hero"
    >
      {/* Subtle grid border lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-[5%] md:left-[10%] top-0 bottom-0 w-px ${
            darkMode ? "bg-white/5" : "bg-black/5"
          }`}
        />
        <div
          className={`absolute right-[5%] md:right-[10%] top-0 bottom-0 w-px ${
            darkMode ? "bg-white/5" : "bg-black/5"
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Role Pill - Static and immediate */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#ff0080] uppercase border border-[#ff0080]/30 px-3.5 py-1.5 bg-[#ff0080]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]" />
            Full-Stack Software Engineer
          </span>
        </div>

        {/* Immediate Strong Headline */}
        <div className="mb-6">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {(profile.fullName || profile.name || "MAYUR DAHAKE").toUpperCase()}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ff0080] mt-3 tracking-tight">
            {profile.headline || ".NET Core · Angular · Azure · SQL Server"}
          </p>
        </div>

        {/* Clear Supporting Value Proposition - Immediate, no typing delay */}
        <div className="max-w-2xl mb-10">
          <p
            className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed ${
              darkMode ? "text-white/70" : "text-black/70"
            }`}
          >
            {profile.bio ||
              "5+ years of experience engineering enterprise web applications, ERP platforms, and cloud backend services at Saviant and Birlasoft. Specialized in .NET Core APIs, Angular frontend development, and SQL Server databases."}
          </p>
        </div>

        {/* Primary and Resume CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ff0080] text-white font-mono text-xs tracking-widest font-bold hover:bg-[#ff0080]/90 transition-all shadow-lg shadow-[#ff0080]/20"
          >
            VIEW WORK
            <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className={`inline-flex items-center gap-2 px-7 py-3.5 border font-mono text-xs tracking-widest font-semibold transition-all group ${
              darkMode
                ? "border-white/30 text-white hover:border-[#ff0080] hover:text-[#ff0080]"
                : "border-black/30 text-black hover:border-[#ff0080] hover:text-[#ff0080]"
            }`}
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            RESUME (PDF)
          </a>
          <a
            href="#contact"
            className={`inline-flex items-center gap-2 px-5 py-3.5 text-xs font-mono tracking-widest transition-colors ${
              darkMode
                ? "text-white/50 hover:text-white"
                : "text-black/50 hover:text-black"
            }`}
          >
            Get In Touch →
          </a>
        </div>

        {/* Bottom Bar: Stats + Verified Social Links */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
            darkMode ? "border-white/10" : "border-black/10"
          }`}
        >
          {/* Verified Stats */}
          <div className="flex items-center gap-8 md:gap-14">
            <div>
              <div className="text-3xl md:text-5xl font-black text-[#ff0080]">
                <AnimatedCounter target={profile.yearsExperience || 5} />+
              </div>
              <div
                className={`text-[10px] md:text-xs font-mono tracking-widest mt-1 ${
                  darkMode ? "text-white/40" : "text-black/40"
                }`}
              >
                YEARS EXPERIENCE
              </div>
            </div>
            <div>
              <div
                className={`text-3xl md:text-5xl font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                2
              </div>
              <div
                className={`text-[10px] md:text-xs font-mono tracking-widest mt-1 ${
                  darkMode ? "text-white/40" : "text-black/40"
                }`}
              >
                ENTERPRISE ROLES
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`w-10 h-10 border flex items-center justify-center transition-all ${
                  darkMode
                    ? "border-white/20 text-white/60 hover:border-[#ff0080] hover:text-[#ff0080]"
                    : "border-black/20 text-black/60 hover:border-[#ff0080] hover:text-[#ff0080]"
                }`}
                title={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
