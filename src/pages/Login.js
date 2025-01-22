import axios from "axios";
import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const formData = new URLSearchParams();
      formData.append("client_id", process.env.REACT_APP_CLIENT_ID);
      formData.append("client_secret", process.env.REACT_APP_CLIENT_SECRET);
      formData.append("grant_type", process.env.REACT_APP_GRANT_TYPE);
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(
        `${process.env.REACT_APP_LOGIN_API_URL}`,
        formData
      );

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="xk__login__container">
      <div className="xk__item__1"></div>
      <div className="xk__item__2"></div>
      <div className="xk__login__form">
          <img
            src="./xarikaty_logo.png"
            alt="Logo"
            className="xk__login__form__logo"
          />
        <form onSubmit={handleSubmit}>
          <h1 className="xk__login__form__title">Login</h1>
          <div className="xk__login__form__inputs">
            <input
              type="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
