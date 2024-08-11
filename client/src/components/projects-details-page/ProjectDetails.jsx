import { useParams } from "react-router-dom";

import styles from "./ProjectDetails.module.css";
import { useEffect, useState } from "react";
import projectsApi from "../../api/projects-api";
import ImageSlider from "./image-slider/ImageSlider";
import CommentsSection from "./comments-section/CommentsSection";
import DetailsSection from "./details-section/DetailsSection";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const projectResult = await projectsApi.getOneById(id);
        setProject(projectResult);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    })();
  }, [id]);

  return (
    <div className={styles["container"]}>
      <div className={styles["details-wrapper"]}>
        {project.images && project.images.length > 0 && (
          <ImageSlider images={project.images} />
        )}

        <DetailsSection project={project} />
      </div>

      <div className={styles["comments-section"]}>
        <CommentsSection {...project} />
      </div>
    </div>
  );
}
