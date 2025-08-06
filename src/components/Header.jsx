import { Link } from 'react-router';
// import { useAuth } from '../AuthContext';

import styles from './Header.module.css';

const Header = () => {
    // const { isAuth } = useAuth();

    return (
        <header>
            <h1>Basic Order Management System</h1>
            <nav>
                <ul>
                    <>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    <li><Link to='/inventory'>Inventory</Link></li>
                    </>
                </ul>
            </nav>
        </header>
    )
};

export default Header;