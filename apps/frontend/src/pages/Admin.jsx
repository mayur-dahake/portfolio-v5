import { useState } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Code, BookOpen, ArrowLeft } from "lucide-react";
import { createPageUrl } from "@/utils";
import ProfileForm from "@/components/admin/ProfileForm";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Code },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: BookOpen }
];

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-72">
        <p className="text-xs font-mono text-white/40 tracking-widest text-center">
          ADMIN ACCESS
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          autoFocus
          className={`w-full bg-white/5 border px-4 py-3 text-white text-sm font-mono outline-none transition-colors placeholder:text-white/20 ${
            error ? "border-red-500" : "border-white/10 focus:border-[#ff0080]"
          }`}
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#ff0080] text-white font-mono text-xs tracking-widest hover:bg-[#ff0080]/80 transition-colors"
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [authorized, setAuthorized] = useState(false);

  if (!authorized) {
    return <PasswordGate onUnlock={() => setAuthorized(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6">
          <a
            href={createPageUrl("Home")}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-mono tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            PORTFOLIO
          </a>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs font-mono text-[#ff0080] tracking-widest">
            ADMIN PANEL
          </span>
        </div>
        <div
          className="w-2 h-2 bg-[#ff0080] rounded-full animate-pulse"
          title="Admin mode"
        />
      </div>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 border-r border-white/5 pt-8 px-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-mono tracking-wider transition-colors relative ${
                    isActive
                      ? "text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="admin-tab"
                      className="absolute inset-0 bg-white/5 border-l-2 border-[#ff0080]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10 flex-shrink-0" />
                  <span className="relative z-10">
                    {tab.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-2xl font-black mb-2">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs font-mono text-white/30 tracking-widest mb-10">
              {activeTab === "profile" &&
                "Edit your personal info and social links"}
              {activeTab === "projects" &&
                "Add, edit, or remove portfolio projects"}
              {activeTab === "experience" && "Manage your work history"}
              {activeTab === "skills" &&
                "Manage your skills and proficiency levels"}
            </p>

            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "projects" && <ProjectsManager />}
            {activeTab === "experience" && <ExperienceManager />}
            {activeTab === "skills" && <SkillsManager />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
