import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectSchema } from "./SEOHead";

function parseCaseStudy(text) {
  if (!text) return [];
  const rawSections = text.split(/(?=###\s+)/);
  const sections = [];
  for (const chunk of rawSections) {
    const match = chunk.match(/^###\s+([^\n]+)\n+([\s\S]*)$/);
    if (match) {
      sections.push({
        heading: match[1].trim(),
        content: match[2].trim()
      });
    }
  }
  return sections;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  darkMode,
  authorName
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const sections = parseCaseStudy(project.longDescription);
  const hasLinks = Boolean(
    (project.liveUrl && project.liveUrl !== "#") ||
    (project.repoUrl && project.repoUrl !== "#")
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* SEO Schema for project */}
          <ProjectSchema project={project} authorName={authorName} />

          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className="fixed inset-4 sm:inset-8 md:inset-14 lg:inset-20 z-50 overflow-hidden max-w-4xl mx-auto my-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className={`h-full rounded-none border overflow-hidden flex flex-col ${
                darkMode
                  ? "bg-[#111111] border-white/20 text-white"
                  : "bg-white border-black/20 text-black"
              }`}
            >
              {/* Header bar */}
              <div
                className={`p-5 md:p-6 border-b flex items-center justify-between ${
                  darkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {project.featured && (
                    <span className="px-2.5 py-1 bg-[#ff0080] text-white text-[10px] font-mono tracking-widest uppercase font-bold">
                      FEATURED CASE STUDY
                    </span>
                  )}
                  {project.tags?.[0] && (
                    <span
                      className={`text-xs font-mono tracking-wider ${
                        darkMode ? "text-white/50" : "text-black/50"
                      }`}
                    >
                      {project.tags[0]}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={onClose}
                    className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-mono tracking-wider ${
                      darkMode
                        ? "text-white/40 hover:text-[#ff0080]"
                        : "text-black/40 hover:text-[#ff0080]"
                    } transition-colors`}
                  >
                    Open Page <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className={`w-9 h-9 flex items-center justify-center border transition-colors focus-visible:ring-2 focus-visible:ring-[#ff0080] focus-visible:outline-none ${
                      darkMode
                        ? "border-white/20 hover:border-[#ff0080] hover:text-[#ff0080]"
                        : "border-black/20 hover:border-[#ff0080] hover:text-[#ff0080]"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable content body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-1 space-y-8">
                {/* Title & Short Value Statement */}
                <div>
                  <h2
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3"
                  >
                    {project.title}
                  </h2>
                  <p
                    className={`text-base md:text-lg leading-relaxed ${
                      darkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div
                    className={`pt-5 border-t ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <h3
                      className={`text-[10px] font-mono tracking-widest uppercase mb-3 font-semibold ${
                        darkMode ? "text-white/40" : "text-black/50"
                      }`}
                    >
                      Verified Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs font-mono border ${
                            darkMode
                              ? "border-white/15 bg-white/[0.02] text-white/80"
                              : "border-black/15 bg-black/[0.02] text-black/80"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Case Study Sections */}
                {sections.length > 0 ? (
                  <div className="space-y-6">
                    {sections.map((section) => (
                      <div
                        key={section.heading}
                        className={`pt-6 border-t ${
                          darkMode ? "border-white/10" : "border-black/10"
                        }`}
                      >
                        <h4 className="text-xs font-mono tracking-widest text-[#ff0080] uppercase mb-3 font-bold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]" />
                          {section.heading}
                        </h4>
                        {section.content.includes("\n- ") ||
                        section.content.startsWith("- ") ? (
                          <ul className="space-y-2 mt-2">
                            {section.content
                              .split("\n")
                              .filter((line) => line.trim().startsWith("- "))
                              .map((item, idx) => (
                                <li
                                  key={idx}
                                  className={`text-sm sm:text-base leading-relaxed flex items-start gap-2.5 ${
                                    darkMode ? "text-white/80" : "text-black/80"
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]/60 mt-2 flex-shrink-0" />
                                  <span>{item.replace(/^- /, "")}</span>
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <p
                            className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                              darkMode ? "text-white/80" : "text-black/80"
                            }`}
                          >
                            {section.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  project.longDescription && (
                    <div
                      className={`pt-6 border-t ${
                        darkMode ? "border-white/10" : "border-black/10"
                      }`}
                    >
                      <h4
                        className={`text-xs font-mono tracking-widest uppercase mb-3 font-semibold ${
                          darkMode ? "text-white/40" : "text-black/50"
                        }`}
                      >
                        Overview
                      </h4>
                      <p
                        className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                          darkMode ? "text-white/80" : "text-black/80"
                        }`}
                      >
                        {project.longDescription}
                      </p>
                    </div>
                  )
                )}

                {/* Action Buttons - Only rendered if valid links actually exist */}
                {hasLinks && (
                  <div
                    className={`pt-6 border-t ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ff0080] text-white font-mono text-xs tracking-widest font-bold hover:bg-[#ff0080]/90 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LIVE DEMO
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                      {project.repoUrl && project.repoUrl !== "#" && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-6 py-3.5 border font-mono text-xs tracking-widest font-bold transition-all ${
                            darkMode
                              ? "border-white/30 text-white hover:border-[#ff0080] hover:text-[#ff0080]"
                              : "border-black/30 text-black hover:border-[#ff0080] hover:text-[#ff0080]"
                          }`}
                        >
                          <Github className="w-4 h-4" />
                          VIEW REPOSITORY
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
