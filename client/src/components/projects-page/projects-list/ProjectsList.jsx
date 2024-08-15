import { Link } from "react-router-dom";

import { dislikeProject, likeProject } from "../../../api/user-api";
import { useAuthContext } from "../../../contexts/AuthContext";

import styles from "./ProjectsList.module.css";
import { useGetLikedProjects } from "../../../hooks/useUser";

export default function ProjectsList({ projects }) {
  const { userId } = useAuthContext();
  const [likedProjects, setLikedProjects] = useGetLikedProjects(userId);

  const handleLikeToggle = async (projectId) => {
    if (likedProjects[projectId]) {
      await dislikeProject(projectId, userId);
      setLikedProjects((prev) => ({ ...prev, [projectId]: false }));
    } else {
      await likeProject(projectId, userId);
      setLikedProjects((prev) => ({ ...prev, [projectId]: true }));
    }
  };

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
              <button
                className={styles["add-to-favorite"]}
                onClick={() => handleLikeToggle(project.id)}
              >
                <i
                  className={`fa-heart ${
                    likedProjects[project.id] ? "fa-solid" : "fa-regular"
                  } ${likedProjects[project.id] ? styles.favorite : ""}`}
                ></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className={styles.noProjects}>No projects here!</h2>
      )}
    </div>
  );
}
