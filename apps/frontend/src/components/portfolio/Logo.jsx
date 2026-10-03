import React from "react";

export function LogoMark({ className = "w-8 h-8", darkMode = true }) {
  const fillColor = darkMode ? "#FFFFFF" : "#111111";

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Option 1: Left Wing (White in dark mode / Charcoal in light mode) */}
      <path
        d="M 14 14 V 86 H 27.8 V 51.5 L 46.9 72.8 L 58.4 62.7 L 14 14 Z"
        fill={fillColor}
      />

      {/* Option 1: Right Wing (Vibrant Pink #FF0080) */}
      <path
        d="M 86 14 L 51.5 49.5 L 60.7 59.6 L 73 49.5 V 86 H 86 Z"
        fill="#FF0080"
      />
    </svg>
  );
}

export default function Logo({
  darkMode = true,
  showText = true,
  className = "h-8",
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none group cursor-pointer transition-opacity hover:opacity-90 ${className}`}
    >
      <LogoMark className="w-8 h-8 flex-shrink-0" darkMode={darkMode} />
      {showText && (
        <span
          className={`font-black text-xs sm:text-sm tracking-[0.22em] uppercase font-sans whitespace-nowrap transition-colors ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          MAYUR DAHAKE
        </span>
      )}
    </div>
  );
}
