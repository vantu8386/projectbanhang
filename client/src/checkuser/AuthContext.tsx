// src/context/AuthContext.tsx
import { createContext, useContext, ReactNode, useState } from "react";
import { Signin } from "../entity/user.entity";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: Signin;
  login: () => void;  
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Signin>({
    email: "",
    passwords: "",
  });

  const login = () => {
    setIsAuthenticated(true);

    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
