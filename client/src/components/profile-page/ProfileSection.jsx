import { useState } from "react";
import styles from "./ProfileSection.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ProfileSection() {
  const { username, email } = useAuthContext();

  
  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false,
    bio: false,
  });

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePicture}>
          <img src="https://via.placeholder.com/150" alt="User Profile" />
          <button className={styles.editPictureBtn}>Change Picture</button>
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>{username}</h1>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>
      <div className={styles.profileContent}>
        <form className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              readOnly={!isEditing.username}
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
              value={email}
              readOnly={!isEditing.email}
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
              value="+1 234 567 890"
              readOnly={!isEditing.phone}
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
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="4"
              value="Hi, I'm John Doe, a web developer from New York!"
              readOnly={!isEditing.bio}
            ></textarea>
            <button
              className={styles.editBtn}
              type="button"
              onClick={() => toggleEdit("bio")}
            >
              {isEditing.bio ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Change Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
            />
          </div>
          <div className={styles.formGroup}>
            <button className={styles.saveBtn} type="submit">
              Save Changes
            </button>
          </div>
        </form>
        <div className={styles["bottom-btns"]}>
          <Link to="/logout" className={styles.logoutBtn}>
            Logout
          </Link>
          <Link to="/delete-account" className={styles.deleteBtn}>
            Delete Account
          </Link>
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
