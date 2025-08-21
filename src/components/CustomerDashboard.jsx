import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./OrderDashboard.module.css"; // Assuming you have a CSS module for styling

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/customers`; // This should be your FastAPI endpoint
                const data = await fetch(url).then((res) => res.json());
                console.log("Customers data:", data);
                setCustomers(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        getCustomers();
    }, []);

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Customers Dashboard</h1>
                <p className={styles.subtitle}>Manage your Customers here</p>
                <Link to="/customers/new" className={styles.newOrderBtn}> + New Customer </Link>
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
                        {customers && customers.length > 0 ? (
                            customers.map((customer) => (
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
                                <td colSpan="6" className={styles.emptyMsg}>Customers did not load...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
            );
};

            export default CustomerDashboard;