import React, { createContext, useMemo, useState } from "react";
import { http } from "../api/http";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    return username ? { username } : null;
  });

  const login = async (username, password) => {
    const res = await http.post("/api/token/", { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    localStorage.setItem("username", username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setUser(null);
  };

  const register = async (username, email, password) => {
    await http.post("/api/users/register/", { username, email, password });
  };

  const value = useMemo(() => ({ user, login, logout, register }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}