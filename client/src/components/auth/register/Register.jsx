import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      const data = await response.json();
      onRegister(data); // Pass user data to parent component
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
        <p className={styles.login}>
          If you already have an account click{" "}
          <Link to="/login" className={styles.here}>
            here!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
