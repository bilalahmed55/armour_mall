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
import Shotgun from './components/categories/Shotgun.jsx';  // Import category components
import Rifles from './components/categories/Rifles.jsx';
import Pistols from './components/categories/Pistols.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import store from './app/store.js';
import {Provider} from 'react-redux'
import Cart from './components/Cart.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="addproduct" element={<AddProduct />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="categories/shotgun" element={<Shotgun />} />
      <Route path="categories/rifles" element={<Rifles />} />
      <Route path="categories/pistols" element={<Pistols />} />
      <Route path="product/:id" element={<ProductDetail />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
