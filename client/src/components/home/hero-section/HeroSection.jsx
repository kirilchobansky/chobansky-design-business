import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className={styles["container"]}>
      <h1 className={styles['main-header']}>Chobansky Design</h1>
      <Link to='/projects/all' className={styles['animated-button']}>Catalog of projects</Link>
    </div>
  );
}
