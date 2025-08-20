import { Outlet, Link, Navigate } from 'react-router';
import  Footer  from '../components/Footer';
import  Header  from '../components/Header';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import'react';
import styles from './MainLayout.module.css';


const MainLayout = () => {
        return <div className={styles.appLayout}>
        <header className={styles.headerContent}>
            <div>
                <nav>
                    <SignedIn>
                        {/* <Link to="/orders">Orders</Link>
                        <Link to="/customers">Customers</Link>
                        <Link to="/inventory">Inventory</Link> */}
                        Active User<UserButton/>
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
