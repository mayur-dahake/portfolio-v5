import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Plus, Minus, Calendar } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    return format(new Date(dateStr), "MMM yyyy");
  } catch {
    return dateStr;
  }
};

const experienceBullets = {
  Saviant: [
    "Engineered and enhanced customer-facing web applications using Angular and .NET Core, delivering responsive and maintainable platform features.",
    "Designed and implemented cloud-based backend services in Microsoft Azure, focusing on service reliability and secure data exchange.",
    "Collaborated with cross-functional teams to optimize database interactions in SQL Server and deliver consistent user experiences."
  ],
  Birlasoft: [
    "Developed and integrated RESTful APIs using ASP.NET Web API and C#, connecting client frontends with relational database systems.",
    "Authored relational schemas, stored procedures, and data queries in SQL Server to support business-critical reporting workflows.",
    "Collaborated with designers and engineers to build reusable UI components and scalable web application features."
  ]
};

function TimelineItem({ exp, index, isExpanded, onToggle, darkMode }) {
  const [hovered, setHovered] = useState(false);
  const bullets =
    experienceBullets[exp.company] ||
    (exp.description ? [exp.description] : []);

  return (
    <div className="relative pl-8 md:pl-14">
      {/* Timeline dot */}
      <div className="absolute left-0 top-7 flex flex-col items-center">
        <div
          className={`w-3.5 h-3.5 rounded-full border-2 border-[#ff0080] z-10 transition-colors ${
            hovered || isExpanded || exp.isCurrent
              ? "bg-[#ff0080]"
              : "bg-transparent"
          }`}
        />
        {exp.isCurrent && (
          <div className="absolute w-3.5 h-3.5 rounded-full bg-[#ff0080]/30 animate-ping" />
        )}
      </div>

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`mb-5 border transition-all duration-200 cursor-pointer ${
          darkMode ? "bg-white/[0.02]" : "bg-black/[0.01]"
        } ${
          hovered || isExpanded
            ? "border-[#ff0080]/50"
            : darkMode
              ? "border-white/10"
              : "border-black/10"
        }`}
        onClick={onToggle}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 p-5 md:p-7">
          <div className="flex-1 min-w-0">
            {/* Index badge */}
            <span className="text-[10px] font-mono text-[#ff0080] tracking-widest mb-1.5 block">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Role Title - Fixed bug (exp.title || exp.role) */}
            <h3
              className={`text-xl md:text-2xl font-bold leading-tight transition-colors ${
                hovered || isExpanded
                  ? "text-[#ff0080]"
                  : darkMode
                    ? "text-white"
                    : "text-black"
              }`}
            >
              {exp.title || exp.role || "Software Engineer"}
            </h3>

            {/* Company Name */}
            <p
              className={`text-base font-semibold mt-1 ${
                darkMode ? "text-white/80" : "text-black/80"
              }`}
            >
              {exp.company}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span
                className={`flex items-center gap-1.5 text-xs font-mono ${
                  darkMode ? "text-white/40" : "text-black/50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#ff0080]" />
                {formatDate(exp.startDate)} —{" "}
                {exp.isCurrent ? (
                  <span className="text-[#ff0080] font-bold">PRESENT</span>
                ) : (
                  formatDate(exp.endDate)
                )}
              </span>
              {exp.isCurrent && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#ff0080]/10 text-[#ff0080] border border-[#ff0080]/30 tracking-widest uppercase font-semibold">
                  CURRENT
                </span>
              )}
            </div>
          </div>

          {/* Toggle button */}
          <div
            className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border mt-1 transition-colors ${
              isExpanded
                ? "bg-[#ff0080] border-[#ff0080] text-white"
                : darkMode
                  ? "border-white/20 text-white/70"
                  : "border-black/20 text-black/70"
            }`}
          >
            {isExpanded ? (
              <Minus className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Content details - Open by default for active role */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className={`px-5 md:px-7 pb-7 border-t pt-5 ${
                  darkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                {/* Structured Bullets */}
                <div className="mb-6">
                  <p
                    className={`text-[10px] font-mono tracking-widest mb-3 uppercase ${
                      darkMode ? "text-white/40" : "text-black/50"
                    }`}
                  >
                    Key Responsibilities & Contributions
                  </p>
                  <ul className="space-y-2.5">
                    {bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className={`text-sm md:text-base leading-relaxed flex items-start gap-2.5 ${
                          darkMode ? "text-white/70" : "text-black/70"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080] flex-shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div>
                    <p
                      className={`text-[10px] font-mono tracking-widest mb-2.5 uppercase ${
                        darkMode ? "text-white/40" : "text-black/50"
                      }`}
                    >
                      Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-1 text-xs font-mono border ${
                            darkMode
                              ? "text-white/70 border-white/15 bg-white/[0.02]"
                              : "text-black/70 border-black/15 bg-black/[0.02]"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ExperienceSection({ experiences = [], darkMode }) {
  const sortedExperiences =
    experiences && experiences.length > 0
      ? [...experiences].sort((a, b) => {
          if (a.isCurrent) return -1;
          if (b.isCurrent) return 1;
          return new Date(b.startDate) - new Date(a.startDate);
        })
      : [];

  // Current job is expanded by default so recruiter sees experience immediately
  const [expandedId, setExpandedId] = useState(() => {
    const current = sortedExperiences.find((e) => e.isCurrent);
    return current ? current.id : sortedExperiences[0]?.id;
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden ${
        darkMode ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-8">
          <span
            className={`text-xs font-mono tracking-widest ${
              darkMode ? "text-[#ff0080]" : "text-[#ff0080]"
            }`}
          >
            002
          </span>
          <div
            className={`w-12 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <h2
            className={`text-xs font-mono tracking-widest uppercase font-bold ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            Work History
          </h2>
        </div>

        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <h3
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Professional <span className="text-[#ff0080]">Experience</span>
          </h3>
          <p
            className={`text-sm md:text-base mt-2 font-normal ${
              darkMode ? "text-white/50" : "text-black/60"
            }`}
          >
            5+ years of software engineering across enterprise client solutions
            and cloud systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-[6px] top-6 bottom-4 w-px ${
              darkMode ? "bg-white/10" : "bg-black/10"
            }`}
          />

          <div>
            {sortedExperiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={index}
                isExpanded={expandedId === exp.id}
                onToggle={() =>
                  setExpandedId(expandedId === exp.id ? null : exp.id)
                }
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
