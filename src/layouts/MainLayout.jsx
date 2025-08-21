import { Outlet, NavLink, Navigate } from 'react-router';
import  Footer  from '../components/Footer';
import  Header  from '../components/Header';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import'react';
import styles from './MainLayout.module.css';


const MainLayout = () => {
        return <div className={styles.appLayout}>
        <header className={styles.headerContent}>
           <div className={styles.title}>Basic Order Management System</div> 
            <div>
                <nav>
                    <SignedIn>
                        <NavLink to="/orders" className={({ isActive }) => (isActive ? styles.active : undefined)}>Orders</NavLink>
                        <NavLink to="/customers" className={({ isActive }) => (isActive ? styles.active : undefined)}>Customers</NavLink>
                        {/* <NavLink to="/inventory" className={({ isActive }) => (isActive ? styles.active : undefined)}>Inventory</NavLink> */}
                        <UserButton className={styles.userButton}/>
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main className={styles.appMain}>
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>
    </div>
}

export default MainLayout;
