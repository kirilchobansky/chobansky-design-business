import { useParams } from "react-router-dom";

import styles from "./ProjectDetails.module.css";
import { useEffect, useState } from "react";
import projectsApi from "../../api/projects-api";
import ImageSlider from "./image-slider/ImageSlider";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const projectResult = await projectsApi.getOneById(id);
        setProject(projectResult);

        if (
          projectResult &&
          Array.isArray(projectResult.images) &&
          projectResult.images.length > 0
        ) {
          setMainImage(projectResult.images[0]);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    })();
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["image-content"]}>
        <div className={styles["image-slider"]}>
          {project.images && project.images.length > 0 && (
            <ImageSlider images={project.images} />
          )}
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.header}>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <div className={styles.detailsContent}>
          <div className={styles.detailItem}>
            <h2>Price per m²</h2>
            <p>${project.price}</p>
          </div>
          <div className={styles.detailItem}>
            <h2>Area</h2>
            <p>{project.area} m²</p>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <h2>Project Description</h2>
          <p>{project.longDescription}</p>
        </div>
        <button className={styles.orderButton}>Place Order</button>
      </div>
    </div>
  );
}
