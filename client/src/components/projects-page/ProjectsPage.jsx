import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetByCategory } from "../../hooks/useProjects";
import styles from "./ProjectsPage.module.css";
import ProjectsList from "./projects-list/ProjectsList";

const categories = [
  { name: "All", id: "all" },
  { name: "Public Buildings", id: "public" },
  { name: "Industrial Buildings", id: "industrial" },
  { name: "Residential Buildings", id: "residential" },
  { name: "Interior Design", id: "interior" },
  { name: "Urban Planning", id: "urban" },
];

export default function ProjectsPage() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState("");
  const [projects] = useGetByCategory(activeCategory);

  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  const activeCategoryName =
    activeCategory === "all"
      ? "All Buildings"
      : categories.find((category) => category.id === activeCategory)?.name;

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.categoryHeader}>{activeCategoryName}</h1>
        <div className={styles.line}>
          {categories.map((category) => (
            <Link
              key={category.id}
              className={`${styles.point} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              to={`/projects/${category.id}`}
            >
              <span className={styles.label}>{category.name}</span>
            </Link>
          ))}
        </div>
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}
