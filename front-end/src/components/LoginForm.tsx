import "../Styles/Login.css";
import { Link, NavigationType, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Login from "../api/login";

interface User {
  userName: string;
  passWord: string;
}

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      userName,
      passWord,
    };
    const data = await Login(user);
    console.log("TAMO NO LOGIN FORM");
    console.log(data);
    if (data) {
      navigate("/home", { state: { userName: userName } });
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div className="LoginFormPage">
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 id="loginTitle">Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassWord(e.target.value)}
              required
            />
          </div>
          <button className="loginPageButtons loginButton" type="submit">
            Login
          </button>
        </form>
        <div className="create-account-link text-white">
          <p>
            Don't have an account?{" "}
            <Link to="/create-account" className="create-account-link-text">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
