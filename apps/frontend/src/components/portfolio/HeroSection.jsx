import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDownRight, Download } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import TypingText from './TypingText';

// X (Twitter) icon
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function HeroSection({ profile, darkMode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!profile) return null;

  const socialLinks = [
    { icon: Github, url: profile.github_url, label: 'GH' },
    { icon: Linkedin, url: profile.linkedin_url, label: 'LI' },
    { icon: XIcon, url: profile.twitter_url, label: 'TW' },
    { icon: Mail, url: `mailto:${profile.email}`, label: 'EM' },
  ].filter(link => link.url);

  const nameParts = (profile.name || 'Mayur Dahake').toUpperCase().split(' ');

  return (
    <section className={`min-h-screen relative overflow-hidden flex items-center ${darkMode ? 'bg-[#0a0a0a]' : 'bg-[#1a1a2e]'}`} aria-label="Hero">
      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      
      {/* Cursor follower blob */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #ff0080 0%, transparent 70%)',
        }}
        animate={{
          x: mousePos.x - 192,
          y: mousePos.y - 192,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute top-[20%] left-0 right-0 h-px bg-white/5" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-white/5" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
        {/* Top bar - placed below the nav (nav is h-20 = 80px) */}
        <div className="absolute top-24 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-start text-xs font-mono text-white/40 pointer-events-none">
          <div>
            <div className="text-white/60">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
            <div>{profile.location || 'EARTH'}</div>
          </div>
          <div className="text-right">
            <div className="text-white/60">PORTFOLIO</div>
            <div>2026 — ∞</div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-44 pb-24">
          {/* Massive typography */}
          <div className="relative mb-8">
            {nameParts.map((part, i) => (
              <motion.div
                key={i}
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <motion.h1
                  className={`text-[12vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter ${
                    i % 2 === 0 ? 'text-white' : 'text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]'
                  }`}
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    marginLeft: i % 2 === 1 ? '10vw' : 0,
                  }}
                >
                  {part}
                </motion.h1>
              </motion.div>
            ))}
          </div>

          {/* Tagline with accent */}
          <motion.div
            className="flex items-start gap-3 md:gap-4 mb-6 md:mb-8 ml-0 md:ml-[10vw]"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="w-8 h-8 md:w-12 md:h-12 bg-[#ff0080] flex items-center justify-center text-black font-black text-sm md:text-xl flex-shrink-0 mt-1">
              ✦
            </span>
            <div className="max-w-lg">
              <p className="text-base md:text-xl text-white font-semibold tracking-wide mb-1">
                <TypingText text={profile.tagline} delay={900} speed={40} />
              </p>
              <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                Specialized in ERP systems, performance optimization & secure REST APIs.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mb-10 ml-0 md:ml-[10vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff0080] text-white font-mono text-xs tracking-widest hover:bg-[#ff0080]/80 transition-all duration-300"
            >
              HIRE ME
            </a>
            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 text-white/70 font-mono text-xs tracking-widest hover:border-[#ff0080] hover:text-[#ff0080] transition-all duration-300 group"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                RESUME
              </a>
            )}
          </motion.div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            {/* Stats */}
            <motion.div
              className="flex gap-6 md:gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {profile.years_experience && (
                <div>
                  <div className="text-4xl md:text-7xl font-black text-[#ff0080]">
                    <AnimatedCounter target={profile.years_experience} />+
                  </div>
                  <div className="text-[10px] md:text-xs font-mono text-white/40 tracking-widest">YEARS</div>
                </div>
              )}
              <div>
                <div className="text-4xl md:text-7xl font-black text-white">∞</div>
                <div className="text-[10px] md:text-xs font-mono text-white/40 tracking-widest">CURIOSITY</div>
              </div>
            </motion.div>

            {/* Social links - vertical */}
            <motion.div
              className="flex md:flex-col gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.label !== 'EM' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group w-12 h-12 border border-white/20 flex items-center justify-center text-white/50 hover:bg-[#ff0080] hover:border-[#ff0080] hover:text-black transition-all duration-300"
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-xs font-mono"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDownRight className="w-4 h-4" />
          SCROLL
        </motion.div>
      </div>
    </section>
  );
}
