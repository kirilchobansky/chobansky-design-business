import { useGetLikedProjects } from "../../hooks/useUser";
import { useAuthContext } from "../../contexts/AuthContext";

import styles from "./Wishlist.module.css";
import ProjectsList from "../projects-page/projects-list/ProjectsList";
import AnimatedBtn from "../shared/buttons/animated-btn/AnimatedBtn";

export default function Wishlist() {
  const { userId } = useAuthContext();
  const [projects] = useGetLikedProjects(userId, "array");

  return (
    <div className={styles.wishlist}>
      <h1>Your Liked Projects</h1>
      <ProjectsList projects={projects} />
      {projects.length === 0 ? (
        <AnimatedBtn url="/projects/all" text="Catalog of projects" />
      ) : (
        ""
      )}
    </div>
  );
} 
