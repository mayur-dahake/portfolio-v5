import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  Code,
  BookOpen,
  ArrowLeft,
  Github,
  LogOut
} from "lucide-react";
import { createPageUrl } from "@/utils";
import ProfileForm from "@/components/admin/ProfileForm";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: Code },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: BookOpen }
];

function GitHubLoginGate() {
  const handleLogin = () => {
    // Redirect to backend endpoint, passing current location as callback target
    const currentUrl = window.location.href.split("?")[0];
    window.location.href = `${API_BASE_URL}/api/auth/github?redirect_uri=${encodeURIComponent(currentUrl)}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff0080]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm p-8 bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-lg text-center space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-[#ff0080] tracking-[0.3em] uppercase">
            Admin Portal
          </p>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Backstage Access
          </h1>
          <p className="text-xs text-white/40 leading-relaxed font-mono">
            Authenticate with GitHub to manage your portfolio content.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-black hover:bg-white/90 font-mono text-xs tracking-wider transition-all duration-200 hover:scale-[1.01]"
        >
          <Github className="w-4 h-4" />
          LOG IN WITH GITHUB
        </button>

        <div>
          <a
            href={createPageUrl("Home")}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [authorized, setAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) return true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("admin_token", token);
      return true;
    }
    return false;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error === "unauthorized_user") {
      alert(
        "Access Denied: Only the owner's GitHub account is allowed to log in."
      );
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (token) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthorized(false);
  };

  if (!authorized) {
    return <GitHubLoginGate />;
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
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/40 hover:text-[#ff0080] transition-colors text-xs font-mono"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            LOGOUT
          </button>
          <div
            className="w-2 h-2 bg-[#ff0080] rounded-full animate-pulse"
            title="Admin mode"
          />
        </div>
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
