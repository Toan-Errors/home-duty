import { createContext, useEffect, useState } from "react";
import { isValidToken, setSession } from "../utils/jwt";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsInitialized(true);
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axiosInstance.get("/auth/me");
          if (response.status === 200) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialize();
  }, []);

  const login = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        setSession(accessToken);
        const user = await axiosInstance.get("/auth/me");
        setUser(user.data);
        setIsAuthenticated(true);
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsAuthenticated(false);
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
