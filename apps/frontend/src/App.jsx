import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { AuthProvider } from "@/lib/AuthContext";
import NavigationTracker from "@/lib/NavigationTracker";
import PageNotFound from "@/lib/PageNotFound";
import { Toaster } from "@/components/ui/toaster";
import { pagesConfig } from "@/pages.config";

const { Pages, Layout } = pagesConfig;

// Explicit URL paths per page name — keeps pages.config.js free of JSX/routing concerns
const PAGE_PATHS = {
  Home: "/",
  Contact: "/contact",
  ProjectDetail: "/projects/:id",
  Admin: "/admin"
};

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );

function AppRoutes() {
  return (
    <Routes>
      {Object.entries(Pages).map(([name, Page]) => {
        const path = PAGE_PATHS[name] ?? `/${name.toLowerCase()}`;
        return (
          <Route
            key={name}
            path={path}
            element={
              <LayoutWrapper currentPageName={name}>
                <Page />
              </LayoutWrapper>
            }
          />
        );
      })}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavigationTracker />
          <AppRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
