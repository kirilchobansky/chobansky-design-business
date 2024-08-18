import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import ordersApi from "../../api/orders-api";

export default function Header() {
  const { isAuthenticated, username, userId } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const fetchedOrders = await ordersApi.getOrdersByUser(userId);
        setOrderCount(fetchedOrders.length);
      } else {
        setOrderCount(0);
      }
    };

    const handleOrderCreated = async () => {
      if (userId) {
        const fetchedOrders = await ordersApi.getOrdersByUser(userId);
        setOrderCount(fetchedOrders.length);
      }
    };

    fetchOrders();

    window.addEventListener("orderCreated", handleOrderCreated);

    return () => {
      window.removeEventListener("orderCreated", handleOrderCreated);
    };
  }, [userId, isAuthenticated]);

  const handleSearch = () => {
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
            <a href="tel:+359999999999">
              <i className="fa-solid fa-phone"></i>+359 999999999
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/place/Bul.+Gotse+Delchev,+Sofia,+Bulgaria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-location-dot"></i> Bul. Gotse Delchev
            </a>
          </li>
        </ul>
      </nav>
      <nav className={styles["second-navbar"]}>
        <ul>
          <li>
            <Link to="/">
              <img src="/images/chobansky-logo.jpg" alt="logo" />
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
            <Link to="/orders">
              <div className={styles["cart-container"]}>
                <i className="fa-solid fa-cart-shopping"></i>
                {orderCount > 0 && (
                  <span className={styles["order-count"]}>{orderCount}</span>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
