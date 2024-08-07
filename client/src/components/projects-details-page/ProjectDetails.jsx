import { useParams } from "react-router-dom";

import styles from "./ProjectDetails.module.css";

const images = [
  "/src/assets/images/cave-biserna/2.jpg",
  "/src/assets/images/cave-biserna/3.jpg",
  "/src/assets/images/cave-biserna/1.jpg",
];

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className={styles["container"]}>
      <div className={styles["image-content"]}>
        <div className={styles["main-image"]}>
          <img src={images[0]} alt="Main" />
        </div>
        <div className={styles["image-slider"]}>
          <div className={styles["slider-images"]}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={styles["slide-image"]}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles["content"]}>
        <h1>House Project LK&1860</h1>
        <p>Details about the house project...</p>
        <button>Buy with one click</button>
      </div>
    </div>
  );
}
