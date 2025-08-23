import { Outlet, NavLink, Navigate, useLocation } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === '/'; // only show on root

  return (
    <div className={styles.appLayout}>
      <header className={styles.headerContent}>
        <div className={styles.title}>Basic Order Management System</div> 
        <div>
          <nav className={styles.navLinks}>
            <SignedIn>
              <NavLink to="/orders" className={({ isActive }) => (isActive ? styles.active : undefined)}>Orders</NavLink>
              <NavLink to="/customers" className={({ isActive }) => (isActive ? styles.active : undefined)}>Customers</NavLink>
              <UserButton className={styles.userButton}/>
            </SignedIn>
          </nav>
        </div>
      </header>

      <main className={styles.appMain}>
        {isHome && (
          <div className={styles.frontPageContainer}>
            <h1 className={styles.mainTitle}>🚀 Welcome to Your Basic Order Management System!</h1>
            <h2 className={styles.mainSubtitle}>
              Manage all your orders and customer profiles in one easy-to-use app.
            </h2>

            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>📝</span>
                <h3>Orders Dashboard</h3>
                <p>Quickly track and create new orders with all the details you need.</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>👥</span>
                <h3>Customer Profiles</h3>
                <p>View and manage detailed profiles for each customer.</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>📊</span>
                <h3>Track Metrics</h3>
                <p>Automatically see total orders, last order date, and average order total for every customer.</p>
              </div>
            </div>

            <h3 className={styles.mainSubtitle}>
              Get started by clicking <strong>Orders</strong> or <strong>Customers</strong> above. Take a look around or create something new with the <strong>+ New Order</strong> or <strong>+ New Customer</strong> buttons inside!
            </h3>
          </div>
        )}

        <SignedOut>
          <Navigate to="/sign-in" replace/>
        </SignedOut>
        <SignedIn>
          <Outlet />
        </SignedIn>
      </main>
    </div>
  );
}

export default MainLayout;

