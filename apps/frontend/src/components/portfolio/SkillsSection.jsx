import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Skill icons mapping
const skillIcons = {
  ".NET": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.829 0 0 1-.869.829.868.829 0 0 1-.868-.83.868.829 0 0 1 .868-.828.868.829 0 0 1 .869.829z" />
    </svg>
  ),
  "C#": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm-.5 3.5h1l.5 1.5h2l.5-1.5h1l-.5 1.5h1.5v1h-2l-.5 1.5h2v1h-2.5l-.5 1.5h-1l.5-1.5h-2l-.5 1.5h-1l.5-1.5H8v-1h2l.5-1.5H8v-1h3l.5-1.5zm.5 3h2l-.5 1.5h-2l.5-1.5zM6.5 13h3c1.5 0 2.5 1 2.5 2.5S11 18 9.5 18h-3v-5zm1.5 1.5v2h1.5c.5 0 1-.5 1-1s-.5-1-1-1h-1.5z" />
    </svg>
  ),
  Angular: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M9.931 12.645h4.138l-2.07-4.908m0-7.737L.68 3.982l1.726 14.771L12 24l9.596-5.242L23.32 3.984 11.999.001zm7.064 18.31h-2.638l-1.422-3.503H8.996l-1.422 3.504h-2.64L12 2.65z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  "SQL Server": (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M4.505 0C3.12 0 2 1.12 2 2.505v18.99C2 22.88 3.12 24 4.505 24h14.99C20.88 24 22 22.88 22 21.495V7.498L15.502 0zM14 2l6 6h-4.5c-.83 0-1.5-.67-1.5-1.5zm-2 10h6v1h-6zm0 2h6v1h-6zm0 2h4v1h-4zM6 9h6v5H6z" />
    </svg>
  ),
  Azure: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z" />
    </svg>
  )
};

const skillDescriptions = {
  ".NET": "Enterprise-grade framework for building scalable applications",
  "C#": "Modern, object-oriented programming language",
  Angular: "Platform for building mobile and desktop web applications",
  TypeScript: "Typed superset of JavaScript that compiles to plain JS",
  "SQL Server": "Relational database management system by Microsoft",
  Azure: "Cloud computing platform and services"
};

export default function SkillsSection({ skills, darkMode }) {
  const groupedSkills = useMemo(() => {
    if (!skills) return {};
    return skills.reduce((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  if (!skills || skills.length === 0) return null;

  const categories = Object.keys(groupedSkills);

  return (
    <section
      id="skills"
      className={`py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden ${darkMode ? "bg-[#0a0a0a]" : "bg-[#f0f0ea]"}`}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#ff0080] to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section marker */}
        <motion.div
          className="flex items-center gap-4 mb-10 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span
            className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            004
          </span>
          <div
            className={`w-16 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <span
            className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            SKILLS & TOOLS
          </span>
        </motion.div>

        {/* Skills as flowing tags */}
        <div className="space-y-5">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3
                className="text-[10px] font-mono text-[#ff0080] tracking-widest mb-3"
                aria-label={`${category} skills`}
              >
                {category.toUpperCase()}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {groupedSkills[category].map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.03 }}
                  >
                    <div
                      className={`px-2.5 py-1.5 border hover:border-[#ff0080] hover:bg-[#ff0080]/10 transition-all duration-300 cursor-default flex items-center gap-1.5 ${darkMode ? "border-white/20" : "border-black/20"}`}
                    >
                      {/* Skill Icon */}
                      <span
                        className={`group-hover:text-[#ff0080] transition-colors [&>svg]:w-3 [&>svg]:h-3 ${darkMode ? "text-white/60" : "text-black/50"}`}
                      >
                        {skillIcons[skill.name] || (
                          <div
                            className={`w-3 h-3 rounded flex items-center justify-center text-[8px] font-bold ${darkMode ? "bg-white/10" : "bg-black/10"}`}
                          >
                            {skill.name?.charAt(0)}
                          </div>
                        )}
                      </span>
                      <span
                        className={`text-xs font-medium group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {skill.name}
                      </span>
                      {skill.proficiency && (
                        <span
                          className={`text-[9px] font-mono px-1 py-0.5 rounded leading-none ${
                            skill.proficiency >= 80
                              ? "bg-[#ff0080]/20 text-[#ff0080]"
                              : skill.proficiency >= 55
                                ? darkMode
                                  ? "bg-white/10 text-white/50"
                                  : "bg-black/10 text-black/50"
                                : darkMode
                                  ? "bg-white/5 text-white/30"
                                  : "bg-black/5 text-black/30"
                          }`}
                        >
                          {skill.proficiency >= 80
                            ? "ADV"
                            : skill.proficiency >= 55
                              ? "INT"
                              : "FAM"}
                        </span>
                      )}
                    </div>

                    {/* Hover tooltip with description */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 border border-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 w-48 text-center">
                      <p className="text-xs text-white/70">
                        {skillDescriptions[skill.name] ||
                          `Expert in ${skill.name}`}
                      </p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            className={`text-[12vw] md:text-[8vw] font-black leading-none ${darkMode ? "text-white/[0.03]" : "text-black/[0.03]"}`}
          >
            ALWAYS LEARNING
          </p>
        </motion.div>
      </div>
    </section>
  );
}
