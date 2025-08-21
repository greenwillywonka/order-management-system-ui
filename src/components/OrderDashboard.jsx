import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css"; // Assuming you have a CSS module for styling

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/orders`; // This should be your FastAPI endpoint
                const data = await fetch(url).then((res) => res.json());
                const sortedOrders = data.sort((a, b) => b.id - a.id);
                console.log("Orders data:", data);
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        getOrders();
    }, []);

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Orders Dashboard</h1>
                <p className={styles.subtitle}>Manage your orders here</p>
                <Link to="/orders/new" className={styles.newOrderBtn}> + New Order </Link>
            </header>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Order Date</th>
                            <th>PO</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.order_customer}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.order_po}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[order.order_status.toLowerCase()]
                                                }`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td>${order.order_total}</td>
                                    <td>
                                        <Link to={`/orders/${order.id}`} className={styles.viewLink}>View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.emptyMsg}>Orders did not load...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
            );
};

            export default OrderDashboard;