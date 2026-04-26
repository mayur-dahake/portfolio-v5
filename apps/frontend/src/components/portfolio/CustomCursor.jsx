import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const isHovering = useRef(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select');
      if (target && !isHovering.current) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = '48px';
          ringRef.current.style.height = '48px';
          ringRef.current.style.borderColor = '#ff0080';
          ringRef.current.style.backgroundColor = 'rgba(255,0,128,0.08)';
          ringRef.current.style.marginLeft = '-24px';
          ringRef.current.style.marginTop = '-24px';
        }
      } else if (!target && isHovering.current) {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = '28px';
          ringRef.current.style.height = '28px';
          ringRef.current.style.borderColor = 'rgba(255,255,255,0.5)';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.marginLeft = '-14px';
          ringRef.current.style.marginTop = '-14px';
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', onMouseOver);

    // Hide on mobile
    document.documentElement.style.cursor = window.matchMedia('(pointer: coarse)').matches ? '' : 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.style.cursor = '';
    };
  }, []);

  // Don't render on touch devices or when user prefers reduced motion
  if (typeof window !== 'undefined' && (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )) return null;

  return (
    <>
      {/* Outer ring - springs behind */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          x: ringX,
          y: ringY,
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.5)',
        }}
      />

      {/* Inner dot - snaps instantly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#ff0080]"
        style={{
          x: dotX,
          y: dotY,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
        }}
      />
    </>
  );
}
