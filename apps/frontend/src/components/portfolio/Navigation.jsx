import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const navItems = [
  { label: "About", href: "#about", num: "001" },
  { label: "Experience", href: "#experience", num: "002" },
  { label: "Work", href: "#projects", num: "003" },
  { label: "Skills", href: "#skills", num: "004" },
  { label: "Contact", href: "#contact", num: "005" }
];

export default function Navigation({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section via IntersectionObserver-style scroll check
      const sectionIds = navItems.map((i) => i.href.replace("#", ""));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed nav */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "bg-[#0a0a0a]/90 backdrop-blur-md"
              : "bg-white/90 backdrop-blur-md"
            : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`text-xl font-black transition-colors ${darkMode ? "text-white" : scrolled ? "text-black" : "text-white"}`}
          >
            ✦
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-white"
                      : darkMode
                        ? "text-white/50 hover:text-white"
                        : scrolled
                          ? "text-black/50 hover:text-black"
                          : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#ff0080] mr-1">
                    {item.num}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#ff0080]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                darkMode
                  ? "text-white/50 hover:text-[#ff0080]"
                  : scrolled
                    ? "text-black/50 hover:text-[#ff0080]"
                    : "text-white/50 hover:text-[#ff0080]"
              }`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 flex items-center justify-center ${darkMode ? "text-white" : scrolled ? "text-black" : "text-white"}`}
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className={`w-10 h-10 flex items-center justify-center ${darkMode ? "text-white" : scrolled ? "text-black" : "text-white"}`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <div className="px-6 h-20 flex items-center justify-between">
              <span className="text-xl font-black text-white">✦</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="py-4 text-left group"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <span className="text-xs font-mono text-[#ff0080] block mb-1">
                    {item.num}
                  </span>
                  <span className="text-4xl font-black text-white group-hover:text-[#ff0080] transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
