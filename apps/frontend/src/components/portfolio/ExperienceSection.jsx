import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Plus, Minus, MapPin, Calendar } from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return format(new Date(dateStr), 'MMM yyyy');
};

function TimelineItem({ exp, index, isExpanded, onToggle, darkMode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative pl-10 md:pl-16"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 flex flex-col items-center">
        <motion.div
          animate={{
            scale: hovered || isExpanded ? 1.4 : 1,
            backgroundColor: hovered || isExpanded ? '#ff0080' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full border-2 border-[#ff0080] z-10 relative bg-transparent"
        />
        {exp.is_current && (
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-[#ff0080]/40"
            animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          borderColor: hovered || isExpanded ? 'rgba(255,0,128,0.5)' : 'rgba(255,255,255,0.08)',
        }}
        className={`mb-4 border rounded-none cursor-pointer transition-colors duration-300 ${
          darkMode ? 'bg-white/[0.02]' : 'bg-black/[0.02]'
        }`}
        style={{ borderWidth: 1 }}
        onClick={onToggle}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 p-5 md:p-7">
          <div className="flex-1 min-w-0">
            {/* Index badge */}
            <span className="text-[10px] font-mono text-[#ff0080] tracking-widest mb-2 block">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Role */}
            <motion.h3
              animate={{ color: hovered || isExpanded ? '#ff0080' : darkMode ? '#ffffff' : '#000000' }}
              transition={{ duration: 0.2 }}
              className="text-xl md:text-2xl font-black leading-tight"
            >
              {exp.role}
            </motion.h3>

            {/* Company */}
            <p className={`text-base font-semibold mt-1 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
              {exp.company}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className={`flex items-center gap-1.5 text-xs font-mono ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
                <Calendar className="w-3 h-3" />
                {formatDate(exp.start_date)} — {exp.is_current ? <span className="text-[#ff0080]">PRESENT</span> : formatDate(exp.end_date)}
              </span>
              {exp.is_current && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#ff0080]/10 text-[#ff0080] border border-[#ff0080]/30 tracking-widest">
                  CURRENT
                </span>
              )}
            </div>
          </div>

          {/* Toggle button */}
          <motion.div
            animate={{
              backgroundColor: isExpanded ? '#ff0080' : 'transparent',
              borderColor: hovered || isExpanded ? '#ff0080' : 'rgba(255,255,255,0.2)',
            }}
            className="w-9 h-9 flex-shrink-0 flex items-center justify-center border mt-1"
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              {isExpanded ? (
                <Minus className="w-4 h-4 text-white" />
              ) : (
                <Plus className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-black'}`} />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`px-5 md:px-7 pb-7 border-t grid md:grid-cols-2 gap-6 pt-6 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                {/* Description */}
                {exp.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`leading-relaxed text-sm md:text-base ${darkMode ? 'text-white/60' : 'text-black/60'}`}
                  >
                    {exp.description}
                  </motion.p>
                )}

                {/* Tech stack */}
                {exp.tech_stack && exp.tech_stack.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <p className={`text-[10px] font-mono tracking-widest mb-3 ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
                      TECHNOLOGIES
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech_stack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.04 }}
                          whileHover={{ borderColor: '#ff0080', color: '#ff0080' }}
                          className={`px-3 py-1 text-xs font-mono border transition-colors ${
                            darkMode ? 'text-white/60 border-white/20' : 'text-black/60 border-black/20'
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection({ experiences, darkMode }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!experiences || experiences.length === 0) return null;

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.is_current) return -1;
    if (b.is_current) return 1;
    return new Date(b.start_date) - new Date(a.start_date);
  });

  return (
    <section
      id="experience"
      className={`py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden ${darkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-[#ff0080]/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section marker */}
        <motion.div
          className="flex items-center gap-4 mb-12 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className={`text-xs font-mono tracking-widest ${darkMode ? 'text-white/40' : 'text-black/40'}`}>002</span>
          <div className={`w-16 h-px ${darkMode ? 'bg-white/20' : 'bg-black/20'}`} />
          <span className={`text-xs font-mono tracking-widest ${darkMode ? 'text-white/40' : 'text-black/40'}`}>EXPERIENCE</span>
        </motion.div>

        {/* Timeline — max height with scroll for many entries */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[7px] top-8 bottom-0 w-px bg-gradient-to-b from-[#ff0080] via-[#ff0080]/30 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <div
            className="space-y-3 overflow-y-auto pr-2"
            style={{ maxHeight: '520px', scrollbarWidth: 'thin', scrollbarColor: '#ff0080 transparent' }}
          >
            {sortedExperiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                index={index}
                isExpanded={expandedId === exp.id}
                onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
