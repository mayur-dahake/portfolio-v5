import { Prisma } from "@prisma/client";

export const skillsData: Prisma.SkillCreateManyInput[] = [
  // Languages
  { name: "C#", category: "Languages", order: 1 },
  { name: "TypeScript", category: "Languages", order: 2 },
  { name: "JavaScript", category: "Languages", order: 3 },
  { name: "SQL", category: "Languages", order: 4 },

  // Backend & APIs
  { name: ".NET Core", category: "Backend & APIs", order: 5 },
  { name: "ASP.NET Web API", category: "Backend & APIs", order: 6 },
  { name: "REST APIs", category: "Backend & APIs", order: 7 },
  { name: "Swagger", category: "Backend & APIs", order: 8 },

  // Frontend
  { name: "Angular", category: "Frontend", order: 9 },
  { name: "HTML", category: "Frontend", order: 10 },
  { name: "CSS", category: "Frontend", order: 11 },
  { name: "SCSS", category: "Frontend", order: 12 },

  // Databases
  { name: "SQL Server", category: "Databases", order: 13 },
  { name: "Stored Procedures", category: "Databases", order: 14 },
  { name: "Query Optimization", category: "Databases", order: 15 },

  // Cloud & Tools
  { name: "Azure", category: "Cloud & Tools", order: 16 },
  { name: "Git", category: "Cloud & Tools", order: 17 },
  { name: "Docker", category: "Cloud & Tools", order: 18 }
];
