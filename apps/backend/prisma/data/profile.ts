import { Prisma } from "@prisma/client";

export const profileData: Prisma.ProfileCreateInput = {
  fullName: "Mayur Dahake",
  headline: "Full-Stack Software Engineer — .NET Core, Angular & Azure",
  bio: "Full-Stack Software Engineer with 5+ years of experience engineering enterprise web applications, ERP platforms, and cloud backend services at Saviant and Birlasoft. Specialized in .NET Core APIs, Angular frontend development, and SQL Server databases.",
  location: "India",
  email: "mayurdahake13@gmail.com",
  github: "https://github.com/mayur-dahake",
  linkedin: "https://linkedin.com/in/mayurdahake",
  yearsExperience: 5,
  twitterUrl: "",
  resumeUrl: "/resume.pdf",
  order: 1
};
