import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

/**
 * Minimal auth context — no external auth provider.
 * Admin access is handled by a password gate in Admin.jsx.
 * This context exists so NavigationTracker and other consumers
 * can call useAuth() without crashing.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
