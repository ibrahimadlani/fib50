import React from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(() => {
    if (localStorage.getItem("authTokens")) {
      return jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access);
    } else {
      return null;
    }
  });
  let [authTokens, setAuthTokens] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8001/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtDecode(authTokens.access).user_id}`,
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwtDecode(data.access)));
      navigate("/profile");
    }
  };

  let signupUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8001/api/users/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    let data = await response.json();
    if (response.status === 201) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/profile");
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    console.log("logged out");
  };

  let updateTokens = async (data) => {
    let response = await fetch("http://localhost:8001/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtDecode(authTokens.access).user_id}`,
      },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });

    let newdata = await response.json();

    if (response.status === 200) {
      setAuthTokens(newdata);
      setUser(jwtDecode(newdata.access));
      localStorage.setItem("authTokens", JSON.stringify(newdata));
    } else {
      logoutUser();
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (authTokens) {
        updateTokens();
        console.log("token refreshed");
      }
    }, 1000 * 60 * 30);
    return () => {
      clearInterval();
    };
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
