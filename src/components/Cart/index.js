import './index.css';
import { useState, useEffect, useContext } from 'react';
import cartContext from '../../context/cart/cartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const navigate = useNavigate();
  const cartDetailsFromContext = useContext(cartContext);

  const CartItem = (props) => {
    const { cartItem, removeFromCart } = props;
    const { id, title, description, imgUrl, quantity, price, isChecked } = cartItem;
    
    const handleDecrement = () => {
      if (quantity > 1) {
        cartDetailsFromContext.removeFromCart({ id });
      }
    };

    return (
      <li className='cart-page__cart-items'>
        <input
          type="checkbox"
          name={title}
          checked={isChecked}
          onChange={() => cartDetailsFromContext.toggleCheckbox({ id })}
        />
        <img className='cart-page__product-img' src={imgUrl} alt="product img" />
        <div className='cart-page__product-item-details-wrapper'>
          <p className='cart-page__product-title'>{title}</p>
          <p className='cart-page__product-description'>{description}</p>
          <p className='cart-page__product-description'>Price: ${price}</p>
          <p className='cart-page__product-description'>quantity: {quantity}</p>
          <p className='cart-page__product-description'>subtotal: {quantity * price}</p>
          <div className='cart-buttons'>
            <button
              type="button"
              className="cart-page__cart-item-decrement-btn"
              onClick={handleDecrement}
            >
              -
            </button>
            <p className="cart-page__cart-item-title">{quantity}</p>
            <button
              type="button"
              className="cart-page__cart-item-increment-btn"
              onClick={() => cartDetailsFromContext.addToCart({ id, imgUrl, title })}
            >
              +
            </button>

          </div>
        </div>
        <button
          type="button"
          className="cart-page__delete-item-btn"
          onClick={() => cartDetailsFromContext.removeFromCart({ id })}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    )

  }
  const handleOnclickCheckout = () => {
    cartDetailsFromContext.filterCheckoutItemsArr(cartDetailsFromContext.state)
    navigate('/checkout');
  }

  // The following JSX code represents a section of a React component rendering a list of cart items.
  return (
    <div className='cart-page__bg-container'>
      <h1>Cart Items</h1>
      <ul className="cart-page__cart-items-wrapper">
        {cartDetailsFromContext.state.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} removeFromCart={cartDetailsFromContext.removeFromCart} />
        ))}
      </ul>

      <button type="button" onClick={() => handleOnclickCheckout()}>
        Checkout
      </button>


    </div>
  )
}


export default Cart;