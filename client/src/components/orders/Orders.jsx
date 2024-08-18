import { useAuthContext } from "../../contexts/AuthContext";
import { useGetOrdersByUser } from "../../hooks/useOrders";
import OrdersList from "./orders-list/OrdersList";
import styles from "./Orders.module.css";

export default function Orders() {
  const { userId } = useAuthContext();
  const [orders] = useGetOrdersByUser(userId);

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.ordersTitle}>Your Orders</h1>
      <OrdersList orders={orders} />
    </div>
  );
}
