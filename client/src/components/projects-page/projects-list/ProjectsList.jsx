import { Link } from "react-router-dom";
import styles from "./ProjectsList.module.css";
import { useGetAllProjects } from "../../../hooks/useProjects";

export default function ProjectsList() {
  const [projects] = useGetAllProjects();
  
  return (
    <div className={styles["container"]}>
      {projects && projects.map((project) => (
        <div key={project._id} className={styles["item"]}>
          <img src={project.images[0]} alt="" />
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
