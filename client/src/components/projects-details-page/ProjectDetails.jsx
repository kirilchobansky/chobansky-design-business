import { useParams } from "react-router-dom";

import { useGetOneProject } from "../../hooks/useProjects";

import styles from "./ProjectDetails.module.css";
import ImageSlider from "./image-slider/ImageSlider";
import CommentsSection from "./comments-section/CommentsSection";
import DetailsSection from "./details-section/DetailsSection";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project] = useGetOneProject(projectId);

  return (
    <div className={styles["container"]}>
      <div className={styles["details-wrapper"]}>
        {project.images && project.images.length > 0 && (
          <ImageSlider images={project.images} />
        )}

        <DetailsSection project={project} />
      </div>
      <div className={styles["comments-section"]}>
        <CommentsSection comments={project.comments} />
      </div>
    </div>
  );
}
