export const fallbackProfile = {
  id: "profile-fallback",
  fullName: "Mayur Dahake",
  headline: "Full-Stack Software Engineer — .NET Core, Angular & Azure",
  bio: "Full Stack Developer with 5+ years of experience building scalable enterprise applications and ERP systems. Specialized in .NET, Angular, and cloud-based solutions on Azure. Focused on clean architecture, database performance, and reliable software delivery.",
  location: "India",
  email: "mayurdahake13@gmail.com",
  github: "https://github.com/mayur-dahake",
  linkedin: "https://linkedin.com/in/mayurdahake",
  yearsExperience: 5,
  twitterUrl: "",
  resumeUrl: "/resume.pdf",
  order: 1
};

export const fallbackExperiences = [
  {
    id: "exp-saviant",
    company: "Saviant",
    title: "Solution Engineer",
    description:
      "Engineered and enhanced major features of customer-facing web applications using modern frameworks. Designed and implemented scalable cloud-based solutions, improving application performance and reliability. Collaborated with cross-functional teams to deliver consistent and user-centric experiences across platforms.",
    techStack: [".NET", "Angular", "Azure", "TypeScript", "C#"],
    startDate: "2022-09-01T00:00:00.000Z",
    endDate: null,
    isCurrent: true,
    order: 1
  },
  {
    id: "exp-birlasoft",
    company: "Birlasoft",
    title: "Software Developer",
    description:
      "Collaborated with designers and engineers to build scalable web applications and design systems for enterprise clients. Delivered robust technical solutions aligned with stakeholder requirements, focusing on backend development, API design, and database integration.",
    techStack: [".NET", "C#", "SQL", "JavaScript", "Web API"],
    startDate: "2019-12-01T00:00:00.000Z",
    endDate: "2022-09-01T00:00:00.000Z",
    isCurrent: false,
    order: 2
  }
];

export const fallbackProjects = [
  {
    id: "proj-erp",
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
    id: "proj-mdevhub",
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
    id: "proj-fitness-api",
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
    id: "proj-speedonix",
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
    id: "proj-taskflow",
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
    id: "proj-devnotes",
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
    id: "proj-weather",
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

export const fallbackSkills = [
  // Languages
  { id: "sk-csharp", name: "C#", category: "Languages", order: 1 },
  { id: "sk-ts", name: "TypeScript", category: "Languages", order: 2 },
  { id: "sk-js", name: "JavaScript", category: "Languages", order: 3 },
  { id: "sk-sql", name: "SQL", category: "Languages", order: 4 },
  { id: "sk-html", name: "HTML", category: "Languages", order: 5 },
  { id: "sk-scss", name: "SCSS", category: "Languages", order: 6 },

  // Backend & APIs
  { id: "sk-dotnet", name: ".NET", category: "Backend & APIs", order: 7 },
  { id: "sk-nodejs", name: "Node.js", category: "Backend & APIs", order: 8 },
  { id: "sk-rest", name: "REST APIs", category: "Backend & APIs", order: 9 },
  { id: "sk-swagger", name: "Swagger", category: "Backend & APIs", order: 10 },

  // Frontend
  { id: "sk-angular", name: "Angular", category: "Frontend", order: 11 },
  { id: "sk-react", name: "React", category: "Frontend", order: 12 },

  // Databases
  { id: "sk-sqlserver", name: "SQL Server", category: "Databases", order: 13 },
  { id: "sk-mysql", name: "MySQL", category: "Databases", order: 14 },
  { id: "sk-postgres", name: "PostgreSQL", category: "Databases", order: 15 },
  { id: "sk-mongo", name: "MongoDB", category: "Databases", order: 16 },

  // Cloud & Tools
  { id: "sk-azure", name: "Azure", category: "Cloud & Tools", order: 17 },
  { id: "sk-docker", name: "Docker", category: "Cloud & Tools", order: 18 },
  { id: "sk-git", name: "Git", category: "Cloud & Tools", order: 19 }
];
