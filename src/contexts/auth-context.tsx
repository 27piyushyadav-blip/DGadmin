"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  loginUserApi, 
  logoutApi, 
  refreshTokenApi, 
  getAccessToken, 
  isAuthenticated,
  AuthError 
} from "@/client/api/auth";

type User = {
  id?: string;
  name?: string;
  email?: string;
  provider?: "credentials" | "google";
  role?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodeTokenUser = (token: string | null): User | null => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      
      // Enforce presence of real database-defined fields
      if (!decoded || !decoded.email || !decoded.sub) {
        return null;
      }
      
      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name || decoded.email.split('@')[0],
        role: decoded.role || "admin",
      };
    } catch (error) {
      console.error("Failed to decode auth token", error);
      return null;
    }
  };

  const checkAuth = async () => {
    try {
      if (isAuthenticated()) {
        const token = getAccessToken();
        const decodedUser = decodeTokenUser(token);
        if (decodedUser) {
          setUser(decodedUser);
        } else {
          // Token is corrupt/invalid, clear local session to trigger redirect
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const refreshUser = async () => {
    await checkAuth();
  };

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUserApi({ identifier, password });
      const decodedUser = decodeTokenUser(response.access_token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        setUser({ 
          id: "authenticated", 
          email: identifier 
        });
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with local logout even if API call fails
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      await refreshTokenApi();
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, log out the user
      await logout();
      throw error;
    }
  };

  // Add proactive refresh timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (user) {
      // Set interval to 12 minutes (tokens expire in 15m)
      interval = setInterval(async () => {
        try {
          console.log("Proactively refreshing admin token...");
          await refreshToken();
        } catch (error) {
          console.error("Proactive refresh failed:", error);
        }
      }, 12 * 60 * 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshToken,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
