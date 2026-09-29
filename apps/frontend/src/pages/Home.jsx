import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";
import {
  fallbackProfile,
  fallbackExperiences,
  fallbackProjects,
  fallbackSkills
} from "@/lib/fallbackData";

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
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // GET /api/profile returns the singleton profile object directly
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/api/profile"),
    retry: 1
  });

  // List endpoints return { data: [...], meta: {...} }
  const { data: expResponse } = useQuery({
    queryKey: ["experiences"],
    queryFn: () => api.get("/api/experiences?limit=50&order=asc"),
    retry: 1
  });

  const { data: projResponse } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/api/projects?limit=50&order=asc"),
    retry: 1
  });

  const { data: skillsResponse } = useQuery({
    queryKey: ["skills"],
    queryFn: () => api.get("/api/skills?limit=100&order=asc"),
    retry: 1
  });

  const experiences =
    expResponse?.data && expResponse.data.length > 0
      ? expResponse.data
      : fallbackExperiences;

  const rawProjects =
    projResponse?.data && projResponse.data.length > 0
      ? projResponse.data
      : fallbackProjects;

  // Filter out any unwanted/copied legacy project titles just in case they persist in a cached db
  const projects = rawProjects.filter(
    (p) =>
      !p.title?.toLowerCase().includes("halcyon") &&
      !p.title?.toLowerCase().includes("spotify")
  );

  const skills =
    skillsResponse?.data && skillsResponse.data.length > 0
      ? skillsResponse.data
      : fallbackSkills;

  const activeProfile = profile || fallbackProfile;

  if (profileLoading && !activeProfile) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <SEOHead profile={activeProfile} />
      <PortfolioSchema profile={activeProfile} projects={projects} />

      <div
        className="min-h-screen selection:bg-[#ff0080] selection:text-white"
        style={{ transition: "background-color 0.5s ease, color 0.5s ease" }}
      >
        <ScrollProgressBar />
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <HeroSection
          profile={activeProfile}
          darkMode={darkMode}
          projects={projects}
        />
        <AboutSection profile={activeProfile} darkMode={darkMode} />
        <ExperienceSection experiences={experiences} darkMode={darkMode} />
        <ProjectsSection
          projects={projects}
          darkMode={darkMode}
          authorName={activeProfile?.fullName}
        />
        <SkillsSection skills={skills} darkMode={darkMode} />
        <ContactSection profile={activeProfile} darkMode={darkMode} />
        <Footer profile={activeProfile} darkMode={darkMode} />
      </div>
    </div>
  );
}
