import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";

export default function ProjectsList({ projects }) {
  return (
    <div className={styles["container"]}>
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className={styles.item}>
            <img
              src={project.images[0]}
              alt={project.name}
              className={styles.image}
            />
            <Link to={`details/${project.id}`} className={styles.name}>
              {project.name}
            </Link>
            <div className={styles.buttons}>
              <Link
                to={`/projects/details/${project.id}`}
                className={styles["more-details"]}
              >
                More Details
              </Link>
              <Link to="/add-to-favorite" className={styles["add-to-favorite"]}>
                <i className="fa-regular fa-heart"></i>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h2 className={styles.noProjects}>No projects here!</h2>
      )}
    </div>
  );
}
