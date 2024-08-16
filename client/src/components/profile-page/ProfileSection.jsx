import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProfileSection.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDeleteUser, useUpdateUser } from "../../hooks/useUser";
import { useChangePassword } from "../../hooks/useUser";

export default function ProfileSection() {
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const changePassword = useChangePassword();
  const navigate = useNavigate();

  const {
    userId,
    username: initialUsername,
    email: initialEmail,
    address: initialAddress,
    phone: initialPhone,
  } = useAuthContext();

  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
    address: false,
  });

  const [formData, setFormData] = useState({
    username: initialUsername,
    email: initialEmail,
    phone: initialPhone || "",
    address: initialAddress || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(null);

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, formData);
    } catch (error) {
      console.error(error);
    }
    setIsEditing({
      username: false,
      email: false,
      phone: false,
      address: false,
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      await changePassword(
        userId,
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password successfully changed!");
    } catch (error) {
      setPasswordError(
        "Failed to change password. Please check your current password and try again."
      );
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicture}>
          <img src="https://via.placeholder.com/150" alt="User Profile" />
          <button className={styles.editPictureBtn}>Change Picture</button>
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{formData.username}</h1>
          <p className={styles.userEmail}>{formData.email}</p>
        </div>
      </div>
      <div className={styles.profileContent}>
        <form className={styles.profileForm} onSubmit={handleSaveChanges}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              readOnly={!isEditing.username}
              onChange={handleChange}
            />
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => toggleEdit("username")}
            >
              {isEditing.username ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              readOnly={!isEditing.email}
              onChange={handleChange}
            />
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => toggleEdit("email")}
            >
              {isEditing.email ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              placeholder="Add phone number..."
              readOnly={!isEditing.phone}
              onChange={handleChange}
            />
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => toggleEdit("phone")}
            >
              {isEditing.phone ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              placeholder="Add address..."
              readOnly={!isEditing.address}
              onChange={handleChange}
            />
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => toggleEdit("address")}
            >
              {isEditing.address ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.formGroup}>
            <button className={styles.saveBtn} type="submit">
              Save Changes
            </button>
          </div>
        </form>

        <form className={styles.passwordForm} onSubmit={handlePasswordUpdate}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {passwordError && (
            <p className={styles.passwordError}>{passwordError}</p>
          )}
          <div className={styles.formGroup}>
            <button className={styles.saveBtn} type="submit">
              Change Password
            </button>
          </div>
        </form>

        <div className={styles["bottom-btns"]}>
          <Link to="/logout" className={styles.logoutBtn}>
            Logout
          </Link>
          <button className={styles.deleteBtn} onClick={handleDeleteUser}>
            Delete Account
          </button>
        </div>

        <div className={styles.socialLinks}>
          <h3>Connect with me:</h3>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#" className={styles.socialLink}>
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
