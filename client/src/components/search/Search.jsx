import React from "react";
import styles from "./Search.module.css";
import { useGetSearch } from "../../hooks/useUser";
import { useParams } from "react-router-dom";
import ProjectsList from "../projects-page/projects-list/ProjectsList";
import OrdersList from "../orders/orders-list/OrdersList";

export default function Search() {
  const { search } = useParams();
  const { projects, orders } = useGetSearch(search);

  const noResultsFound = !projects.length && !orders.length;

  return (
    <div className={styles["search-results"]}>
      <h2>Search Results for: "{search}"</h2>
      <div className={styles["results-section"]}>
        {noResultsFound ? (
          <p className={styles["no-results"]}>
            No results found for "{search}".
          </p>
        ) : (
          <>
            {projects.length > 0 && <ProjectsList projects={projects} />}
            {orders.length > 0 && <OrdersList orders={orders} />}
          </>
        )}
      </div>
    </div>
  );
}
