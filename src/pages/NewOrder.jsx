import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./NewOrder.module.css"; // Assuming you have a CSS module for styling
const NewOrder = () => {
  const [order_customer, setCustomer] = useState(""); // set customer or setOrder_Customer?
  const [order_po, setPo] = useState("");
  const [order_product, setProduct] = useState("");
  const [order_date, setDate] = useState("");
  const [order_created_by, setCreatedBy] = useState("");
  const [order_created_at, setCreatedAt] = useState("");
  const [requested_date, setRequestedDate] = useState("");
  const [order_status, setStatus] = useState("");
  const [order_product_quantity, setQuantity] = useState("");
  const [order_total, setTotal] = useState("");
  const [tracking_number, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/customers`; 
      const access_token = localStorage.getItem("access_token");

      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const data = await response.json();
      setCustomers(data); // make sure API returns an array of customers
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  fetchCustomers();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      order_total,
      tracking_number,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
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

  return (
    <div className={styles.formContainer}>
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Customer
          <input
            type="text"
            list="customer-options"
            name="order_customer"
            value={order_customer}
            onChange={(e) => setCustomer(e.target.value)}
          />
          <datalist id="customer-options">
            {customers.map((customer,idx) => (
              <option key={idx} value={customer.customer_name} />
            ))}
          </datalist>  
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
          Date
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
          Requested Date
          <input
            type="date"
            name="requested_date"
            value={requested_date}
            onChange={(e) => setRequestedDate(e.target.value)}
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
          Status
          <select
            name="order_status"
            value={order_status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            <option value="pending">Pending</option>
            <option value="shipping">Shipping</option>
            <option value="complete">Complete</option>
          </select>
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
        <label>
          Tracking Number
          <input
            type="text"
            name="tracking_number"
            placeholder="UPS, FedEx, USPS, PRO, etc."
            value={tracking_number}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </label>
        <button type="submit" >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default NewOrder;
