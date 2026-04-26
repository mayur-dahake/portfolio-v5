import React from "react";
import { motion } from "framer-motion";
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
    desc: "DAL → BLL → API separation for maintainability and testability"
  },
  {
    icon: Database,
    title: "DB Optimization",
    desc: "Indexing, query tuning, SqlBulkCopy for high-volume data ops"
  },
  {
    icon: Shield,
    title: "Security First",
    desc: "JWT auth, input validation, encrypted sensitive data at rest"
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Caching strategies, async pipelines, bulk operations"
  }
];

export default function AboutSection({ profile, darkMode }) {
  if (!profile) return null;

  const words = profile.bio?.split(" ").filter(Boolean) || [];
  // Show first ~15 words in the hero statement, rest in detail — guard against short bios
  const splitAt = Math.min(15, Math.max(0, Math.floor(words.length * 0.5)));

  return (
    <section
      id="about"
      className={`py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden ${darkMode ? "bg-[#111]" : "bg-[#f5f5f0]"}`}
    >
      {/* Large background text */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black pointer-events-none whitespace-nowrap ${darkMode ? "text-white/[0.02]" : "text-black/[0.02]"}`}
      >
        ABOUT
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
            001
          </span>
          <div
            className={`w-16 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <span
            className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            ABOUT
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left column - large statement */}
          <div className="lg:col-span-7">
            <motion.p
              className={`text-xl md:text-4xl lg:text-5xl font-light leading-tight ${darkMode ? "text-white" : "text-black"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {words.slice(0, splitAt).map((word, i) => (
                <motion.span
                  key={i}
                  className={i % 7 === 3 ? "text-[#ff0080] italic" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Right column - details */}
          <div className="lg:col-span-5 lg:pt-12">
            <motion.p
              className={`text-lg leading-relaxed mb-12 ${darkMode ? "text-white/60" : "text-black/60"}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {words.slice(splitAt).join(" ")}
            </motion.p>

            {/* Info cards */}
            <div className="space-y-4">
              {profile.location && (
                <motion.div
                  className={`group flex items-center justify-between p-4 border-b hover:border-[#ff0080] transition-colors cursor-default ${darkMode ? "border-white/10" : "border-black/10"}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`w-4 h-4 group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white/30" : "text-black/30"}`}
                    />
                    <span
                      className={`text-xs font-mono uppercase tracking-wider ${darkMode ? "text-white/40" : "text-black/40"}`}
                    >
                      Location
                    </span>
                  </div>
                  <span
                    className={`font-medium ${darkMode ? "text-white" : "text-black"}`}
                  >
                    {profile.location}
                  </span>
                </motion.div>
              )}

              {profile.yearsExperience && (
                <motion.div
                  className={`group flex items-center justify-between p-4 border-b hover:border-[#ff0080] transition-colors cursor-default ${darkMode ? "border-white/10" : "border-black/10"}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span
                    className={`text-xs font-mono uppercase tracking-wider ${darkMode ? "text-white/40" : "text-black/40"}`}
                  >
                    Experience
                  </span>
                  <span
                    className={`font-medium ${darkMode ? "text-white" : "text-black"}`}
                  >
                    {profile.yearsExperience}+ Years
                  </span>
                </motion.div>
              )}

              {profile.email && (
                <motion.a
                  href={`mailto:${profile.email}`}
                  className={`group flex items-center justify-between p-4 border-b hover:border-[#ff0080] transition-colors ${darkMode ? "border-white/10" : "border-black/10"}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <span
                    className={`text-xs font-mono uppercase tracking-wider ${darkMode ? "text-white/40" : "text-black/40"}`}
                  >
                    Email
                  </span>
                  <span
                    className={`font-medium flex items-center gap-2 ${darkMode ? "text-white" : "text-black"}`}
                  >
                    {profile.email}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </motion.a>
              )}
            </div>

            {/* Resume button */}
            {profile.resumeUrl && (
              <motion.a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 mt-12 px-6 py-4 font-medium hover:bg-[#ff0080] transition-colors group ${darkMode ? "bg-white text-black hover:text-white" : "bg-black text-white"}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <Download className="w-4 h-4" />
                Download CV
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
              </motion.a>
            )}
          </div>
        </div>

        {/* How I Build Systems */}
        <motion.div
          className="mt-20 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`w-16 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
            />
            <span
              className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
            >
              HOW I BUILD SYSTEMS
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {architecturePillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className={`group p-5 border hover:border-[#ff0080] transition-all duration-300 ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-black/[0.02]"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <pillar.icon
                  className={`w-5 h-5 mb-3 group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white/40" : "text-black/40"}`}
                />
                <h4
                  className={`text-sm font-bold mb-1.5 group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white" : "text-black"}`}
                >
                  {pillar.title}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${darkMode ? "text-white/40" : "text-black/40"}`}
                >
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
