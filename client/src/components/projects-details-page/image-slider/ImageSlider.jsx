import React, { useState } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Initialize with 0, not 1

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
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
                  index + Math.max(currentIndex - 1, 0) === currentIndex
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  handleThumbnailClick(index + Math.max(currentIndex - 1, 0))
                }
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
