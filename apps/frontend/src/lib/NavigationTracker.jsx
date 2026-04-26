import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks page navigation for analytics / debugging.
 * Currently logs to console in development only.
 * Drop in a real analytics call here (e.g. gtag, plausible) when needed.
 */
export default function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug("[nav]", location.pathname);
    }
  }, [location.pathname]);

  return null;
}
