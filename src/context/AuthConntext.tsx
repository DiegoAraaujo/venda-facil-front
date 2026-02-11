import { createContext, useEffect, useState, type ReactNode } from "react";
import { removeAccessToken, getAccessToken } from "../utils/authStorage";
import { registerLogout } from "../services/authBridge";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isCheckingAuth: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeAccessToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setIsLoggedIn(true);
    }

    setIsCheckingAuth(false);
    registerLogout(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isCheckingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
