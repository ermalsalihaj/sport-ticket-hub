import "./login.css";
import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    Axios.post("https://localhost:7051/api/Users/PostUser", {
      email: email,
      username: username,
      password: password,
      role: role || "user",
    })
      .then((response) => {
        console.log("Registration Response:", response);

        if (response.status === 200) {
          setRegisterStatus("Account created successfully");

          // Update login status in the component state
          setIsLoggedIn(true);

          // Redirect to the homepage
          navigate("/");
        } else {
          setRegisterStatus("An error occurred.");
        }
      })
      .catch((error) => {
        console.log(error);
        setRegisterStatus("An error occurred.");
      });
  };

  // const login = (e) => {
  //   e.preventDefault();
  //   Axios.post("https://localhost:7051/api/Users", {
  //     username: username,
  //     password: password,
  //     role: role,
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setLoginStatus("Login was successful");

  //         // Update login status in the component state
  //         setIsLoggedIn(true);

  //         // Save user details to localStorage if needed
  //         localStorage.setItem("role", response.data.role);
  //         localStorage.setItem("id", response.data.userId);

  //         navigate("/");
  //       } else {
  //         setLoginStatus("Invalid username or password");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoginStatus("An error occurred.");
  //     });
  // };

  // Axios interceptor to attach token to headers
  
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  useEffect(() => {
    localStorage.clear();
  }, []);

  const login = (e) => {
    e.preventDefault();
    Axios.post("https://localhost:7051/api/Users/Login", {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          setLoginStatus("Login was successful");

          localStorage.setItem("username", username);
          localStorage.setItem("token", response.data.token);
          navigate("/");
          // console.log(response.data.token);
        } else {
          setLoginStatus("Invalid username or password");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginStatus("An error occurred.");
      });
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 "
      id="login"
    >
      {showRegisterForm ? (
        <div className="registerForm">
          <form action="">
            <h4>Register Here</h4>
            <label htmlFor="email">Email: </label>
            <input
              className="textInput"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter email"
              required
            />
            <label htmlFor="username">Username: </label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              required
            />
            <label htmlFor="password">Password: </label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
              required
            />
            <input
              className="button"
              type="submit"
              onClick={register}
              value="Register"
            />
            <p>
              Already have an account?{" "}
              <b>
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  onClick={toggleRegisterForm}
                >
                  Login here
                </a>
              </b>
            </p>
            <p
              style={{
                color: registerStatus.includes("taken") ? "red" : "green",
              }}
            >
              {registerStatus}
            </p>
          </form>
        </div>
      ) : (
        <div className="loginForm">
          <form action="">
            <h4>Login Here</h4>
            <label htmlFor="username">Username: </label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              required
              value={username}
            />
            <label htmlFor="password">Password: </label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
              required
            />
            <input
              className="button"
              type="submit"
              onClick={login}
              value="Login"
            />
            <p>
              Don't have an account?{" "}
              <b>
                <a href="#" className="ahref" onClick={toggleRegisterForm}>
                  Register here
                </a>
              </b>
            </p>
            <p style={{ color: "red" }} className="statusMessage">
              {loginStatus}
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
