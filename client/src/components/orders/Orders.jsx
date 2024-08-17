import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGetOrdersByUser } from "../../hooks/useOrders";
import styles from "./Orders.module.css";

export default function Orders() {
  const { userId } = useAuthContext();
  const [orders] = useGetOrdersByUser(userId);

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.ordersTitle}>Your Orders</h1>

      <div className={styles.ordersList}>
        {orders.map((order) => (
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
                <p className={styles.orderDate}>Order #{order.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
