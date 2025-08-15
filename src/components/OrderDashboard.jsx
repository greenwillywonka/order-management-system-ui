import { useState, useEffect } from "react";
import { Link } from "react-router";

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/orders`; // This should be your FastAPI endpoint
                const data = await fetch(url).then((res) => res.json());
                console.log("Orders data:", data);
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        getOrders();
    }, []);

    return (
        <div className="OrderDashboard">
            <h1>Orders Dashboard</h1>
            <p>Manage your orders here.</p>
            <Link to="/orders/new"> New Order </Link>

            <table>
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
                                <td>{order.order_status}</td>
                                <td>${order.order_total}</td>
                                <td>
                                    <Link to={`/orders/${order.id}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Orders did not load...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDashboard;