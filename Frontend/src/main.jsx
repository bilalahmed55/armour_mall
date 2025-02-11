/* eslint-disable react/prop-types */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import AddProduct from './components/AddProduct.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Shotgun from './components/categories/Shotgun.jsx';
import Rifles from './components/categories/Rifles.jsx';
import Pistols from './components/categories/Pistols.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import store from './app/store.js';
import { Provider } from 'react-redux';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import SIgnup from './components/SIgnup.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<App />}>
        <Route path="home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SIgnup />} />
        <Route path="addproduct" element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="categories/shotgun" element={
          <ProtectedRoute>
            <Shotgun />
          </ProtectedRoute>
        } />
        <Route path="categories/rifles" element={
          <ProtectedRoute>
            <Rifles />
          </ProtectedRoute>
        } />
        <Route path="categories/pistols" element={
          <ProtectedRoute>
            <Pistols />
          </ProtectedRoute>
        } />
        <Route path="product/:id" element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        } />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
