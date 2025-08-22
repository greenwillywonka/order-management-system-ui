import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getOrders = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/orders`;
                const data = await fetch(url).then((res) => res.json());
                const sortedOrders = data.sort((a, b) => b.id - a.id);
                console.log("Orders data:", sortedOrders);
                setOrders(sortedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        getOrders();
    }, []);

    // 🔍 Filter orders based on query
    const filteredOrders = orders.filter((order) =>
        Object.values(order).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Orders Dashboard</h1>
                <p className={styles.subtitle}>Manage your orders here</p>
                <div className={styles.actions}>
                    {/* 🔍 Search Bar */}
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Link to="/orders/new" className={styles.newOrderBtn}>
                        + New Order
                    </Link>
                </div>
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
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
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
                                        <Link to={`/orders/${order.id}`} className={styles.viewLink}>
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className={styles.emptyMsg}>
                                    No matching orders found...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDashboard;
