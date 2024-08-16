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
import ProfileSection from "./components/profile-page/ProfileSection";
import IsAuth from "./guards/isAuth";
import IsGuest from "./guards/isGuest";
import ContactUs from "./components/contact-us/ContactUs";
import Wishlist from "./components/wishlist/Wishlist";
import Search from "./components/search/Search";

const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <div className={styles["main-outlet"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:category" element={<ProjectsPage />} />
          <Route path="/search/:search" element={<Search />} />
          <Route
            path="/projects/details/:projectId"
            element={<ProjectDetails />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route element={<IsGuest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<IsAuth />}>
            <Route path="/profile" element={<ProfileSection />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
