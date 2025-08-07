import { useState } from 'react'
import {Routes, Route}  from 'react-router'

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

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/orders' >
          <Route index element={<Orders />} />
          <Route path=':orderId' element={<OrderDetails />} />
          <Route path='new' element={<NewOrder />} />
        </Route>
        <Route path='/customers' >
          <Route index element={<Customers />} />
          <Route path=':customerId' element={<CustomerProfile />} />
          <Route path='new' element={<NewCustomer />} />
        </Route>
        {/* <Route path='/inventory' >
          <Route index element={<Inventory />} />
          <Route path=':productId' element={<ProductDetails />} />
          <Route path='new' element={<NewProduct />} />
        </Route> */}
      </Routes>
      <Footer />
    </>
  )
}

export default App



        