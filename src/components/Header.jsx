import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Basic Order Management System</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inventory"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Inventory
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
