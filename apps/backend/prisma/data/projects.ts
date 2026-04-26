import { Prisma } from "@prisma/client";

export const projectsData: Prisma.ProjectCreateManyInput[] = [
  {
    title: "MDevHub - Angular UI Library",
    description:
      "Open-source Angular UI component library for reusable and modern UI components.",
    longDescription:
      "MDevHub is an open-source Angular UI library available on npm, providing reusable and customizable UI components. It helps developers build consistent and accessible interfaces quickly.",
    techStack: ["TypeScript", "Node.js", "SCSS", "HTML", "Angular"],
    tags: ["Open Source", "UI Library", "Angular"],
    featured: true,
    order: 1
  },
  {
    title: "SpeedoNix",
    description:
      "A sleek web app that measures internet speed with real-time animation.",
    longDescription:
      "SpeedoNix measures latency, download, and upload speeds with real-time visualization using Angular and TypeScript. Designed for accuracy and smooth UI performance.",
    techStack: ["Angular", "TypeScript", "Node.js", "HTML", "SCSS"],
    tags: ["Web App", "Performance", "Tools"],
    featured: true,
    order: 2
  },
  {
    title: "Halcyon Theme",
    description: "A minimal dark theme for multiple developer tools.",
    longDescription:
      "A minimal dark blue theme available across VS Code, Sublime, Atom, and terminals. Designed for readability and reduced eye strain.",
    techStack: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
    tags: ["Theme", "Developer Tools", "Open Source"],
    featured: true,
    order: 3
  },
  {
    title: "Build a Spotify Connected App",
    description:
      "A comprehensive course covering Spotify OAuth flow and fetching API data in a React app.",
    longDescription:
      "Having struggled with understanding how the Spotify OAuth flow works, this course covers everything from REST APIs to implementing Spotify OAuth and fetching data in a React app. By the end, you will have a deployed portfolio-ready app.",
    techStack: ["React", "Express", "Spotify API", "Styled Components"],
    tags: ["Course", "Tutorial", "API Integration"],
    featured: true,
    order: 4
  },
  {
    title: "TaskFlow Pro",
    description:
      "A modern task management application with real-time collaboration features.",
    longDescription:
      "TaskFlow Pro is a comprehensive task management solution built for teams. Features include real-time updates, drag-and-drop organization, priority tagging, and detailed analytics dashboard.",
    techStack: ["Angular", "Node.js", "MongoDB", "Socket.io"],
    tags: ["Productivity", "SaaS", "Collaboration"],
    featured: false,
    order: 5
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Admin dashboard for managing online store operations with analytics.",
    longDescription:
      "A full-featured admin dashboard for e-commerce platforms. Includes sales analytics, inventory management, customer insights, and order processing workflows.",
    techStack: [".NET", "Angular", "SQL Server", "Azure"],
    tags: ["E-Commerce", "Dashboard", "Analytics"],
    featured: false,
    order: 6
  },
  {
    title: "Weather Insights",
    description:
      "Beautiful weather application with 7-day forecasts and location-based alerts.",
    longDescription:
      "Weather Insights provides accurate weather data with stunning visualizations. Features include hourly forecasts, severe weather alerts, and historical weather patterns.",
    techStack: ["Angular", "TypeScript", "OpenWeather API", "Chart.js"],
    tags: ["Weather", "API Integration", "Mobile-First"],
    featured: false,
    order: 7
  },
  {
    title: "DevNotes",
    description:
      "Markdown-based note-taking app designed for developers with code syntax highlighting.",
    longDescription:
      "DevNotes is a developer-focused note-taking application with full markdown support, code syntax highlighting for 50+ languages, and cloud sync capabilities.",
    techStack: ["React", "TypeScript", "Firebase", "Monaco Editor"],
    tags: ["Developer Tools", "Productivity", "Notes"],
    featured: false,
    order: 8
  },
  {
    title: "Fitness Tracker API",
    description:
      "RESTful API for fitness applications with workout logging and progress tracking.",
    longDescription:
      "A robust RESTful API designed for fitness applications. Features include workout logging, progress tracking, nutrition data, and integration with wearable devices.",
    techStack: [".NET Core", "C#", "SQL Server", "Swagger"],
    tags: ["API", "Health", "Backend"],
    featured: false,
    order: 9
  }
];
