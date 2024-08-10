import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { useForm } from "../../../hooks/useForm";
import { useLogin } from "../../../hooks/useAuth";

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();

  const { changeHandler, submitHandler, values } = useForm(
    { email: "", password: "" },
    async ({ email, password }) => {
      try {
        await login(email, password);
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    }
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Login</h2>
        {/* {error && <p className={styles.error}>{error}</p>} */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <p className={styles.register}>
          If you don't have an account click{" "}
          <Link to="/register" className={styles.here}>
            here!
          </Link>
        </p>
      </form>
    </div>
  );
}
