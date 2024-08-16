import ClassicOrange from "../../shared/buttons/classic-orange/ClassicOrange";
import styles from "./DetailsSection.module.css";

export default function DetailsSection({ project }) {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.header}>
        <h1>{project.name}</h1>
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
        <p>{project.description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <ClassicOrange url="/order" text="Make an Enquiry " />
      </div>
    </div>
  );
}
