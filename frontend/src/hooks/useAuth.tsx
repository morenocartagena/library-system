import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthData {
  isAuthenticated: boolean;
  role: string;
  loading: boolean;
}

interface JWTPayload {
  role: string;
}

export const useAuth = (): AuthData => {
  const [auth, setAuth] = useState<AuthData>({
    isAuthenticated: false,
    role: "",
    loading: true,
  });

  const updateAuthState = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode as unknown as <T>(token: string) => T;
        const decoded = decodeToken<JWTPayload>(token);

        setAuth({
          isAuthenticated: true,
          role: decoded.role,
          loading: false,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setAuth({ isAuthenticated: false, role: "", loading: false });
      }
    } else {
      setAuth({
        isAuthenticated: false,
        role: "",
        loading: false,
      });
    }
  };

  useEffect(() => {
    updateAuthState();

    window.addEventListener("tokenUpdated", updateAuthState);
    
    return () => {
      window.removeEventListener("tokenUpdated", updateAuthState);
    };
  }, []);

  return auth;
};
