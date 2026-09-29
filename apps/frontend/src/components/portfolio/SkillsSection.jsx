import React, { useMemo } from "react";

// Canonical groupings based exclusively on verified skills in current portfolio data
const categoryOrder = [
  "Languages",
  "Backend & APIs",
  "Frontend",
  "Databases",
  "Cloud & Tools"
];

const categoryDescriptions = {
  Languages:
    "Core programming and querying languages used across client and server tiers.",
  "Backend & APIs":
    "Frameworks and protocols for building enterprise services and API contracts.",
  Frontend:
    "Modern component-based frameworks for web and enterprise UI engineering.",
  Databases:
    "Relational and document persistence stores for enterprise data workloads.",
  "Cloud & Tools":
    "Hosting, version control, containerization, and development tooling."
};

const skillCategoryMap = {
  // Languages
  "C#": "Languages",
  TypeScript: "Languages",
  JavaScript: "Languages",
  SQL: "Languages",

  // Backend & APIs
  ".NET Core": "Backend & APIs",
  ".NET": "Backend & APIs",
  "ASP.NET Web API": "Backend & APIs",
  "REST APIs": "Backend & APIs",
  Swagger: "Backend & APIs",
  "Node.js": "Backend & APIs",

  // Frontend
  Angular: "Frontend",
  HTML: "Frontend",
  CSS: "Frontend",
  SCSS: "Frontend",
  React: "Frontend",

  // Databases
  "SQL Server": "Databases",
  "Stored Procedures": "Databases",
  "Query Optimization": "Databases",
  MySQL: "Databases",
  PostgreSQL: "Databases",
  MongoDB: "Databases",

  // Cloud & Tools
  Azure: "Cloud & Tools",
  Git: "Cloud & Tools",
  Docker: "Cloud & Tools"
};

export default function SkillsSection({ skills, darkMode }) {
  const groupedSkills = useMemo(() => {
    const map = {
      Languages: [],
      "Backend & APIs": [],
      Frontend: [],
      Databases: [],
      "Cloud & Tools": []
    };

    if (skills && skills.length > 0) {
      skills.forEach((skill) => {
        const cat =
          skillCategoryMap[skill.name] || skill.category || "Languages";
        if (map[cat]) {
          map[cat].push(skill);
        } else {
          map["Cloud & Tools"].push(skill);
        }
      });
    }

    return map;
  }, [skills]);

  return (
    <section
      id="skills"
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden ${
        darkMode ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono tracking-widest text-[#ff0080]">
            004
          </span>
          <div
            className={`w-12 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <h2
            className={`text-xs font-mono tracking-widest uppercase font-bold ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            Technical Stack
          </h2>
        </div>

        <div className="mb-14">
          <h3
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Skills & <span className="text-[#ff0080]">Technologies</span>
          </h3>
          <p
            className={`text-sm md:text-base mt-2 font-normal ${
              darkMode ? "text-white/50" : "text-black/60"
            }`}
          >
            Technologies applied in production environments across 5+ years of
            software delivery.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="space-y-8 md:space-y-10">
          {categoryOrder.map((category) => {
            const items = groupedSkills[category] || [];
            if (items.length === 0) return null;

            return (
              <div
                key={category}
                className={`p-6 border transition-all ${
                  darkMode
                    ? "border-white/10 bg-white/[0.015]"
                    : "border-black/10 bg-black/[0.01]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
                  <h4 className="text-xs font-mono text-[#ff0080] tracking-widest uppercase font-bold">
                    {category}
                  </h4>
                  <p
                    className={`text-xs font-mono ${
                      darkMode ? "text-white/40" : "text-black/50"
                    }`}
                  >
                    {categoryDescriptions[category]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div
                      key={skill.id || skill.name}
                      className={`px-3 py-1.5 border font-mono text-xs font-medium transition-colors ${
                        darkMode
                          ? "border-white/15 text-white/80 bg-white/[0.02]"
                          : "border-black/15 text-black/80 bg-black/[0.02]"
                      }`}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
