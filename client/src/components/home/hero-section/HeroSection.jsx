import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className={styles["container"]}>
      <h1>Chobansky Design</h1>
      <Link to='/projects' className={styles['impressive-button']}>Catalog of projects</Link>
    </div>
  );
}
