import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./NewCustomer.module.css"; // separate CSS module for styling

const NewCustomer = () => {
  const [customer_name, setCustomerName] = useState("");
  const [assigned_representative, setAssignedRepresentative] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [created_at, setCreatedAt] = useState(""); // you can default to today
  const [order_quantity, setOrderQuantity] = useState(0);
  const [last_order_date, setLastOrderDate] = useState("");
  const [average_order_total, setAverageOrderTotal] = useState(0);
  const [customer_notes, setCustomerNotes] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}/customers`;
    const access_token = localStorage.getItem("access_token");

    const body = {
      customer_name,
      assigned_representative,
      purchaser,
      created_at,
      order_quantity,
      last_order_date,
      average_order_total,
      customer_notes,
      email,
      phonenumber,
      address,
      city,
      state,
      zipcode,
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
      console.log("Customer Created: ", data);
      navigate("/customers"); // go back to customer dashboard after creation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name
          <input
            type="text"
            value={customer_name}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </label>

        <label>
          Assigned Representative
          <input
            type="text"
            value={assigned_representative}
            onChange={(e) => setAssignedRepresentative(e.target.value)}
          />
        </label>

        <label>
          Purchaser
          <input
            type="text"
            value={purchaser}
            onChange={(e) => setPurchaser(e.target.value)}
          />
        </label>

        <label>
          Created At
          <input
            type="date"
            value={created_at}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </label>

        <label>
          Order Quantity
          <input
            type="number"
            min="0"
            value={order_quantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
          />
        </label>

        <label>
          Last Order Date
          <input
            type="date"
            value={last_order_date}
            onChange={(e) => setLastOrderDate(e.target.value)}
          />
        </label>

        <label>
          Average Order Total
          <input
            type="number"
            step="0.01"
            value={average_order_total}
            onChange={(e) => setAverageOrderTotal(e.target.value)}
          />
        </label>

        <label>
          Notes
          <textarea
            type="text"
            value={customer_notes}
            onChange={(e) => setCustomerNotes(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Phone Number
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          Zip Code
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>

        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
};

export default NewCustomer;
