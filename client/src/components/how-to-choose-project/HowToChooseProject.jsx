import React from "react";
import styles from "./HowToChooseProject.module.css";
import {
  FaSearch,
  FaLightbulb,
  FaTasks,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";

const HowToChooseProject = () => {
  const steps = [
    {
      title: "Identify Your Goals",
      description: "Determine what you want to achieve with the project.",
      icon: <FaSearch />,
    },
    {
      title: "Explore Ideas",
      description:
        "Research and brainstorm project ideas that align with your goals.",
      icon: <FaLightbulb />,
    },
    {
      title: "Evaluate Feasibility",
      description:
        "Consider the resources, time, and skills needed for the project.",
      icon: <FaTasks />,
    },
    {
      title: "Plan & Strategize",
      description:
        "Create a clear roadmap for how to execute the project successfully.",
      icon: <FaChartLine />,
    },
    {
      title: "Launch Your Project",
      description:
        "Start working on your project and track your progress regularly.",
      icon: <FaRocket />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>
        <h1>How To Choose Project</h1>
      </div>
      <div className={styles.timeline}>
        <div className={styles.line}></div>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.step} ${
              index % 2 === 0 ? styles.stepLeft : styles.stepRight
            }`}
          >
            <div className={styles.stepIcon}>{step.icon}</div>
            <div className={styles.stepContent}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToChooseProject;
