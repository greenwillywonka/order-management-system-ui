import {useState, useEffect} from 'react';

const OrderDashboard = () => {
    return (
        <>
               <h1>Orders Dashboard</h1>
        <p>Manage your orders here.</p>
        <button>Add Order</button>
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
       
        </>
    );
};

export default OrderDashboard;