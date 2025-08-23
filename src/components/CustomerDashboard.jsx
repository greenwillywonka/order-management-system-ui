import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css"; // can reuse same CSS

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/customers`;
                const data = await fetch(url).then((res) => res.json());
                setCustomers(data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };
        getCustomers();
    }, []);

    // 🔽 Handle sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // 🖼️ Helper: show sort icon
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return "⇅";
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    // 🖼️ Helper: header class for styling (like pill box or active color)
    const getHeaderClass = (key) => {
        return sortConfig.key === key
            ? `${styles.sortableHeader} ${styles.sortableHeaderActive}`
            : styles.sortableHeader;
    };

    // 🔍 Filtering
    const filteredCustomers = customers.filter((customer) =>
        Object.values(customer).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // 📊 Sorting
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Customers Dashboard</h1>
                <p className={styles.subtitle}>Manage your Customers here</p>
                <div className={styles.actions}>
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchBar}
                    />
                    <Link to="/customers/new" className={styles.newOrderBtn}>+ New Customer</Link>
                </div>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")} className={getHeaderClass("id")}>
                                Customer ID {getSortIcon("id")}
                            </th>
                            <th onClick={() => handleSort("customer_name")} className={getHeaderClass("customer_name")}>
                                Customer {getSortIcon("customer_name")}
                            </th>
                            <th onClick={() => handleSort("last_order_date")} className={getHeaderClass("last_order_date")}>
                                Last Order Date {getSortIcon("last_order_date")}
                            </th>
                            <th onClick={() => handleSort("order_quantity")} className={getHeaderClass("order_quantity")}>
                                Total Orders {getSortIcon("order_quantity")}
                            </th>
                            <th onClick={() => handleSort("average_order_total")} className={getHeaderClass("average_order_total")}>
                                Average Order Total {getSortIcon("average_order_total")}
                            </th>
                            <th onClick={() => handleSort("assigned_representative")} className={getHeaderClass("assigned_representative")}>
                                Assigned Representative {getSortIcon("assigned_representative")}
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCustomers.length > 0 ? (
                            sortedCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.customer_name}</td>
                                    <td>{new Date(customer.last_order_date).toLocaleDateString()}</td>
                                    <td>{customer.order_quantity}</td>
                                    <td>${customer.average_order_total}</td>
                                    <td>{customer.assigned_representative}</td>
                                    <td>
                                        <Link to={`/customers/${customer.id}`} className={styles.viewLink}>View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className={styles.emptyMsg}>No matching customers found...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerDashboard;
