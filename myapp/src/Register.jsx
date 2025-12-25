import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });

      alert("Account created. Please login.");
      onSuccess();
    } catch (err) {
      setError("Registration failed. Try a different username.");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to manage your tasks</p>

        {error && <div className="error">{error}</div>}

        <input
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
