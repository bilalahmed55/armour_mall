/* eslint-disable react/prop-types */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Home from './components/Home.jsx';
import AddProduct from './components/AddProduct.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
// import Shotgun from './components/categories/Shotgun.jsx';
// import Rifles from './components/categories/Rifles.jsx';
// import Pistols from './components/categories/Pistols.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import store from './app/store.js';
import { Provider } from 'react-redux';
import Cart from './components/Cart.jsx';
import Login from './components/Login.jsx';
import SIgnup from './components/SIgnup.jsx';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryProducts from './components/categories/CategoryProducts';
import ProductsContext from './components/ProductsContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={
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
      <Route path="categories/:category" element={
        <ProtectedRoute>
          <CategoryProducts />
        </ProtectedRoute>
      } />
      <Route path="product/:id" element={
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      } />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsContext>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ProductsContext>
    </AuthProvider>
  </StrictMode>
);
