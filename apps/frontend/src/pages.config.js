/**
 * pages.config.js - Page routing configuration
 *
 * Add new pages by importing them below and registering in PAGES.
 * Set mainPage to the key of the page that should be the landing page.
 */
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Admin from "./pages/Admin";

export const PAGES = {
  Home: Home,
  Contact: Contact,
  ProjectDetail: ProjectDetail,
  Admin: Admin
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES
};
