import { Prisma } from "@prisma/client";

export const projectsData: Prisma.ProjectCreateManyInput[] = [
  {
    title: "E-Commerce / ERP Dashboard",
    description:
      "Admin dashboard for managing enterprise operations, inventory, and analytics.",
    longDescription:
      "A full-featured administrative dashboard for enterprise operations. Features order processing workflows, inventory tracking, customer analytics, and data management pipelines.",
    techStack: [".NET", "Angular", "SQL Server", "Azure"],
    tags: ["Enterprise", "Dashboard", "Analytics"],
    featured: true,
    order: 1
  },
  {
    title: "MDevHub - Angular UI Library",
    description:
      "Open-source Angular UI component library for reusable and accessible UI components.",
    longDescription:
      "MDevHub is an open-source Angular UI library available on npm, providing reusable and customizable UI components. It helps developers build consistent, accessible, and structured interfaces quickly.",
    techStack: ["TypeScript", "Node.js", "SCSS", "HTML", "Angular"],
    tags: ["Open Source", "UI Library", "Angular"],
    featured: true,
    order: 2
  },
  {
    title: "Fitness Tracker API",
    description:
      "RESTful API for fitness applications with workout logging, progress tracking, and Swagger documentation.",
    longDescription:
      "A structured RESTful API designed with .NET Core and SQL Server for fitness tracking platforms. Features secure endpoint design, workout logging, progression tracking, and comprehensive Swagger/OpenAPI documentation.",
    techStack: [".NET Core", "C#", "SQL Server", "Swagger"],
    tags: ["Backend", "API", "REST"],
    featured: true,
    order: 3
  },
  {
    title: "SpeedoNix",
    description:
      "A sleek web app that measures internet speed and latency with real-time visualization.",
    longDescription:
      "SpeedoNix measures latency, download, and upload speeds with real-time UI visualization using Angular and TypeScript. Designed for responsiveness and clean UI feedback.",
    techStack: ["Angular", "TypeScript", "Node.js", "HTML", "SCSS"],
    tags: ["Web App", "Performance", "Tools"],
    featured: false,
    order: 4
  },
  {
    title: "TaskFlow Pro",
    description:
      "A modern task management application with real-time collaboration features.",
    longDescription:
      "TaskFlow Pro is a task management solution built for teams. Features include real-time status updates, drag-and-drop organization, priority tagging, and analytics dashboards.",
    techStack: ["Angular", "Node.js", "MongoDB", "Socket.io"],
    tags: ["Productivity", "Collaboration"],
    featured: false,
    order: 5
  },
  {
    title: "DevNotes",
    description:
      "Markdown-based note-taking app for developers with syntax highlighting for 50+ languages.",
    longDescription:
      "DevNotes is a developer-focused note-taking application featuring full markdown support, code syntax highlighting, and cloud persistence capabilities.",
    techStack: ["React", "TypeScript", "Firebase", "Monaco Editor"],
    tags: ["Developer Tools", "Productivity"],
    featured: false,
    order: 6
  },
  {
    title: "Weather Insights",
    description:
      "Weather application providing multi-day forecasts and location-based meteorological metrics.",
    longDescription:
      "Weather Insights provides meteorological data visual analytics. Features include multi-day forecast charts, severe condition alerts, and location search.",
    techStack: ["Angular", "TypeScript", "OpenWeather API", "Chart.js"],
    tags: ["Weather", "API Integration"],
    featured: false,
    order: 7
  }
];
