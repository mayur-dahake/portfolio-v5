import { Prisma } from "@prisma/client";

export const experienceData: Prisma.ExperienceCreateManyInput[] = [
  {
    company: "Saviant",
    title: "Solution Engineer",
    description:
      "Engineered and enhanced major features of customer-facing web applications using modern frameworks. Designed and implemented scalable cloud-based solutions, improving application performance and reliability. Collaborated with cross-functional teams to deliver consistent and user-centric experiences across platforms.",
    techStack: [".NET", "Angular", "Azure", "TypeScript", "C#"],
    startDate: new Date("2022-09-01"),
    endDate: undefined,
    isCurrent: true,
    order: 1
  },
  {
    company: "Birlasoft",
    title: "Software Developer",
    description:
      "Collaborated with designers and engineers to build scalable web applications and design systems for enterprise clients. Delivered robust technical solutions aligned with stakeholder requirements, focusing on backend development, API design, and database integration.",
    techStack: [".NET", "C#", "SQL", "JavaScript", "Web API"],
    startDate: new Date("2019-12-01"),
    endDate: new Date("2022-09-01"),
    isCurrent: false,
    order: 2
  }
];
