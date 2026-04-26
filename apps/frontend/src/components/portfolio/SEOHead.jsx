import { useEffect } from 'react';

export default function SEOHead({ profile, project = null }) {
  useEffect(() => {
    // Base SEO data
    const siteName = profile?.name || 'Developer Portfolio';
    const defaultDescription = profile?.bio || profile?.tagline || 'Full-stack developer portfolio showcasing projects and skills';
    const defaultImage = profile?.avatar_url || '';

    // Dynamic data based on context (project detail vs homepage)
    const title = project 
      ? `${project.title} | ${siteName}` 
      : `${siteName} - ${profile?.tagline || 'Software Developer'}`;
    
    const description = project 
      ? project.long_description || project.description 
      : defaultDescription;
    
    // Generate a fallback OG image using a public service if no image is set
    const ogImageFallback = `https://og-image.vercel.app/${encodeURIComponent(
      project ? project.title : (profile?.name || 'Portfolio')
    )}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg`;

    const image = project?.image_url || defaultImage || ogImageFallback;

    // Update document title
    document.title = title;

    // Helper to set meta tag
    const setMeta = (name, content, property = false) => {
      if (!content) return;
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('description', description);
    setMeta('author', profile?.name);
    setMeta('keywords', project 
      ? `${project.tech_stack?.join(', ')}, ${project.tags?.join(', ')}, portfolio, project`
      : '.NET, Angular, C#, TypeScript, full-stack developer, software engineer, portfolio'
    );

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', project ? 'article' : 'website', true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', siteName, true);

    // Twitter Card tags
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      if (project) {
        document.title = `${siteName} - ${profile?.tagline || 'Software Developer'}`;
      }
    };
  }, [profile, project]);

  return null;
}

// Schema.org structured data component
export function PortfolioSchema({ profile, projects }) {
  useEffect(() => {
    if (!profile) return;

    // Person schema
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.tagline,
      description: profile.bio,
      email: profile.email,
      image: profile.avatar_url,
      url: window.location.origin,
      address: profile.location ? {
        '@type': 'PostalAddress',
        addressLocality: profile.location
      } : undefined,
      sameAs: [
        profile.github_url,
        profile.linkedin_url,
        profile.twitter_url
      ].filter(Boolean)
    };

    // Portfolio items schema
    const portfolioSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${profile.name}'s Portfolio`,
      description: `Software development projects by ${profile.name}`,
      itemListElement: projects?.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          image: project.image_url,
          url: project.live_url,
          author: {
            '@type': 'Person',
            name: profile.name
          },
          keywords: project.tech_stack?.join(', ')
        }
      })) || []
    };

    // Insert or update schema scripts
    const insertSchema = (id, schema) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    insertSchema('person-schema', personSchema);
    insertSchema('portfolio-schema', portfolioSchema);

    return () => {
      document.getElementById('person-schema')?.remove();
      document.getElementById('portfolio-schema')?.remove();
    };
  }, [profile, projects]);

  return null;
}

// Project detail schema
export function ProjectSchema({ project, authorName }) {
  useEffect(() => {
    if (!project) return;

    const projectSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.long_description || project.description,
      image: project.image_url,
      url: project.live_url,
      codeRepository: project.github_url,
      programmingLanguage: project.tech_stack,
      author: {
        '@type': 'Person',
        name: authorName
      },
      keywords: [...(project.tech_stack || []), ...(project.tags || [])].join(', ')
    };

    let script = document.getElementById('project-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'project-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(projectSchema);

    return () => {
      document.getElementById('project-schema')?.remove();
    };
  }, [project, authorName]);

  return null;
}
