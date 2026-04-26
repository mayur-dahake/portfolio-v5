import { Prisma } from "@prisma/client";

export const profileData: Prisma.ProfileCreateInput = {
  fullName: "Mayur Dahake",
  headline: "Full Stack Developer | .NET | Angular | Cloud Solutions",
  bio: "Full Stack Developer with 5+ years of experience building scalable enterprise applications and ERP systems. Specialized in .NET, Angular, and cloud-based solutions on Azure. Passionate about clean architecture, performance optimization, and delivering high-quality user experiences.",
  location: "India",
  email: "mayur@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  yearsExperience: 5,
  twitterUrl: "",
  resumeUrl: "",
  order: 1
};
