import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";

export default function ProjectsList() {
  return (
    <div className={styles["container"]}>
      <div className={styles["item"]}>
        <img src="src/assets/images/cave-biserna/1.jpg" alt="" />
        <Link to={`details/biserna-1`} className={styles["name"]}>
          Cave Biserna
        </Link>
        <div className={styles["buttons"]}>
          <Link to={`details/biserna-1`} className={styles["more-details"]}>
            More Details
          </Link>
          <Link to="/add-to-favorite" className={styles["add-to-favorite"]}>
            <i className="fa-regular fa-heart"></i>
          </Link>
        </div>
      </div>
      <div className={styles["item"]}>
        <img src="src/assets/images/cave-biserna/2.jpg" alt="" />
        <Link to={`details/biserna-1`} className={styles["name"]}>
          Cave Biserna
        </Link>
        <div className={styles["buttons"]}>
          <Link to={`details/biserna-2`} className={styles["more-details"]}>
            More Details
          </Link>
          <Link to="/add-to-favorite" className={styles["add-to-favorite"]}>
            <i className="fa-regular fa-heart"></i>
          </Link>
        </div>
      </div>
      <div className={styles["item"]}>
        <img src="src/assets/images/cave-biserna/3.jpg" alt="" />
        <Link to={`details/biserna-1`} className={styles["name"]}>
          Cave Biserna
        </Link>
        <div className={styles["buttons"]}>
          <Link to={`details/biserna-3`} className={styles["more-details"]}>
            More Details
          </Link>
          <Link to="/add-to-favorite" className={styles["add-to-favorite"]}>
            <i className="fa-regular fa-heart"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
