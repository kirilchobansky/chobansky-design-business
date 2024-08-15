import AnimatedBtn from "../../shared/buttons/animated-btn/AnimatedBtn";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles["container"]}>
      <h1 className={styles["main-header"]}>Chobansky Design</h1>
      <AnimatedBtn url="/projects/all" text="Catalog of projects" />
    </div>
  );
}
