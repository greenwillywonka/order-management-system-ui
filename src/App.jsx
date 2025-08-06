import { useState } from 'react'
import {Routes, Route}  from 'react-router'

import MainLayout from './layouts/MainLayout'
import Orders from './pages/Orders'
import Header from './components/Header'
import Footer from './components/Footer'

import Customers from './pages/Customers'
import Inventory from './pages/Inventory'

import OrderDetails from './pages/OrderDetails'
import CustomerProfile from './pages/CustomerProfile'
import ProductDetails from './pages/ProductDetails'

function App() {
  
  return (
    <>
      <h1>Basic Order Management System</h1>
      <Header />
      <Routes>
        <Route element={<Header />} >
          <Route path='/orders' element={<Orders />} />
          {/* <Route path='/orders/:orderId' element={<OrderDetails />} /> */}
          <Route path='/customers' element={<Customers />} />
          {/* <Route path='/customers/:customerId' element={<CustomerProfile />} /> */}
          <Route path='/inventory' element={<Inventory />} />
          {/* <Route path='/inventory/:productId' element={<ProductDetails />} /> */}
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
