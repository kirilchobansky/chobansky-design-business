import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";
import { useEffect, useState } from "react";
import projectsApi from "../../../api/projects-api";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const projectsResult = await projectsApi.getAll();
        setProjects(projectsResult);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    })();
  }, []);

  return (
    <div className={styles["container"]}>
      {projects.map((project) => (
        <div key={project._id} className={styles["item"]}>
          <img src={project.imageUrl} alt="" />
          <Link to={`details/${project._id}`} className={styles["name"]}>
            {project.name}
          </Link>
          <div className={styles["buttons"]}>
            <Link
              to={`details/${project._id}`}
              className={styles["more-details"]}
            >
              More Details
            </Link>
            <Link to="/add-to-favorite" className={styles["add-to-favorite"]}>
              <i className="fa-regular fa-heart"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
