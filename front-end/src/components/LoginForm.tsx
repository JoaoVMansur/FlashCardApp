import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Login from "../api/login";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/user/userSlice";

interface User {
  Email: string;
  passWord: string;
}

function LoginForm() {
  const [Email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      Email,
      passWord,
    };

    const data = await Login(user);
    if (data) {
      dispatch(
        setUser({
          userName: data.userName,
          userID: data.userID,
          email: data.email,
        })
      );
      navigate("/home");
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
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              id="Email"
              placeholder="Enter your Email"
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/signup" className="create-account-link-text">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
