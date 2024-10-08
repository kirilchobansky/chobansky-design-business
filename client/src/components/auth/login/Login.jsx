import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import { useForm } from "../../../hooks/useForm";
import { useLogin } from "../../../hooks/useAuth";

const initialValues = { email: "", password: "" };

export default function Login() {
  const [error, setError] = useState("");
  const login = useLogin();
  const navigate = useNavigate();

  const loginHandler = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError('Incorrect email or password!')
      console.error(error.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    loginHandler
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
