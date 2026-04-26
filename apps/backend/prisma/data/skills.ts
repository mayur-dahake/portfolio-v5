import { Prisma } from "@prisma/client";

export const skillsData: Prisma.SkillCreateManyInput[] = [
  // Backend
  { name: ".NET", category: "backend", proficiency: 90, order: 1 },
  { name: "C#", category: "backend", proficiency: 90, order: 2 },
  { name: "Node.js", category: "backend", proficiency: 75, order: 3 },

  // Frontend
  { name: "Angular", category: "frontend", proficiency: 85, order: 4 },
  { name: "React", category: "frontend", proficiency: 70, order: 5 },
  { name: "JavaScript", category: "frontend", proficiency: 80, order: 6 },
  { name: "TypeScript", category: "frontend", proficiency: 80, order: 7 },
  { name: "HTML", category: "frontend", proficiency: 85, order: 8 },
  { name: "SCSS", category: "frontend", proficiency: 75, order: 9 },

  // Database
  { name: "SQL Server", category: "database", proficiency: 90, order: 10 },
  { name: "MySQL", category: "database", proficiency: 80, order: 11 },
  { name: "PostgreSQL", category: "database", proficiency: 70, order: 12 },
  { name: "MongoDB", category: "database", proficiency: 70, order: 13 },

  // DevOps
  { name: "Azure", category: "devops", proficiency: 75, order: 14 },
  { name: "Docker", category: "devops", proficiency: 65, order: 15 },

  // Tools
  { name: "Git", category: "tools", proficiency: 85, order: 16 },
  { name: "Swagger", category: "tools", proficiency: 80, order: 17 },

  // Other
  { name: "REST APIs", category: "other", proficiency: 85, order: 18 }
];
