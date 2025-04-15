import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  email: string | null;
  role: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);

  const setIsAuthenticated = useCallback((auth: boolean) => {
    setIsAuthenticatedState(auth);
  }, []);

  const login = async (emailInput: string, password: string): Promise<void> => {
    await authService.login(emailInput, password);
    const tokenValue = authService.getToken();
    if (tokenValue) {
      setToken(tokenValue);
      const decoded = jwtDecode<JwtPayload>(tokenValue);
      setEmail(decoded.email);
      setRole(decoded.role);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setEmail(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = authService.getToken();
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode<JwtPayload>(storedToken);
      setEmail(decoded.email);
      setRole(decoded.role);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, email, role, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
