import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';


const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL parameters
  const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${id}`; // Fetching specific order details
  const access_token = localStorage.getItem("access_token");
  const [order_customer, setCustomer] = useState("");
  const [order_po, setPo] = useState("");
  const [order_date, setDate] = useState("");
  const [order_created_by, setCreatedBy] = useState("");
  const [order_created_at, setCreatedAt] = useState("");
  const [requested_date, setRequestedDate] = useState("");
  const [order_status, setStatus] = useState("");
  const [order_product, setProduct] = useState("");
  const [order_product_quantity, setQuantity] = useState("");
  const [order_total, setTotal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();



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

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${id}`; // <-- orders table or new new orders table??
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
      });
      const data = await response.json();
      console.log("Order Created: ", data);
      navigate("/orders"); // <-- where you want to go after submit
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${id}`; // Fetching specific order details
      const access_token = localStorage.getItem("access_token");
      const data = await fetch(apiUrl).then((response) => response.json());

      setCustomer(data.order_customer || "");
      setPo(data.order_po || "");
      setDate(data.order_date || "");
      setCreatedBy(data.order_created_by || "");
      setCreatedAt(data.order_created_at || "");
      setRequestedDate(data.requested_date || "");
      setStatus(data.order_status || "");
      setProduct(data.order_product || "");
      setQuantity(data.order_product_quantity || "");
      setTotal(data.order_total || "");
    };
    getData();
  }, [id]);


  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        Customer
        <input
          type="text" 
          name="order_customer" 
          value={order_customer} 
          onChange={(e) => setCustomer(e.target.value)} 
          />
      </label>
      <label>
        PO
        <input
          type="text"
          name="order_po"
          value={order_po}
          onChange={(e) => setPo(e.target.value)}
        />
      </label>
      <label>
        Order Date
        <input
          type="date"
          name="order_date"
          value={order_date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Created By
        <input
          type="text"
          name="order_created_by"
          value={order_created_by}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
      </label>
      <label>
        Created At
        <input
          type="datetime-local"
          name="order_created_at"
          value={order_created_at}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </label>
      <label>
        Requested Date
        <input
          type="date"
          name="requested_date"
          value={requested_date}
          onChange={(e) => setRequestedDate(e.target.value)}
        />
      </label>
      <label>
        Status
        <input
          type="text"
          name="order_status"
          value={order_status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </label>
      <label>
        Product
        <input
          type="text"
          name="order_product"
          value={order_product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </label>
      <label>
        Quantity
        <input
          type="number"
          min="1"
          name="order_product_quantity"
          value={order_product_quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <label>
        Total
        <input
          type="number"
          name="order_total"
          value={order_total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </label>
      <button type="submit">
        Update Order
      </button>
    </form>
  )
}
export default OrderDetails;

