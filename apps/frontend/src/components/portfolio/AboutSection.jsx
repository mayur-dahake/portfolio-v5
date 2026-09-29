import React from "react";
import {
  MapPin,
  Download,
  ArrowUpRight,
  Layers,
  Shield,
  Zap,
  Database
} from "lucide-react";

const architecturePillars = [
  {
    icon: Layers,
    title: "Layered Architecture",
    desc: "DAL → BLL → API separation for maintainability, clarity, and unit testability."
  },
  {
    icon: Database,
    title: "DB Optimization",
    desc: "Targeted indexing, query profiling, and efficient data access workflows."
  },
  {
    icon: Shield,
    title: "Security by Default",
    desc: "JWT-based authentication, strict input validation, and secure API contracts."
  },
  {
    icon: Zap,
    title: "Reliable Performance",
    desc: "Asynchronous processing, efficient data transfer, and resilient service endpoints."
  }
];

export default function AboutSection({ profile, darkMode }) {
  if (!profile) return null;

  const resumeUrl = profile.resumeUrl || "/resume.pdf";

  return (
    <section
      id="about"
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden ${
        darkMode ? "bg-[#0d0d0d]" : "bg-[#f8fafc]"
      }`}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-12">
          <span
            className={`text-xs font-mono tracking-widest ${
              darkMode ? "text-[#ff0080]" : "text-[#ff0080]"
            }`}
          >
            001
          </span>
          <div
            className={`w-12 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <h2
            className={`text-xs font-mono tracking-widest uppercase font-bold ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            About & Approach
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left column - professional bio statement */}
          <div className="lg:col-span-7">
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Engineering enterprise software with a focus on{" "}
              <span className="text-[#ff0080]">stability, clean structure</span>
              , and long-term maintainability.
            </h3>
            <p
              className={`text-base md:text-lg leading-relaxed mb-6 font-normal ${
                darkMode ? "text-white/70" : "text-black/70"
              }`}
            >
              {profile.bio ||
                "Full Stack Developer with 5+ years of experience building scalable enterprise applications and ERP systems. Specialized in .NET, Angular, and cloud-based solutions on Azure."}
            </p>
            <p
              className={`text-sm md:text-base leading-relaxed font-normal ${
                darkMode ? "text-white/50" : "text-black/60"
              }`}
            >
              My professional background spans full-lifecycle software delivery
              across Saviant and Birlasoft—from drafting relational schemas in
              SQL Server and implementing ASP.NET Web APIs to delivering
              responsive Angular user interfaces.
            </p>
          </div>

          {/* Right column - details & credentials */}
          <div className="lg:col-span-5 space-y-4">
            {profile.location && (
              <div
                className={`flex items-center justify-between p-4 border transition-colors ${
                  darkMode
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-black/10 bg-black/[0.01]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`w-4 h-4 ${
                      darkMode ? "text-[#ff0080]" : "text-[#ff0080]"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono uppercase tracking-wider ${
                      darkMode ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Location
                  </span>
                </div>
                <span
                  className={`font-mono text-sm font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {profile.location}
                </span>
              </div>
            )}

            {profile.yearsExperience && (
              <div
                className={`flex items-center justify-between p-4 border transition-colors ${
                  darkMode
                    ? "border-white/10 bg-white/[0.02]"
                    : "border-black/10 bg-black/[0.01]"
                }`}
              >
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    darkMode ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Experience
                </span>
                <span
                  className={`font-mono text-sm font-semibold text-[#ff0080]`}
                >
                  {profile.yearsExperience}+ Years Professional
                </span>
              </div>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className={`flex items-center justify-between p-4 border transition-colors group ${
                  darkMode
                    ? "border-white/10 bg-white/[0.02] hover:border-[#ff0080]"
                    : "border-black/10 bg-black/[0.01] hover:border-[#ff0080]"
                }`}
              >
                <span
                  className={`text-xs font-mono uppercase tracking-wider ${
                    darkMode ? "text-white/50" : "text-black/50"
                  }`}
                >
                  Direct Email
                </span>
                <span
                  className={`font-mono text-sm font-medium flex items-center gap-1.5 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {profile.email}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-[#ff0080] transition-all" />
                </span>
              </a>
            )}

            <div className="pt-4">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 font-mono text-xs tracking-widest font-semibold border transition-all ${
                  darkMode
                    ? "border-white/20 text-white hover:border-[#ff0080] hover:text-[#ff0080]"
                    : "border-black/20 text-black hover:border-[#ff0080] hover:text-[#ff0080]"
                }`}
              >
                <Download className="w-4 h-4" />
                DOWNLOAD RESUME (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* How I Build Systems */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-12 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
            />
            <h3
              className={`text-xs font-mono tracking-widest uppercase font-bold ${
                darkMode ? "text-white/60" : "text-black/60"
              }`}
            >
              How I Build Systems
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architecturePillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`p-6 border transition-all duration-300 ${
                  darkMode
                    ? "border-white/10 bg-white/[0.02] hover:border-white/30"
                    : "border-black/10 bg-black/[0.01] hover:border-black/30"
                }`}
              >
                <pillar.icon className={`w-5 h-5 mb-4 text-[#ff0080]`} />
                <h4
                  className={`text-sm font-bold mb-2 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {pillar.title}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${
                    darkMode ? "text-white/50" : "text-black/60"
                  }`}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
