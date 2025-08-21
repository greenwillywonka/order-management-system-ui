import { useState } from 'react'
import {Routes, Route}  from 'react-router'
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import  ClerkProviderWithRoutes  from './auth/ClerkProviderWithRoutes'

import MainLayout from './layouts/MainLayout'

import Header from './components/Header'
import Footer from './components/Footer'

import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Inventory from './pages/Inventory'

import OrderDetails from './pages/OrderDetails'
import NewOrder from './pages/NewOrder'
import NewCustomer from './pages/NewCustomer'
import CustomerProfile from './pages/CustomerProfile'
import ProductDetails from './pages/ProductDetails'
import NewProduct from './pages/NewProduct'
import { AuthenticationPage } from './pages/AuthenticationPage'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  
  return (
    <>
    <ClerkProviderWithRoutes publishableKey={PUBLISHABLE_KEY}>
      <Routes>
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        <Route path="/sign-up" element={<AuthenticationPage />} />
        <Route path='/' element={<MainLayout />}>
          <Route path='/orders' >
            <Route index element={<Orders />} />
            <Route path=':id' element={<OrderDetails />} />
            <Route path='new' element={<NewOrder />} />
          </Route>
          <Route path='/customers' >
            <Route index element={<Customers />} />
            <Route path=':id' element={<CustomerProfile />} />
            <Route path='new' element={<NewCustomer />} />
          </Route>
          <Route path='/inventory' >
            <Route index element={<Inventory />} />
            <Route path=':id' element={<ProductDetails />} />
            <Route path='new' element={<NewProduct />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </ClerkProviderWithRoutes>
    </>
  )
}

export default App



        