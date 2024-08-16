import React from "react";
import styles from "./Search.module.css";
import { useGetSearchProjects } from "../../hooks/useUser";
import { useParams } from "react-router-dom";
import ProjectsList from "../projects-page/projects-list/ProjectsList";

export default function Search({ searchTerm, orders = [] }) {
  const { search } = useParams();
  const [projects] = useGetSearchProjects(search);

  return (
    <div className={styles["search-results"]}>
      <h2>Search Results for: "{search}"</h2>

      <div className="results-section">
        <ProjectsList projects={projects} />
      </div>

      {/* <div className="results-section">
        <h3>Orders</h3>
        {orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <h4>Order #{order.id}</h4>
                <p>{order.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No orders found.</p>
        )}
      </div> */}
    </div>
  );
}
