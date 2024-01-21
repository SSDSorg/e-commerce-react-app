import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import LikedProducts from './components/LikedProducts';
import Cart from './components/Cart';

//context state
import CartState from './context/cart/CartState';
import Checkout from './components/Checkout';


function App() {
  return (
    <div className="app-bg-container">
      <CartState>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path='/liked-products' element={<LikedProducts/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
      </CartState>
    </div>
  );
}

  
export default App;
