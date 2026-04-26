/** Maps page names used in pagesConfig to their URL paths */
const PAGE_URL_MAP = {
  Home: "/",
  Contact: "/contact",
  Admin: "/admin",
  ProjectDetail: "/projects"
};

export function createPageUrl(pageName, params = {}) {
  const base = PAGE_URL_MAP[pageName] ?? `/${pageName.toLowerCase()}`;
  const query = Object.keys(params).length
    ? "?" + new URLSearchParams(params).toString()
    : "";
  return base + query;
}

export function formatDate(date) {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
}

export function truncate(str = "", length = 100) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
