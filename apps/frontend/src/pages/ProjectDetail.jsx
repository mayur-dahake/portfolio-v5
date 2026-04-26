import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/apiClient";
import { createPageUrl } from "@/utils";

export default function ProjectDetail() {
  const { id } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.get(`/api/projects/${id}`),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-3 h-3 bg-[#ff0080] animate-pulse" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 text-white">
        <p className="font-mono text-white/40">PROJECT NOT FOUND</p>
        <Link to={createPageUrl("Home")} className="text-[#ff0080] font-mono text-sm hover:underline">
          ← BACK HOME
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <Link
          to={createPageUrl("Home")}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-[#ff0080]/40 text-[#ff0080] text-xs font-mono tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-7xl font-black leading-[0.9] mb-6">{project.title}</h1>
          <p className="text-xl text-white/60 max-w-2xl mb-8">{project.description}</p>

          <div className="flex gap-4 mb-12">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#ff0080] text-white font-mono text-sm tracking-wider hover:bg-[#ff0080]/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                LIVE DEMO
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-mono text-sm tracking-wider hover:border-white transition-colors"
              >
                <Github className="w-4 h-4" />
                SOURCE
              </a>
            )}
          </div>
        </motion.div>

        {/* Long description */}
        {project.longDescription && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-mono text-white/30 tracking-widest mb-6">OVERVIEW</p>
            <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
              {project.longDescription}
            </p>
          </motion.div>
        )}

        {/* Tech stack */}
        {project.techStack?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs font-mono text-white/30 tracking-widest mb-6">TECH STACK</p>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 border border-white/10 text-white/60 text-sm font-mono hover:border-[#ff0080] hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
