import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });

    useEffect(() => {
        const getOrders = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/orders`;
                const data = await fetch(url).then((res) => res.json());
                const sortedOrders = data.sort((a, b) => b.id - a.id);
                setOrders(sortedOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        getOrders();
    }, []);

    // 🔽 Handle sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // 🔍 Filtering (search + status)
    const filteredOrders = orders.filter((order) => {
        const matchesSearch = Object.values(order).some((val) =>
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );
        const matchesStatus = statusFilter
            ? order.order_status.toLowerCase() === statusFilter.toLowerCase()
            : true;
        return matchesSearch && matchesStatus;
    });

    // 📊 Sorting
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // 🖼️ Helper: show ▲▼ icon if column is active
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "⇅"; // neutral
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    // 🖼️ Helper: return CSS class for sortable headers
    const getHeaderClass = (key) => {
        return sortConfig.key === key
            ? `${styles.sortableHeader} ${styles.sortableHeaderActive}`
            : styles.sortableHeader;
    };

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

                    {/* ⏬ Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={styles.filterDropdown}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Complete">Complete</option>
                    </select>

                    <Link to="/orders/new" className={styles.newOrderBtn}>
                        + New Order
                    </Link>
                </div>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")} className={getHeaderClass("id")}>
                                Order ID {getSortIcon("id")}
                            </th>
                            <th
                                onClick={() => handleSort("order_customer")}
                                className={getHeaderClass("order_customer")}
                            >
                                Customer {getSortIcon("order_customer")}
                            </th>
                            <th
                                onClick={() => handleSort("order_date")}
                                className={getHeaderClass("order_date")}
                            >
                                Order Date {getSortIcon("order_date")}
                            </th>
                            <th
                                onClick={() => handleSort("requested_date")}
                                className={getHeaderClass("requested_date")}
                            >
                                Requested Date {getSortIcon("requested_date")}
                            </th>
                            <th>PO</th>
                            <th>Status</th>
                            <th
                                onClick={() => handleSort("order_total")}
                                className={getHeaderClass("order_total")}
                            >
                                Total {getSortIcon("order_total")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.length > 0 ? (
                            sortedOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.order_customer}</td>
                                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                    <td>{new Date(order.requested_date).toLocaleDateString()}</td>
                                    <td>{order.order_po}</td>
                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[order.order_status.toLowerCase()]}`}
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
                                <td colSpan="8" className={styles.emptyMsg}>
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
