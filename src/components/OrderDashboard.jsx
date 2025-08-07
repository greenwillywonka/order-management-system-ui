import {useState, useEffect} from "react";
import { Link } from 'react-router';

const OrderDashboard = () => {
    return (
        <>
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
                    <th>Status</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {/* Order rows will go here */}
            </tbody>
        </table>

       </div>
        </>
    );
};

export default OrderDashboard;