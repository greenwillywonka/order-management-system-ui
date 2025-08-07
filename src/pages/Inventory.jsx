import { Link } from "react-router";

const Inventory = () => {
  return (
    <>
    <div className="Inventory">
      <h1>Inventory Management Dashboard</h1>  
      <p>Manage your inventory items here.</p>
        <Link to="/inventory/new">New Item </Link>
        <table>
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {/* Inventory item rows will go here */}
            </tbody>
        </table>
    </div>
    </>
  )
};

export default Inventory;