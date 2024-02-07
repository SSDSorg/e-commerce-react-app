import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import LikedProducts from './components/LikedProducts';
import Cart from './components/Cart';
import Confirm from './components/Confirm';
import MyOrderlist from './components/MyOrderlist';

//context state
import CartState from './context/cart/CartState';
import Checkout from './components/Checkout';
import OrderDetailsPage from './components/OrderDetailspage';




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
          <Route path='/confirm' element={<Confirm/>}/>
          <Route path='/my-orders' element={<MyOrderlist/>}/>
          <Route path='/orders-details/:orderId' element={<OrderDetailsPage/>}/>
        </Routes>
      </BrowserRouter>
      </CartState>
    </div>
  );
}

  
export default App;
