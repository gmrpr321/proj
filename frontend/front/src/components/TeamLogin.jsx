import React, { useState } from "react";
import styles from "./TeamLogin.module.css";
const BASE_URL = "http://localhost:3051";
const TeamLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
      const response = await fetch(BASE_URL + "/manager_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      props.setJWTToken(data);
      props.setCurrentPage("teamDashboard");
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => props.setCurrentPage("CreateTeam")}
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default TeamLogin;
