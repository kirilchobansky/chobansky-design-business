import React, { useState } from "react";
import styles from "./EnquiryForm.module.css";
import ordersApi from "../../api/orders-api";
import { useAuthContext } from "../../contexts/AuthContext";

const EnquiryForm = ({ project, onClose }) => {
  const { userId } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ordersApi.create(formData, userId, project._id);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Enquiry Form for {project.name}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="phone">Your Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          <label htmlFor="enquiry">Your Enquiry:</label>
          <textarea
            id="enquiry"
            name="enquiry"
            rows="5"
            value={formData.enquiry}
            onChange={handleChange}
            placeholder="What would you like to ask?"
            required
          ></textarea>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitBtn}>
              Submit Enquiry
            </button>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
