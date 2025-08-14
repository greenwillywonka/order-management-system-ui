import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const NewOrder = () => {
    const [customer, setCustomer] = useState("");
    const [po, setPo] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = `${import.meta.env.VITE_API_URL}/orders`; // <-- orders table or new new orders table??
        const access_token = localStorage.getItem("access_token");

        const body = {
            customer,
            po,
            item,
            quantity: Number(quantity)
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
                    name="customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                />
            </label>
            <label>
                PO
                <input
                    type="text"
                    name="po"
                    value={po}
                    onChange={(e) => setPo(e.target.value)}
                />
            </label>
            <label>
                Product
                <input
                    type="text"
                    name="product"
                    value={product}
                    onChange={(e) => setItem(e.target.value)}
                />
            </label>
            <label>
                Quantity
                <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </label>
            <button type="submit" >
                Submit Order
            </button>
        </form>
    );
};

export default NewOrder;
