import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import SEOHead, { PortfolioSchema } from "@/components/portfolio/SEOHead";
import ScrollProgressBar from "@/components/portfolio/ScrollProgressBar";
import CustomCursor from "@/components/portfolio/CustomCursor";
import LoadingSkeleton from "@/components/portfolio/LoadingSkeleton";

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-theme");
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // GET /api/profile returns the singleton profile object directly
  const { data: profile, isLoading: profileLoading, isError: profileError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/api/profile")
  });

  // List endpoints return { data: [...], meta: {...} }
  const { data: expResponse, isLoading: expLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => api.get("/api/experiences?limit=50&order=asc")
  });

  const { data: projResponse, isLoading: projLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/api/projects?limit=50&order=asc")
  });

  const { data: skillsResponse, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: () => api.get("/api/skills?limit=100&order=asc")
  });

  const experiences = expResponse?.data ?? [];
  const projects = projResponse?.data ?? [];
  const skills = skillsResponse?.data ?? [];

  const isLoading = profileLoading || expLoading || projLoading || skillsLoading;

  if (isLoading) return <LoadingSkeleton />;

  if (profileError) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white gap-4">
      <p className="text-2xl font-black">Failed to load portfolio</p>
      <p className="text-white/40 font-mono text-sm">Please refresh the page or try again later.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-3 border border-[#ff0080] text-[#ff0080] font-mono text-xs tracking-widest hover:bg-[#ff0080] hover:text-white transition-all"
      >
        RETRY
      </button>
    </div>
  );

  return (
    <div>
      <CustomCursor />
      <SEOHead profile={profile} />
      <PortfolioSchema profile={profile} projects={projects} />

      <div
        className="min-h-screen selection:bg-[#ff0080] selection:text-white"
        style={{ transition: "background-color 0.5s ease, color 0.5s ease" }}
      >
        <ScrollProgressBar />
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection profile={profile} darkMode={darkMode} />
        <AboutSection profile={profile} darkMode={darkMode} />
        <ExperienceSection experiences={experiences} darkMode={darkMode} />
        <ProjectsSection projects={projects} darkMode={darkMode} authorName={profile?.fullName} />
        <SkillsSection skills={skills} darkMode={darkMode} />
        <ContactSection profile={profile} darkMode={darkMode} />
        <Footer profile={profile} darkMode={darkMode} />
      </div>
    </div>
  );
}
