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
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className={`h-full rounded-lg overflow-hidden ${darkMode ? "bg-[#111]" : "bg-white"}`}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  darkMode
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-black/10 text-black hover:bg-black/20"
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-full overflow-y-auto">
                {/* Featured badge (no image in schema) */}
                {project.featured && (
                  <div className="px-6 pt-6">
                    <span className="px-3 py-1 bg-[#ff0080] text-white text-xs font-mono tracking-wider">
                      ★ FEATURED
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 md:p-10">
                  {/* Title */}
                  <h2
                    className={`text-3xl md:text-5xl font-black mb-4 ${darkMode ? "text-white" : "text-black"}`}
                  >
                    {project.title}
                  </h2>

                  {/* Tech Stack */}
                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs font-mono ${
                            darkMode
                              ? "bg-white/10 text-white/70"
                              : "bg-black/5 text-black/70"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div
                    className={`mb-8 ${darkMode ? "text-white/70" : "text-black/70"}`}
                  >
                    <h3
                      className={`text-sm font-mono tracking-wider mb-3 ${darkMode ? "text-white/40" : "text-black/40"}`}
                    >
                      ABOUT THIS PROJECT
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-8">
                      <h3
                        className={`text-sm font-mono tracking-wider mb-3 ${darkMode ? "text-white/40" : "text-black/40"}`}
                      >
                        CATEGORIES
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 border border-[#ff0080]/30 text-[#ff0080] text-xs font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack detail */}
                  {project.techStack?.length > 0 && (
                    <div className="mb-8">
                      <h3
                        className={`text-sm font-mono tracking-wider mb-4 ${darkMode ? "text-white/40" : "text-black/40"}`}
                      >
                        TECHNOLOGIES USED
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 px-3 py-2 border ${darkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]" />
                            <span
                              className={`text-sm font-mono ${darkMode ? "text-white/80" : "text-black/80"}`}
                            >
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action Buttons - More Prominent */}
                  <div
                    className={`p-6 -mx-6 md:-mx-10 md:px-10 ${darkMode ? "bg-white/5" : "bg-black/5"}`}
                  >
                    <p
                      className={`text-xs font-mono tracking-wider mb-4 ${darkMode ? "text-white/40" : "text-black/40"}`}
                    >
                      EXPLORE PROJECT
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 flex items-center justify-center gap-4 px-8 py-5 bg-[#ff0080] text-white font-bold text-lg hover:bg-[#ff0080]/90 hover:scale-[1.02] transition-all shadow-lg shadow-[#ff0080]/25"
                        >
                          <ExternalLink className="w-6 h-6" />
                          View Live Demo
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex-1 flex items-center justify-center gap-4 px-8 py-5 border-2 font-bold text-lg transition-all hover:scale-[1.02] ${
                            darkMode
                              ? "border-white text-white hover:bg-white hover:text-black"
                              : "border-black text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          <Github className="w-6 h-6" />
                          View Source Code
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
