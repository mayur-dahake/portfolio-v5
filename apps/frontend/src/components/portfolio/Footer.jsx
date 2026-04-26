import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ profile, darkMode }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-8 px-6 md:px-12 lg:px-24 border-t ${darkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#f5f5f0] border-black/10'}`}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className={`text-xs font-mono ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
          © {currentYear} {profile?.name || 'Developer'} — All rights reserved
        </p>
        
        <p className={`text-xs font-mono ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
          BUILT WITH <span className="text-[#ff0080]">♥</span> AND LOTS OF COFFEE
        </p>

        <button
          onClick={scrollToTop}
          className={`group flex items-center gap-2 text-xs font-mono hover:text-[#ff0080] transition-colors ${darkMode ? 'text-white/30' : 'text-black/30'}`}
        >
          BACK TO TOP
          <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
