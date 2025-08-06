const Inventory = () => {
  return (
    <>
      <h1>Inventory Management Dashboard</h1>  
      <p>Manage your inventory items here.</p>
        <button>Add Item</button>
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
    </>
  )
};

export default Inventory;