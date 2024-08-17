import React from "react";
import styles from "./AboutUs.module.css"; // Ensure this path is correct

const AboutUs = () => {
  return (
    <div>
      <div className={styles.subHeader}>
        <h1>About Us</h1>
      </div>
      <div className={styles.aboutUs}>
        <div className={styles.row}>
          <div className={styles.aboutCol}>
            <h1>We are the best architect company</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
              repudiandae at pariatur rerum mollitia in quam, dolorem amet
              tenetur aliquid corporis, cumque ipsa asperiores unde repellendus
              sit rem debitis libero. Esse, dolorem nesciunt sed ex soluta
              inventore accusamus, exercitationem corporis necessitatibus,
              temporibus maxime non illo minima repellat neque tempora
              consectetur.
            </p>
            <a href="#" className={styles.redBtn}>
              EXPLORE NOW
            </a>
          </div>
          <div className={styles.aboutCol}>
            <img src="images/about.jpg" alt="About Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
