import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NewOrder = () => {
  const [order_customer, setCustomer] = useState(""); // set customer or setOrder_Customer?
  const [order_po, setPo] = useState("");
  const [order_product, setProduct] = useState("");
  const [order_product_quantity, setQuantity] = useState("");
  const [order_total, setTotal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}/orders`; // <-- orders table or new new orders table??
    const access_token = localStorage.getItem("access_token");

    const body = {
      order_customer,
      order_po,
      order_product,
      order_product_quantity: Number(order_product_quantity)
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
      <button type="submit" >
        Submit Order
      </button>
    </form>
  );
};

export default NewOrder;
