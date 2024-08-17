import React, { useState } from "react";
import styles from "./DetailsSection.module.css";
import EnquiryForm from "../../enquiry-form/EnquiryForm";

export default function DetailsSection({ project }) {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleEnquiryClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

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
        <button onClick={handleEnquiryClick} className={styles.classic}>
          Make an Enquiry
        </button>
      </div>

      {isFormVisible && (
        <EnquiryForm project={project} onClose={handleCloseForm} />
      )}
    </div>
  );
}
