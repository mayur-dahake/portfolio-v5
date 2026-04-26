import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white/5" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-white/5" />
      </div>

      {/* Pink glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff0080]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl w-full">
        {/* Section marker */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-px bg-white/20" />
          <span className="text-xs font-mono text-white/40 tracking-widest">
            ERROR
          </span>
          <div className="w-12 h-px bg-white/20" />
        </motion.div>

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[28vw] md:text-[18vw] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] select-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="-mt-4 md:-mt-8 mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
            PAGE NOT <span className="text-[#ff0080]">FOUND</span>
          </h2>
          {pageName && (
            <p className="text-sm font-mono text-white/30">/{pageName}</p>
          )}
        </motion.div>

        {/* Back home button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button
            onClick={() => (window.location.href = "/")}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-mono text-xs tracking-widest hover:border-[#ff0080] hover:bg-[#ff0080]/10 hover:text-[#ff0080] transition-all duration-300"
          >
            BACK TO HOME
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
