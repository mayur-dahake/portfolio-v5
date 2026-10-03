export const fallbackProfile = {
  id: "profile-fallback",
  fullName: "Mayur Dahake",
  headline: "Full-Stack Software Engineer",
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

export const fallbackExperiences = [
  {
    id: "exp-saviant",
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
    startDate: "2022-10-01T00:00:00.000Z",
    endDate: null,
    isCurrent: true,
    order: 1
  },
  {
    id: "exp-birlasoft",
    company: "Birlasoft",
    title: "Software Developer",
    description:
      "Developed core application modules and UI views using Angular, HTML, and SCSS for client enterprise systems. Implemented backend business logic and RESTful services using ASP.NET Web API, C#, and SQL Server.",
    techStack: [".NET", "C#", "ASP.NET Web API", "Angular", "SQL Server"],
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
      "Administrative operations dashboard for inventory tracking, order processing workflows, and operational reporting.",
    longDescription: `### Overview
An administrative operations dashboard built to streamline enterprise management workflows. Provides consolidated visibility across product inventory, order lifecycles, and operational reporting.

### My Role
Full-Stack Software Engineer responsible for implementing frontend dashboard interfaces in Angular and backend business logic and data workflows using .NET and SQL Server.

### Technology
.NET, Angular, SQL Server, Azure, C#, TypeScript

### Key Engineering Work
- Developed responsive administrative dashboard interfaces in Angular with data tables, status filters, and navigation workflows.
- Implemented backend REST endpoints in .NET to handle inventory updates, order processing, and administrative actions.
- Designed relational database tables, views, and stored procedures in SQL Server for transactional consistency and operational queries.
- Connected frontend views with backend services for asynchronous data retrieval and state updates.

### Challenges
Managing interconnected order, inventory, and customer data across multi-step administrative workflows while maintaining clean UI responsiveness and transactional reliability.

### Solution
Structured data operations through dedicated SQL Server stored procedures and isolated backend service layers, paired with modular Angular components for clean state flow.

### Outcome
A stable, centralized administrative dashboard allowing operations teams to manage inventory and order lifecycles efficiently without manual database interventions.`,
    techStack: [".NET", "Angular", "SQL Server", "Azure"],
    tags: ["Enterprise", "Dashboard", "Analytics"],
    featured: true,
    liveUrl: null,
    repoUrl: null,
    order: 1
  },
  {
    id: "proj-mdevhub",
    title: "MDevHub - Angular UI Library",
    description:
      "Open-source Angular UI component library providing reusable and structured interface components.",
    longDescription: `### Overview
MDevHub is an open-source Angular UI component library designed to provide developers with reusable, accessible, and structured interface components for modern web applications.

### Why I Built It
To eliminate redundant UI boilerplate across multiple Angular applications and establish a consistent, reusable design system foundation.

### My Role
Creator and Lead Developer responsible for library architecture, component design, styling tokens, and package distribution.

### Technology
Angular, TypeScript, Node.js, SCSS, HTML

### Component / UI Engineering
- Implemented modular, themeable UI components focusing on reusability, clean DOM structures, and accessibility.
- Authored structured SCSS styling tokens and layout mixins for consistent visual presentation.
- Configured component input and output contracts to ensure clean integration into consuming Angular applications.

### Reusability
Packaged as an independent Angular library with standardized import modules, enabling seamless inclusion into enterprise and personal Angular projects.

### Package / Repository
Published on npm and hosted on GitHub. (Direct links will be enabled once URLs are provided).

### Outcome
An active open-source utility that enables rapid assembly of consistent Angular interfaces with reduced boilerplate code.`,
    techStack: ["TypeScript", "Node.js", "SCSS", "HTML", "Angular"],
    tags: ["Open Source", "UI Library", "Angular"],
    featured: true,
    liveUrl: null,
    repoUrl: null,
    order: 2
  },
  {
    id: "proj-fitness-api",
    title: "Fitness Tracker API",
    description:
      "RESTful API built with .NET Core and SQL Server for workout logging, exercise management, and Swagger documentation.",
    longDescription: `### Overview
A structured RESTful backend API designed to power fitness and workout tracking applications. Provides organized endpoints for logging exercises, recording workout sessions, and managing routine progression.

### My Role
Backend Developer responsible for API design, controller implementation, database schema modeling, and interactive documentation.

### API Architecture
Built on .NET Core with a structured controller-service-repository pattern, separating HTTP request handling, business logic, and database operations.

### Technology
.NET Core, C#, SQL Server, Swagger / OpenAPI

### Key Features
- RESTful endpoints for creating, retrieving, updating, and deleting workout routines and exercise entries.
- Relational schema modeling in SQL Server for workouts, exercises, and user activity history.
- Input validation and structured error handling across all HTTP request pipelines.
- Interactive Swagger / OpenAPI documentation for endpoint testing and API contract discovery.

### API Documentation
Integrated Swagger UI detailing request payloads, response schemas, and HTTP status codes for developer exploration and testing.

### Repository
Source repository hosted on GitHub. (Direct link will be enabled once URL is provided).

### Outcome
A clean, self-documenting REST API service ready for frontend or mobile client integration.`,
    techStack: [".NET Core", "C#", "SQL Server", "Swagger"],
    tags: ["Backend", "API", "REST"],
    featured: true,
    liveUrl: null,
    repoUrl: null,
    order: 3
  },
  {
    id: "proj-speedonix",
    title: "SpeedoNix",
    description:
      "Web app that measures internet speed and latency with real-time UI visualization using Angular and TypeScript.",
    longDescription:
      "SpeedoNix measures latency, download, and upload speeds with real-time UI visualization using Angular and TypeScript. Designed for responsiveness and clean UI feedback.",
    techStack: ["Angular", "TypeScript", "Node.js", "HTML", "SCSS"],
    tags: ["Web App", "Performance", "Tools"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    order: 4
  },
  {
    id: "proj-taskflow",
    title: "TaskFlow Pro",
    description:
      "Task management application featuring status tracking, task organization, and priority filtering.",
    longDescription:
      "TaskFlow Pro is a task management application for team workflows. Features include status updates, categorized task lists, priority tagging, and dashboard views.",
    techStack: ["Angular", "Node.js", "MongoDB", "Socket.io"],
    tags: ["Productivity", "Collaboration"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    order: 5
  },
  {
    id: "proj-devnotes",
    title: "DevNotes",
    description:
      "Developer note-taking application featuring markdown formatting, code syntax display, and local persistence.",
    longDescription:
      "DevNotes is a developer-focused note-taking application featuring full markdown support, code syntax formatting, and browser persistence capabilities.",
    techStack: ["React", "TypeScript", "Firebase", "Monaco Editor"],
    tags: ["Developer Tools", "Productivity"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    order: 6
  },
  {
    id: "proj-weather",
    title: "Weather Insights",
    description:
      "Weather application providing multi-day forecast charts and location-based meteorological metrics using external API data.",
    longDescription:
      "Weather Insights provides meteorological data visual analytics. Features include multi-day forecast charts, severe condition alerts, and location search.",
    techStack: ["Angular", "TypeScript", "OpenWeather API", "Chart.js"],
    tags: ["Weather", "API Integration"],
    featured: false,
    liveUrl: null,
    repoUrl: null,
    order: 7
  }
];

export const fallbackSkills = [
  // Languages
  { id: "sk-csharp", name: "C#", category: "Languages", order: 1 },
  { id: "sk-ts", name: "TypeScript", category: "Languages", order: 2 },
  { id: "sk-js", name: "JavaScript", category: "Languages", order: 3 },
  { id: "sk-sql", name: "SQL", category: "Languages", order: 4 },

  // Backend & APIs
  { id: "sk-dotnet", name: ".NET Core", category: "Backend & APIs", order: 5 },
  {
    id: "sk-webapi",
    name: "ASP.NET Web API",
    category: "Backend & APIs",
    order: 6
  },
  { id: "sk-rest", name: "REST APIs", category: "Backend & APIs", order: 7 },
  { id: "sk-swagger", name: "Swagger", category: "Backend & APIs", order: 8 },

  // Frontend
  { id: "sk-angular", name: "Angular", category: "Frontend", order: 9 },
  { id: "sk-html", name: "HTML", category: "Frontend", order: 10 },
  { id: "sk-css", name: "CSS", category: "Frontend", order: 11 },
  { id: "sk-scss", name: "SCSS", category: "Frontend", order: 12 },

  // Databases
  { id: "sk-sqlserver", name: "SQL Server", category: "Databases", order: 13 },
  { id: "sk-sp", name: "Stored Procedures", category: "Databases", order: 14 },
  {
    id: "sk-queryopt",
    name: "Query Optimization",
    category: "Databases",
    order: 15
  },

  // Cloud & Tools
  { id: "sk-azure", name: "Azure", category: "Cloud & Tools", order: 16 },
  { id: "sk-git", name: "Git", category: "Cloud & Tools", order: 17 },
  { id: "sk-docker", name: "Docker", category: "Cloud & Tools", order: 18 }
];
