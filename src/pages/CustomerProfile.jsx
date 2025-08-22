import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './CustomerProfile.module.css'; // Assuming you have a CSS module for styling


const CustomerProfile = () => {
  const { id } = useParams(); // Get the customer ID from the URL parameters
  const apiUrl = `${import.meta.env.VITE_API_URL}/customers/${id}`; // Fetching specific order details
  const access_token = localStorage.getItem("access_token");
  const [created_at, setCreatedAt] = useState("");
  const [order_quantity, setOrderQuantity] = useState("");
  const [last_order_date, setLastOrderDate] = useState("");
  const [average_order_total, setAverageOrderTotal] = useState("");
  const [assigned_representative, setAssignedRepresentative] = useState("");
  const [customer_name, setCustomerName] = useState("");
  const [customer_notes, setCustomerNotes] = useState("");
  const [purchaser, setPurchaser] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();



    const body = {
      created_at,
      order_quantity,
      last_order_date,
      average_order_total,
      assigned_representative,
      customer_name,
      customer_notes,
      purchaser,
      email,
      phonenumber,
      address,
      city,
      state,
      zipcode,
    };

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/customers/${id}`; // <-- customers table or new new orders table??
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
      console.log("Customer Created: ", data);
      navigate("/customers"); // <-- where you want to go after submit
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const apiUrl = `${import.meta.env.VITE_API_URL}/customers/${id}`; // Fetching specific order details
      const access_token = localStorage.getItem("access_token");
      const data = await fetch(apiUrl).then((response) => response.json());

      setCreatedAt(data.created_at || "");
      setOrderQuantity(data.order_quantity || "");
      setLastOrderDate(data.last_order_date || "");
      setAverageOrderTotal(data.average_order_total || "");
      setAssignedRepresentative(data.assigned_representative || "");
      setCustomerName(data.customer_name || "");
      setCustomerNotes(data.customer_notes || "");
      setPurchaser(data.purchaser || "");
      setEmail(data.email || "");
      setPhoneNumber(data.phonenumber || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setState(data.state || "");
      setZipCode(data.zipcode || "");
    };
    getData();
  }, [id]);


  return (
    <>
    <h1 className={styles.title}>Customer Profile - {customer_name}</h1>
    <div className={styles.formContainer}>
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        Customer
        <input
          type="text" 
          name="customer_name" 
          value={customer_name} 
          onChange={(e) => setCustomerName(e.target.value)} 
          />
      </label>
      <label>
        Assigned Representative
        <input
          type="text"
          name="assigned_representative"
          value={assigned_representative}
          onChange={(e) => setAssignedRepresentative(e.target.value)}
        />
      </label>
      <label>
        Purchaser
        <input
          type="text"
          name="purchaser"
          value={purchaser}
          onChange={(e) => setPurchaser(e.target.value)}
        />
      </label>
      <label>
        Order Quantity
        <input
          type="text"
          name="order_quantity"
          value={order_quantity}
          onChange={(e) => setOrderQuantity(e.target.value)}
        />
      </label>
      <label>
        Last Order Date
        <input
          type="date"
          name="last_order_date"
          value={last_order_date}
          onChange={(e) => setLastOrderDate(e.target.value)}
        />
      </label>
      <label>
        Average Order Total
        <input
          type="text"
          name="average_order_total"
          value={average_order_total}
          onChange={(e) => setAverageOrderTotal(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone Number
        <input
          type="text"
          name="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        City
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <label>
        State
        <input
          type="text"
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <label>
        Zip Code
        <input
          type="text"
          name="zipcode"
          value={zipcode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </label>
      <label className={styles.notesLabel}>
        Notes
        <textarea
          type="text"
          name="customer_notes"
          rows={5}
          value={customer_notes}
          onChange={(e) => setCustomerNotes(e.target.value)}
        />
      </label>
      <button type="submit">
        Update Customer Profile
      </button>
    </form>
    </div>
    </>
  )
}
export default CustomerProfile;

