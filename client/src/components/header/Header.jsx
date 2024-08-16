import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";

export default function Header() {
  const { isAuthenticated, username } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
            <Link to="/projects/all">Projects</Link>
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
            <a href="/">EN</a>
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
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles["search-btn"]} onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          {isAuthenticated ? (
            <li className={styles["user-menu"]}>
              <Link to="/profile">
                <i className="fa-regular fa-user"></i>
                {username}
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <i className="fa-regular fa-user"></i>Login
              </Link>
            </li>
          )}
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
