import { Outlet, Link, Navigate } from 'react-router';
import  Footer  from '../components/Footer';
import  Header  from '../components/Header';
import'react';


const MainLayout = () => {
        return <div className="app-layout">
        <header>
            <div className="header-content">
                <nav>
                    <SignedIn>
                        <Link to="/orders">Orders</Link>
                        <Link to="/customers">Customers</Link>
                        <Link to="/inventory">Inventory</Link>
                        <UserButton/>
                    </SignedIn>
                </nav>
            </div>
        </header>

        <main className="app-main">
            <SignedOut>
                <Navigate to="/sign-in" replace/>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </main>
    </div>
}








// original code below:
//     return (
//         <>
//             <Header />
//             <main>
//             <Outlet />
//             </main>
//             <Footer />
//         </>
//     );
// };

export default MainLayout;


// from app.jsx:
// function App() {
  
//   return (
//     <>
//     <ClerkProviderWithRoutes>
//       <Header />
//       <Routes>
//         <Route path='/orders' >
//           <Route index element={<Orders />} />
//           <Route path=':id' element={<OrderDetails />} />
//           <Route path='new' element={<NewOrder />} />
//         </Route>
//         <Route path='/customers' >
//           <Route index element={<Customers />} />
//           <Route path=':customerid' element={<CustomerProfile />} />
//           <Route path='new' element={<NewCustomer />} />
//         </Route>
//         <Route path='/inventory' >
//           <Route index element={<Inventory />} />
//           <Route path=':inventoryid' element={<ProductDetails />} />
//           <Route path='new' element={<NewProduct />} />
//         </Route>
//       </Routes>
//       <Footer />
//     </ClerkProviderWithRoutes>
//     </>
//   )
// }