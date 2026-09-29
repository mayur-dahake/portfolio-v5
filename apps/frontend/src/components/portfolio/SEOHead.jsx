import { useEffect } from "react";

export default function SEOHead({ profile, project = null }) {
  useEffect(() => {
    // Base SEO data
    const siteName = profile?.fullName || "Mayur Dahake";
    const defaultHeadline =
      profile?.headline ||
      "Full-Stack Software Engineer — .NET Core, Angular & Azure";
    const defaultDescription =
      profile?.bio ||
      "Portfolio of Mayur Dahake, a Full-Stack Software Engineer with 5+ years of experience building scalable enterprise applications, ERP systems, and cloud services using .NET Core, Angular, and Azure.";
    const defaultImage = "https://mayurdahake.vercel.app/og-image.png";

    // Dynamic data based on context (project detail vs homepage)
    const title = project
      ? `${project.title} | ${siteName}`
      : `${siteName} — ${defaultHeadline}`;

    const description = project
      ? project.longDescription || project.description
      : defaultDescription;

    const image = defaultImage;

    // Update document title
    document.title = title;

    // Helper to set meta tag
    const setMeta = (name, content, property = false) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMeta("description", description);
    setMeta("author", siteName);
    setMeta(
      "keywords",
      project
        ? `${project.techStack?.join(", ")}, ${project.tags?.join(", ")}, portfolio, project`
        : ".NET, Angular, C#, TypeScript, SQL Server, Azure, full-stack developer, software engineer, portfolio"
    );

    // Open Graph tags
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", project ? "article" : "website", true);
    setMeta("og:image", image, true);
    setMeta("og:site_name", siteName, true);

    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    return () => {
      if (project) {
        document.title = `${siteName} — ${defaultHeadline}`;
      }
    };
  }, [profile, project]);

  return null;
}

// Schema.org structured data component
export function PortfolioSchema({ profile, projects }) {
  useEffect(() => {
    if (!profile) return;

    const fullName = profile.fullName || "Mayur Dahake";

    const cleanObject = (obj) => {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== "") {
          if (typeof value === "object" && !Array.isArray(value)) {
            const nested = cleanObject(value);
            if (Object.keys(nested).length) result[key] = nested;
          } else {
            result[key] = value;
          }
        }
      }
      return result;
    };

    // Person schema
    const personSchema = cleanObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: fullName,
      jobTitle: profile.headline || "Full-Stack Software Engineer",
      description: profile.bio,
      email: profile.email,
      url: window.location.origin,
      address: profile.location
        ? {
            "@type": "PostalAddress",
            addressLocality: profile.location
          }
        : undefined,
      sameAs: [profile.github, profile.linkedin, profile.twitterUrl].filter(
        Boolean
      )
    });

    // Portfolio items schema
    const portfolioSchema = cleanObject({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${fullName}'s Portfolio`,
      description: `Software development projects by ${fullName}`,
      itemListElement:
        projects?.map((project, index) =>
          cleanObject({
            "@type": "ListItem",
            position: index + 1,
            item: cleanObject({
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              url: project.liveUrl || undefined,
              author: {
                "@type": "Person",
                name: fullName
              },
              keywords: project.techStack?.join(", ")
            })
          })
        ) || []
    });

    // Insert or update schema scripts
    const insertSchema = (id, schema) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    insertSchema("person-schema", personSchema);
    insertSchema("portfolio-schema", portfolioSchema);

    return () => {
      document.getElementById("person-schema")?.remove();
      document.getElementById("portfolio-schema")?.remove();
    };
  }, [profile, projects]);

  return null;
}

// Project detail schema
export function ProjectSchema({ project, authorName }) {
  useEffect(() => {
    if (!project) return;

    const cleanObject = (obj) => {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== null && value !== undefined && value !== "") {
          result[key] = value;
        }
      }
      return result;
    };

    const projectSchema = cleanObject({
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.longDescription || project.description,
      url: project.liveUrl || undefined,
      codeRepository: project.repoUrl || undefined,
      programmingLanguage: project.techStack,
      author: {
        "@type": "Person",
        name: authorName || "Mayur Dahake"
      },
      keywords: [...(project.techStack || []), ...(project.tags || [])].join(
        ", "
      )
    });

    let script = document.getElementById("project-schema");
    if (!script) {
      script = document.createElement("script");
      script.id = "project-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(projectSchema);

    return () => {
      document.getElementById("project-schema")?.remove();
    };
  }, [project, authorName]);

  return null;
}
