import { Prisma } from "@prisma/client";

export const experienceData: Prisma.ExperienceCreateManyInput[] = [
  {
    company: "Saviant",
    title: "Software Engineer",
    description:
      "Designed and developed enterprise web application features across Angular frontend interfaces, C# / .NET backend services, and SQL Server databases. Built and maintained RESTful APIs in .NET Core, authored stored procedures and data queries, and resolved production issues.",
    techStack: [
      ".NET Core",
      "C#",
      "Angular",
      "SQL Server",
      "REST APIs",
      "Azure"
    ],
    startDate: new Date("2022-10-01"),
    endDate: undefined,
    isCurrent: true,
    order: 1
  },
  {
    company: "Birlasoft",
    title: "Software Developer",
    description:
      "Developed core application modules and UI views using Angular, HTML, and SCSS for client enterprise systems. Implemented backend business logic and RESTful services using ASP.NET Web API, C#, and SQL Server.",
    techStack: [".NET", "C#", "ASP.NET Web API", "Angular", "SQL Server"],
    startDate: new Date("2019-12-01"),
    endDate: new Date("2022-09-01"),
    isCurrent: false,
    order: 2
  }
];
