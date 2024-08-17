import React from "react";
import styles from "./Footer.module.css"; // Ensure this path is correct based on your file structure
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>Chobansky Design</h2>
        </div>
        <nav className={styles.nav}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About Us</Link>
            </li>
            <li>
              <Link to={"/projects/all"}>Projects</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.socialLinks}>
          <h3>Connect with us:</h3>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
