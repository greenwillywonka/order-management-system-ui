import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css"; // Assuming you have a CSS module for styling

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // <-- NEW

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/customers`;
                const data = await fetch(url).then((res) => res.json());
                console.log("Customers data:", data);
                setCustomers(data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            }
        };
        getCustomers();
    }, []);

    // Filter customers based on search
    const filteredCustomers = customers.filter((customer) =>
        Object.values(customer).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

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
                <Link to="/customers/new" className={styles.newOrderBtn}> + New Customer </Link>
                </div>
            </header>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer</th>
                            <th>Last Order Date</th>
                            <th>Total Orders</th>
                            <th>Assigned Representative</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.customer_name}</td>
                                    <td>{customer.last_order_date}</td>
                                    <td>{customer.order_quantity}</td>
                                    <td>{customer.assigned_representative}</td>
                                    <td>
                                        <Link to={`/customers/${customer.id}`} className={styles.viewLink}>View</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className={styles.emptyMsg}>No matching customers found...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerDashboard;
