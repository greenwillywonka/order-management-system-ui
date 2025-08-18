// import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router";
// const [myValue, setMyValue] = useState("")


// const OrderDetails = () => {
//   const [order_customer, setCustomer] = useState(""); // set customer or setOrder_Customer?
//   const [order_po, setPo] = useState("");
//   const [order_product, setProduct] = useState("");
//   const [order_product_quantity, setQuantity] = useState("");
//   const [order_total, setTotal] = useState("");
//   const navigate = useNavigate();


// useEffect(() => {
//   const getData = async () => {
//     const data = await fetch(url).then((response) => response.json());

//     setMyValue(data.myValue)
//   };
//   getData();
// }, [setMyValue]);


// return (
//       <form method="POST" onSubmit={handleSubmit}>
//       <label>
//         Customer
//         <input
//           type="text"
//           name="order_customer"
//           value={order_customer.myValue}
//           onChange={(e) => setCustomer(e.target.value)}
//         />
//       </label>
//       <label>
//         PO
//         <input
//           type="text"
//           name="order_po"
//           value={order_po.myValue}
//           onChange={(e) => setPo(e.target.value)}
//         />
//       </label>
//       <label>
//         Product
//         <input
//           type="text"
//           name="order_product"
//           value={order_product.myValue}
//           onChange={(e) => setProduct(e.target.value)}
//         />
//       </label>
//       <label>
//         Quantity
//         <input
//           type="number"
//           min="1"
//           name="order_product_quantity"
//           value={order_product_quantity.myValue}
//           onChange={(e) => setQuantity(e.target.value)}
//         />
//       </label>
//       <label>
//         Total
//         <input
//           type="number"
//           name="order_total"
//           value={order_total.myValue}
//           onChange={(e) => setTotal(e.target.value)}
//         />
//       </label>
//       <button type="submit" >
//         Submit Order
//       </button>
//     </form>
// )
// }


// sean gave me this code to use as a template for the OrderDetails page


// import { useState, useEffect } from 'react';
// const [myValue, setMyValue] = useState("")


//  useEffect(() => {
//    const getData = async () => {
//      const data = await fetch(url).then((response) => response.json());

//      setMyValue(data.someValue)
//    };
//    getData();
//  }, [setMyValue]);


// return (
//   <form>
//     <input value={myValue} onChange={(e) => setMyValue(e.target.value)}/>
//    </form>
//  )



//  original code below

// const OrderDetails = () => {
//   return (
//     <div>
//       <h1>Order Details</h1>
//       <form>


//       </form>
//     </div>
//   );
// };

// export default OrderDetails;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const OrderDetails = () => {
  const { id } = useParams(); // order ID from URL
  const navigate = useNavigate();

  // state variables for each field
  const [order_customer, setCustomer] = useState("");
  const [order_po, setPo] = useState("");
  const [order_product, setProduct] = useState("");
  const [order_product_quantity, setQuantity] = useState("");
  const [order_total, setTotal] = useState("");

  // fetch order when component loads
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${id}`;
        const access_token = localStorage.getItem("access_token");

        const response = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const data = await response.json();

        // populate state with API data
        setCustomer(data.order_customer);
        setPo(data.order_po);
        setProduct(data.order_product);
        setQuantity(data.order_product_quantity);
        setTotal(data.order_total);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  // handle submit (update order)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}/orders/${id}`;
    const access_token = localStorage.getItem("access_token");

    const body = {
      order_customer,
      order_po,
      order_product,
      order_product_quantity: Number(order_product_quantity),
      order_total: Number(order_total),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT", // or PATCH depending on your API
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await response.json();
      console.log("Order Updated: ", data);
      navigate("/orders");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        Customer
        <input
          type="text"
          value={order_customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </label>

      <label>
        PO
        <input
          type="text"
          value={order_po}
          onChange={(e) => setPo(e.target.value)}
        />
      </label>

      <label>
        Product
        <input
          type="text"
          value={order_product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </label>

      <label>
        Quantity
        <input
          type="number"
          min="1"
          value={order_product_quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>

      <label>
        Total
        <input
          type="number"
          value={order_total}
          onChange={(e) => setTotal(e.target.value)}
        />
      </label>

      <button type="submit">Update Order</button>
    </form>
  );
};

export default OrderDetails;
