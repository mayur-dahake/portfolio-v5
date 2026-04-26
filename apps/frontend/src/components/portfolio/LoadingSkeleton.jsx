import { motion } from "framer-motion";

const Bone = ({ className }) => (
  <div className={`bg-white/5 animate-pulse ${className}`} />
);

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Nav skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        <Bone className="w-6 h-6" />
        <div className="hidden md:flex gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Bone key={i} className="w-16 h-3 rounded" />
          ))}
        </div>
        <Bone className="w-8 h-8 rounded" />
      </div>

      {/* Hero skeleton */}
      <div className="min-h-screen px-6 md:px-12 lg:px-24 flex flex-col justify-center pt-32 pb-16">
        <div className="mb-2">
          <Bone className="h-[12vw] w-[55%] mb-3" />
          <Bone className="h-[12vw] w-[72%] mb-3 ml-[10vw]" />
        </div>
        <div className="flex items-center gap-4 mb-16 ml-[10vw] mt-4">
          <Bone className="w-12 h-12 flex-shrink-0" />
          <Bone className="h-6 w-64 rounded" />
        </div>
        <div className="flex gap-12">
          <div>
            <Bone className="h-16 w-24 mb-2" />
            <Bone className="h-3 w-12 rounded" />
          </div>
          <div>
            <Bone className="h-16 w-16 mb-2" />
            <Bone className="h-3 w-16 rounded" />
          </div>
        </div>
      </div>

      {/* Section skeleton */}
      <div className="px-6 md:px-12 lg:px-24 py-24">
        <Bone className="h-3 w-32 mb-16 rounded" />
        <Bone className="h-12 w-2/3 mb-4 rounded" />
        <Bone className="h-5 w-full max-w-xl mb-2 rounded" />
        <Bone className="h-5 w-4/5 max-w-lg mb-2 rounded" />
        <Bone className="h-5 w-3/5 max-w-md rounded" />
      </div>

      {/* Subtle center indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-1.5 h-1.5 bg-[#ff0080]" />
        <span className="text-[10px] font-mono text-white/30 tracking-widest">
          LOADING
        </span>
      </motion.div>
    </div>
  );
}
