import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { ProjectSchema } from "./SEOHead";

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  darkMode,
  authorName
}) {
  if (!project) return null;

  const hasLinks = Boolean(project.liveUrl || project.repoUrl);

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
                className={`p-6 border-b flex items-center justify-between ${
                  darkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {project.featured && (
                    <span className="px-2.5 py-1 bg-[#ff0080] text-white text-[10px] font-mono tracking-widest uppercase font-bold">
                      FEATURED
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

                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                    darkMode
                      ? "border-white/20 hover:border-[#ff0080] hover:text-[#ff0080]"
                      : "border-black/20 hover:border-[#ff0080] hover:text-[#ff0080]"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable content body */}
              <div className="p-6 md:p-10 overflow-y-auto flex-1 space-y-8">
                {/* Title */}
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
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

                {/* Detailed Description */}
                {project.longDescription && (
                  <div
                    className={`pt-6 border-t ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <h3
                      className={`text-xs font-mono tracking-widest uppercase mb-3 font-semibold ${
                        darkMode ? "text-white/40" : "text-black/50"
                      }`}
                    >
                      Project Overview
                    </h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        darkMode ? "text-white/80" : "text-black/80"
                      }`}
                    >
                      {project.longDescription}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div
                    className={`pt-6 border-t ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <h3
                      className={`text-xs font-mono tracking-widest uppercase mb-3 font-semibold ${
                        darkMode ? "text-white/40" : "text-black/50"
                      }`}
                    >
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1.5 text-xs font-mono border ${
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

                {/* Action Buttons - Only rendered if links actually exist */}
                {hasLinks && (
                  <div
                    className={`pt-6 border-t ${
                      darkMode ? "border-white/10" : "border-black/10"
                    }`}
                  >
                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && (
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
                      {project.repoUrl && (
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
