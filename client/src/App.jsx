import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import styles from "./App.module.css";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import ProjectsPage from "./components/projects-page/ProjectsPage";
import ProjectDetails from "./components/projects-details-page/ProjectDetails";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  }

  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState
  }

  return (
    <AuthContext.Provider value={contextData}>
      <Header />
      <div className={styles["main-outlet"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/" element={<ProjectsPage />} />
          <Route path="/projects/details/:id" element={<ProjectDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
