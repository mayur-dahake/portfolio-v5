import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/apiClient";
import { createPageUrl } from "@/utils";
import { fallbackProjects } from "@/lib/fallbackData";

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

export default function ProjectDetail() {
  const { id } = useParams();

  const { data: apiProject, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.get(`/api/projects/${id}`).catch(() => null),
    enabled: Boolean(id)
  });

  const project =
    apiProject || fallbackProjects.find((p) => p.id === id || p.title === id);

  if (isLoading && !project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-3 h-3 bg-[#ff0080] animate-pulse" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 text-white px-6">
        <p className="font-mono text-white/40 text-sm">PROJECT NOT FOUND</p>
        <Link
          to={createPageUrl("Home")}
          className="text-[#ff0080] font-mono text-xs tracking-widest hover:underline"
        >
          ← BACK TO HOME
        </Link>
      </div>
    );
  }

  const sections = parseCaseStudy(project.longDescription);
  const hasLinks = Boolean(
    (project.liveUrl && project.liveUrl !== "#") ||
    (project.repoUrl && project.repoUrl !== "#")
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <Link
          to={createPageUrl("Home")}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-mono tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO PORTFOLIO
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.featured && (
              <span className="px-2.5 py-1 bg-[#ff0080] text-white text-[10px] font-mono tracking-widest uppercase font-bold">
                FEATURED CASE STUDY
              </span>
            )}
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-white/20 text-white/70 text-xs font-mono tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Links */}
          {hasLinks && (
            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#ff0080] text-white font-mono text-xs tracking-widest font-bold hover:bg-[#ff0080]/80 transition-colors"
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
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-xs tracking-widest font-bold hover:border-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  SOURCE REPOSITORY
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* Verified Tech Stack */}
        {project.techStack?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-8 pb-10 border-t border-white/10"
          >
            <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-4 font-semibold">
              Verified Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 border border-white/15 bg-white/[0.02] text-white/80 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Case Study Sections */}
        {sections.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            {sections.map((section) => (
              <div
                key={section.heading}
                className="pt-8 border-t border-white/10"
              >
                <h2 className="text-xs font-mono tracking-widest text-[#ff0080] uppercase mb-4 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]" />
                  {section.heading}
                </h2>
                {section.content.includes("\n- ") ||
                section.content.startsWith("- ") ? (
                  <ul className="space-y-2.5 mt-3">
                    {section.content
                      .split("\n")
                      .filter((line) => line.trim().startsWith("- "))
                      .map((item, idx) => (
                        <li
                          key={idx}
                          className="text-base text-white/80 leading-relaxed flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff0080]/60 mt-2 flex-shrink-0" />
                          <span>{item.replace(/^- /, "")}</span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        ) : (
          project.longDescription && (
            <motion.div
              className="pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xs font-mono text-[#ff0080] tracking-widest uppercase mb-4 font-semibold">
                Overview
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed whitespace-pre-line">
                {project.longDescription}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
