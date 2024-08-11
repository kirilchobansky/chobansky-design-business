import { Routes, Route } from "react-router-dom";

import styles from "./App.module.css";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import ProjectsPage from "./components/projects-page/ProjectsPage";
import ProjectDetails from "./components/projects-details-page/ProjectDetails";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthContextProvider } from "./contexts/AuthContext";
import Logout from "./components/auth/logout/Logout";

const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <div className={styles["main-outlet"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/" element={<ProjectsPage />} />
          <Route path="/projects/details/:id" element={<ProjectDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
