
import api from "./api";

const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

const authService = {
  signup,
  login,
};

export default authService;
