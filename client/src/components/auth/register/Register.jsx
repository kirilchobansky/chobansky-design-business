import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Register.module.css";
import { useRegister } from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";

const initialValues = { email: "", password: "", rePass: "" };

export default function Register() {
  const [error, setError] = useState('');
  const register = useRegister();
  const navigate = useNavigate();

  const registerHandler = async ({ email, username, password, rePass }) => {
    if(password !== rePass){
      return setError('Password missmatch!');
    }

    try {
      await register(email, username, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    registerHandler
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Register</h2>
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
          <label htmlFor="text">Username</label>
          <input
            type="text"
            name="username"
            value={values.username}
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
        <div className={styles.formGroup}>
          <label htmlFor="password">Confirm password</label>
          <input
            type="password"
            name="rePass"
            value={values.rePass}
            onChange={changeHandler}
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
}
