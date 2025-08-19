import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const OrderDetails = ({ orderId }) => {
  const [order_customer, setCustomer] = useState("");
  const [order_po, setPo] = useState("");
  const [order_date, setDate] = useState("");
  const [order_created_by, setCreatedBy] = useState("");
  const [order_created_at, setCreatedAt] = useState("");
  const [requested_date, setRequestedDate] = useState("");
  const [ order_status, setStatus] = useState("");
  const [order_product, setProduct] = useState("");
  const [order_product_quantity, setQuantity] = useState("");
  const [order_total, setTotal] = useState("");
  const navigate = useNavigate();

const [myValue, setMyValue] = useState("")

const apiUrl = `${import.meta.env.VITE_API_URL}/orders`; // <-- orders table or new new orders table??
const access_token = localStorage.getItem("access_token");

  const body = {
    order_customer,
    order_po,
    order_date,
    order_created_by,
    order_created_at,
    requested_date,
    order_status,
    order_product,
    order_product_quantity: Number(order_product_quantity),
    order_total
  };

 useEffect(() => {
   const getData = async () => {
     const data = await fetch(apiUrl).then((response) => response.json());

     setMyValue(data.someValue)
   };
   getData();
 }, [setMyValue]);


return (
  <form method= "PATCH" onSubmit={handleSubmit}>
    <label>
      Customer
      <input
        type="text"value={myValue} onChange={(e) => setMyValue(e.target.value)}/>
    </label>
    <label>
      PO
      <input
        type="text"
        name="order_po"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Order Date
      <input
        type="date"
        name="order_date"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Created By
      <input
        type="text"
        name="order_created_by"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Created At
      <input
        type="datetime-local"
        name="order_created_at"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Requested Date
      <input
        type="date"
        name="requested_date"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Status
      <input
        type="text"
        name="order_status"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Product
      <input
        type="text"
        name="order_product"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Quantity
      <input
        type="number"
        min="1"
        name="order_product_quantity"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <label>
      Total
      <input
        type="number"
        name="order_total"
        value={myValue}
        onChange={(e) => setMyValue(e.target.value)}
      />
    </label>
    <button type="submit">
      Update Order
    </button>
   </form>
 )
}


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router";

// const OrderDetails = () => {
//   const { orderId } = useParams(); // <-- get order id from URL like /orders/123
//   const [order_customer, setCustomer] = useState("");
//   const [order_po, setPo] = useState("");
//   const [order_date, setDate] = useState("");
//   const [order_created_by, setCreatedBy] = useState("");
//   const [order_created_at, setCreatedAt] = useState("");
//   const [requested_date, setRequestedDate] = useState("");
//   const [order_status, setStatus] = useState("");
//   const [order_product, setProduct] = useState("");
//   const [order_product_quantity, setQuantity] = useState("");
//   const [order_total, setTotal] = useState("");
//   const navigate = useNavigate();

//   const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${orderId}`;
//   const access_token = localStorage.getItem("access_token");

//   // Fetch order details
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await fetch(apiUrl, {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         const data = await response.json();

//         // set all values
//         setCustomer(data.order_customer || order_customer.Id);
//         setPo(data.order_po || "");
//         setDate(data.order_date || "");
//         setCreatedBy(data.order_created_by || "");
//         setCreatedAt(data.order_created_at || "");
//         setRequestedDate(data.requested_date || "");
//         setStatus(data.order_status || "");
//         setProduct(data.order_product || "");
//         setQuantity(data.order_product_quantity || "");
//         setTotal(data.order_total || "");
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };

//     getData();
//   }, [orderId]);

//   // Handle update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = {
//       order_customer,
//       order_po,
//       order_date,
//       order_created_by,
//       order_created_at,
//       requested_date,
//       order_status,
//       order_product,
//       order_product_quantity: Number(order_product_quantity),
//       order_total,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: "PATCH",
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//       });

//       const updated = await response.json();
//       console.log("Order Updated:", updated);
//       navigate("/orders");
//     } catch (error) {
//       console.error("Error updating order:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Customer
//         <input
//           type="text"
//           value={order_customer}
//           onChange={(e) => setCustomer(e.target.value)}
//         />
//       </label>
//       <label>
//         PO
//         <input
//           type="text"
//           value={order_po}
//           onChange={(e) => setPo(e.target.value)}
//         />
//       </label>
//       <label>
//         Order Date
//         <input
//           type="date"
//           value={order_date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </label>
//       <label>
//         Created By
//         <input
//           type="text"
//           value={order_created_by}
//           onChange={(e) => setCreatedBy(e.target.value)}
//         />
//       </label>
//       <label>
//         Created At
//         <input
//           type="datetime-local"
//           value={order_created_at}
//           onChange={(e) => setCreatedAt(e.target.value)}
//         />
//       </label>
//       <label>
//         Requested Date
//         <input
//           type="date"
//           value={requested_date}
//           onChange={(e) => setRequestedDate(e.target.value)}
//         />
//       </label>
//       <label>
//         Status
//         <input
//           type="text"
//           value={order_status}
//           onChange={(e) => setStatus(e.target.value)}
//         />
//       </label>
//       <label>
//         Product
//         <input
//           type="text"
//           value={order_product}
//           onChange={(e) => setProduct(e.target.value)}
//         />
//       </label>
//       <label>
//         Quantity
//         <input
//           type="number"
//           min="1"
//           value={order_product_quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//       </label>
//       <label>
//         Total
//         <input
//           type="number"
//           value={order_total}
//           onChange={(e) => setTotal(e.target.value)}
//         />
//       </label>
//       <button type="submit">Update Order</button>
//     </form>
//   );
// };

// export default OrderDetails;
