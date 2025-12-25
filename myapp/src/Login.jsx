import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setToken, onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { username, password }
      );
      setToken(res.data.access);
      localStorage.setItem("token", res.data.access);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className="subtitle">Welcome back</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={!username || !password}>
          Login
        </button>

        <p
          className="link"
          onClick={onRegister}
        >
          Don’t have an account? Sign up
        </p>
      </form>
    </div>
  );
};

export default Login;
