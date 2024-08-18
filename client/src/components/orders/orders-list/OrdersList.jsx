import { Link } from "react-router-dom";
import styles from "./OrdersList.module.css";

export default function OrdersList({ orders }) {
  return (
    <div className={styles.ordersList}>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div>
              <Link
                to={`/projects/details/${order.project.id}`}
                className={styles.orderHeader}
              >
                <h2 className={styles.orderTitle}>{order.project.name}</h2>
              </Link>
            </div>
            <div className={styles.orderDetails}>
              <p className={styles.orderEnquiry}>{order.enquiry}</p>
              <div className={styles.bottomDetails}>
                <p className={styles.orderDate}>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className={styles.orderId}>Order #{order.id}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className={styles.noContent}>No Orders Here!</h2>
      )}
    </div>
  );
}
