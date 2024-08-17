import { Link, useNavigate } from "react-router-dom";

import userApi from "../../../api/user-api";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useGetLikedProjects } from "../../../hooks/useUser";

import styles from "./ProjectsList.module.css";
import ClassicOrange from "../../shared/buttons/classic-orange/ClassicOrange";

export default function ProjectsList({ projects }) {
  const { userId } = useAuthContext();
  const navigate = useNavigate();
  const [likedProjects, setLikedProjects] = userId
    ? useGetLikedProjects(userId, "object")
    : [{}, () => {}];

  const handleLikeToggle = async (projectId) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    if (likedProjects[projectId]) {
      await userApi.dislikeProject(projectId, userId);
      setLikedProjects((prev) => ({ ...prev, [projectId]: false }));
    } else {
      await userApi.likeProject(projectId, userId);
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
            <Link
              to={`/projects/details/${project._id}`}
              className={styles.name}
            >
              {project.name}
            </Link>
            <div className={styles.buttons}>
              <ClassicOrange
                url={`/projects/details/${project._id}`}
                text="More details"
              />
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
