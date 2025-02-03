import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import ProductsContext from './components/ProductsContext';

function App() {
  return (
    <ProductsContext>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
    </ProductsContext>
  );
}

export default App;
