
import {
  createContext,
  useContext,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("leadflow_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  const saveSession = (data) => {
    localStorage.setItem("leadflow_token", data.token);
    localStorage.setItem("leadflow_user", JSON.stringify(data.user));

    setUser(data.user);
  };

  const signup = async (userData) => {
    setLoading(true);

    try {
      const data = await authService.signup(userData);
      saveSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);

    try {
      const data = await authService.login(credentials);
      saveSession(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("leadflow_token");
    localStorage.removeItem("leadflow_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
