import "./header.css";

export default function Header() {
  return (
    <header className="header-section">
      <div className="header-top">
        <div className="container-fluid header-top-container">
          <a className="navbar-brand " href="index.html">
            Tro<span>Weld</span>
          </a>
          <div className="contact-nav">
            <a href="">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>Location</span>
            </a>
            <a href="">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>Call : +01 123455678990</span>
            </a>
            <a href="">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>demo@gmail.com</span>
            </a>
          </div>
          <div className="social-box">
            <a href="">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Projects</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">
                <i className="fa-solid fa-user"></i>Login
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
