import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, email } = useContext(AuthContext);

  return (
    <header>
      <nav className={styles["first-navbar"]}>
        <ul className={styles["nav-links"]}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/how-to-choose">How to choose project</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className={styles["information"]}>
          <li>
            <a href="">
              <i className="fa-solid fa-phone"></i>+359 999999999
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-solid fa-location-dot"></i>Bul. Gotse Delchev
            </a>
          </li>
          <li>
            <a href="">EN</a>
          </li>
        </ul>
      </nav>
      <nav className={styles["second-navbar"]}>
        <ul>
          <li>
            <Link to="/">
              <img src="/public/images/chobansky-logo.jpg" alt="logo" />
            </Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search for a project..."
              className={styles["search-input"]}
            />
            <button className={styles["search-btn"]}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          <li>
            {isAuthenticated ? (
              <Link to="/profile">
                <i className="fa-regular fa-user"></i>
                {email}
              </Link>
            ) : (
              <Link to="/login">
                <i className="fa-regular fa-user"></i>Login
              </Link>
            )}
          </li>
          <li>
            <Link to="/wishlist">
              <i className="fa-regular fa-heart"></i>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
