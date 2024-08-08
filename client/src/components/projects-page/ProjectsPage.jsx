import FilterSection from "./filter-section/FilterSection";
import ProjectsList from "./projects-list/ProjectsList";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles["container"]}>
      <h1>All Projects</h1>
      <div className={styles['sections']}>
        <FilterSection />
        <ProjectsList />
      </div>
    </div>
  );
}
