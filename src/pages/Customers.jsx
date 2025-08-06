const Customers = () => {
  return (
    <div>
      <h1>Customers Dashboard</h1>
        <p>Manage your customers here.</p>
        <button>Add Customer</button>
        <table>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {/* Customer rows will go here */}
            </tbody>
        </table>
    </div>
  );
}

export default Customers;