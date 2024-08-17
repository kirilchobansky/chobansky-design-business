import { useEffect, useState } from "react";
import ordersApi from "../api/orders-api";

export function useGetOrdersByUser(userId) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                if (userId) {
                    const fetchedOrders = await ordersApi.getOrdersByUser(userId);
                    setOrders(fetchedOrders);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        })();
    }, []);

    return [orders, setOrders];
}