import React, { useState } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1); 

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.mainImage}>
        <img src={images[currentIndex]} alt="Main" />
      </div>
      <div className={styles.slider}>
        <button
          className={styles.arrow}
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <div className={styles.sliderImages}>
          {images
            .slice(Math.max(currentIndex - 1, 0), currentIndex + 2)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={`${styles.slideImage} ${
                  index === 1 ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(currentIndex + index - 1)}
              />
            ))}
        </div>
        <button
          className={styles.arrow}
          onClick={handleNextClick}
          disabled={currentIndex === images.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
