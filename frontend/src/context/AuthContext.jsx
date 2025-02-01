import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();  // Named export

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  // LOGIN FUNCTION
  const login = (email, password) => {
    setIsLoading(true);
    toast.loading("Logging you in ... ");
    
    fetch("https://phase4-project-farm-task-manager-2.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        setIsLoading(false);
        toast.dismiss();

        if (response.access_token) {
          sessionStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);
          toast.success("Successfully Logged in");
        } else {
          toast.error(response.error || "Failed to login");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.dismiss();
        toast.error("Network error, please try again later");
      });
  };

  // REGISTER FUNCTION
  const register = (username, email, password) => {
    setIsLoading(true);
    toast.loading("Registering ... ");
    
    fetch("https://phase4-project-farm-task-manager-2.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        setIsLoading(false);
        toast.dismiss();

        if (response.msg) {
          toast.success(response.msg);
        } else {
          toast.error(response.error || "Failed to register");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.dismiss();
        toast.error("Network error, please try again later");
      });
  };

  // LOGOUT FUNCTION
  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
