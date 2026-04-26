import React, { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[200] bg-transparent">
      <motion.div
        className="h-full bg-[#ff0080] origin-left"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}
