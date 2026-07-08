import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowUpRight, ChevronDown, Filter } from "lucide-react";
import ProjectModal from "./ProjectModal";
import speedonixImg from "../../assets/projects/speedonix.png";

const PAGE_SIZE = 4;

export default function ProjectsSection({ projects, darkMode, authorName }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { featuredProjects, otherProjects, allTags } = useMemo(() => {
    if (!projects)
      return { featuredProjects: [], otherProjects: [], allTags: [] };
    const featured = projects.filter((p) => p.featured);
    const other = projects.filter((p) => !p.featured);
    const tags = ["All", ...new Set(projects.flatMap((p) => p.tags || []))];
    return { featuredProjects: featured, otherProjects: other, allTags: tags };
  }, [projects]);

  const filteredOtherProjects = useMemo(() => {
    if (activeFilter === "All") return otherProjects;
    return otherProjects.filter((p) => p.tags?.includes(activeFilter));
  }, [otherProjects, activeFilter]);

  const visibleProjects = filteredOtherProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOtherProjects.length;

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section
        id="projects"
        className={`py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden ${darkMode ? "bg-[#0a0a0a]" : "bg-[#f5f5f0]"}`}
      >
        {/* Large background text */}
        <div
          className={`absolute -bottom-20 -right-20 text-[25vw] font-black pointer-events-none leading-none ${darkMode ? "text-white/[0.02]" : "text-black/[0.02]"}`}
        >
          WORK
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section marker */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span
              className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
            >
              003
            </span>
            <div
              className={`w-16 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
            />
            <span
              className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
            >
              SELECTED WORK
            </span>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-20">
              <h3 className="text-xs font-mono tracking-widest mb-8 text-[#ff0080]">
                ★ FEATURED PROJECTS
              </h3>
              <div className="space-y-12 md:space-y-24">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`grid md:grid-cols-12 gap-8 items-center cursor-pointer group ${index % 2 === 1 ? "md:text-right" : ""}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Premium project card visual */}
                    <div
                      className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}
                    >
                      <div className="relative overflow-hidden group/card">
                        {/* Gradient or Image background — unique per project */}
                        <div
                          className="w-full aspect-[4/3] relative bg-cover bg-center overflow-hidden"
                          style={{
                            backgroundImage:
                              project.title?.toLowerCase() === "speedonix"
                                ? `url(${speedonixImg})`
                                : [
                                    "linear-gradient(135deg, #1a0a1e 0%, #2d0a3d 40%, #0a0a1a 100%)",
                                    "linear-gradient(135deg, #0a1a0a 0%, #0d2d1a 40%, #0a0a1a 100%)",
                                    "linear-gradient(135deg, #1a0a0a 0%, #2d1a0a 40%, #1a0a1a 100%)",
                                    "linear-gradient(135deg, #0a0a1a 0%, #0a1a2d 40%, #0a1a1a 100%)"
                                  ][index % 4]
                          }}
                        >
                          {/* Dot-grid pattern overlay */}
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                              backgroundSize: "24px 24px"
                            }}
                          />

                          {/* Accent glow */}
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background:
                                "radial-gradient(ellipse at 30% 50%, #ff008040 0%, transparent 60%)"
                            }}
                          />

                          {/* Large watermark initial */}
                          <span
                            className="absolute bottom-4 right-6 text-[10rem] font-black leading-none select-none pointer-events-none"
                            style={{ color: "rgba(255,255,255,0.04)" }}
                          >
                            {project.title?.charAt(0)}
                          </span>

                          {/* Tech stack preview — top-left */}
                          {project.techStack?.slice(0, 3).length > 0 && (
                            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                              {project.techStack.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 text-[10px] font-mono text-white/60 border border-white/10 bg-black/30 backdrop-blur-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 3 && (
                                <span className="px-2 py-0.5 text-[10px] font-mono text-[#ff0080]/60 border border-[#ff0080]/20 bg-black/30">
                                  +{project.techStack.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Floating index number */}
                          <div
                            className={`absolute -top-4 ${index % 2 === 1 ? "-left-4" : "-right-4"} text-8xl font-black text-[#ff0080]/20 select-none pointer-events-none`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                            <span className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-xs font-mono tracking-widest">
                              VIEW DETAILS
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 17L17 7M17 7H7M17 7v10"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`md:col-span-5 ${index % 2 === 1 ? "md:order-1 md:pr-8" : "md:pl-8"}`}
                    >
                      <h3
                        className={`text-2xl md:text-5xl font-black mb-4 leading-tight group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white" : "text-black"}`}
                      >
                        {project.title}
                      </h3>

                      <p
                        className={`text-lg mb-6 leading-relaxed ${darkMode ? "text-white/50" : "text-black/50"}`}
                      >
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      {project.techStack?.length > 0 && (
                        <div
                          className={`flex flex-wrap gap-2 mb-8 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                        >
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-xs font-mono ${darkMode ? "text-white/40" : "text-black/40"}`}
                            >
                              {tech}
                              {project.techStack.indexOf(tech) <
                                project.techStack.length - 1 && " /"}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div
                        className={`flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group/link flex items-center gap-2 font-medium hover:text-[#ff0080] transition-colors ${darkMode ? "text-white" : "text-black"}`}
                          >
                            View Live
                            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group/link flex items-center gap-2 transition-colors ${darkMode ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"}`}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Category Filters */}
          {allTags.length > 1 && (
            <div className="flex flex-wrap gap-2 items-center mb-10">
              <Filter
                className={`w-3 h-3 ${darkMode ? "text-white/30" : "text-black/30"}`}
              />
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveFilter(tag);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`text-xs font-mono px-3 py-1 border transition-all ${
                    activeFilter === tag
                      ? "border-[#ff0080] bg-[#ff0080] text-white"
                      : darkMode
                        ? "border-white/20 text-white/50 hover:border-white/50"
                        : "border-black/20 text-black/50 hover:border-black/50"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <p
                className={`text-xs font-mono tracking-widest mb-6 ${darkMode ? "text-white/40" : "text-black/40"}`}
              >
                OTHER PROJECTS ({filteredOtherProjects.length}
                {activeFilter !== "All" ? ` of ${otherProjects.length}` : ""})
              </p>

              <div
                className={`border-t ${darkMode ? "border-white/10" : "border-black/10"}`}
              >
                {filteredOtherProjects.length === 0 ? (
                  <div
                    className={`py-12 text-center text-sm font-mono ${darkMode ? "text-white/30" : "text-black/30"}`}
                  >
                    NO PROJECTS FOUND FOR "{activeFilter}"
                  </div>
                ) : (
                  <>
                    <AnimatePresence mode="popLayout">
                      {visibleProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.04 }}
                          className={`py-6 border-b group cursor-pointer ${darkMode ? "border-white/10" : "border-black/10"}`}
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4
                                className={`text-lg md:text-xl font-bold group-hover:text-[#ff0080] transition-colors ${darkMode ? "text-white" : "text-black"}`}
                              >
                                {project.title}
                              </h4>
                              <p
                                className={`text-sm mt-1 ${darkMode ? "text-white/40" : "text-black/40"}`}
                              >
                                {project.description}
                              </p>
                              {project.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-[10px] font-mono px-2 py-0.5 bg-[#ff0080]/10 text-[#ff0080] border border-[#ff0080]/20"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 md:max-w-xs">
                              {project.techStack?.map((tech) => (
                                <span
                                  key={tech}
                                  className={`text-xs font-mono px-2 py-1 ${darkMode ? "text-white/50 bg-white/5" : "text-black/50 bg-black/5"}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Links */}
                            <div
                              className="flex gap-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-9 h-9 flex items-center justify-center border hover:border-[#ff0080] hover:bg-[#ff0080] hover:text-white transition-all ${darkMode ? "border-white/20 text-white" : "border-black/20 text-black"}`}
                                  title="View Live"
                                >
                                  <ArrowUpRight className="w-4 h-4" />
                                </a>
                              )}
                              {project.repoUrl && (
                                <a
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-9 h-9 flex items-center justify-center border hover:border-[#ff0080] hover:bg-[#ff0080] hover:text-white transition-all ${darkMode ? "border-white/20 text-white" : "border-black/20 text-black"}`}
                                  title="View Code"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {hasMore && (
                      <motion.div className="flex justify-center pt-10">
                        <button
                          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                          className={`flex items-center gap-2 px-8 py-3 border font-mono text-xs tracking-widest hover:border-[#ff0080] hover:text-[#ff0080] transition-all ${darkMode ? "border-white/20 text-white/60" : "border-black/20 text-black/60"}`}
                        >
                          <ChevronDown className="w-4 h-4" />
                          LOAD MORE (
                          {filteredOtherProjects.length - visibleCount}{" "}
                          remaining)
                        </button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
        authorName={authorName}
      />
    </>
  );
}
