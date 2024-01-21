// CartState.js
import { useState, useEffect } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem("cartState");
    return localData ? JSON.parse(localData) : [];
  });

  const [checkoutArr, setCheckoutArr] = useState(() => {
    const localData = localStorage.getItem("checkoutArr");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
    localStorage.setItem("checkoutArr", JSON.stringify(checkoutArr));
  }, [state, checkoutArr]);

  const addToCart = ({ id, imgUrl, title,description, price }) => {
    const existingProductIndex = state.findIndex((product) => product.id === id);

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update the quantity and isChecked
      const updatedCart = [...state];
      updatedCart[existingProductIndex].quantity += 1;
      updatedCart[existingProductIndex].isChecked = true; // Set isChecked to true
      setState(updatedCart);
    } else {
      // Product is not in the cart, add it with quantity 1 and isChecked true
      setState((prev) => [...prev, { id, imgUrl, title,description, price, quantity: 1, isChecked: true },]);
    }
  };

  const removeFromCart = ({ id }) => {
    const existingProductIndex = state.findIndex((product) => product.id === id);

    const updatedCart = [...state];

    if (existingProductIndex !== -1 && updatedCart[existingProductIndex].quantity === 1) {
      const filteredArr = state.filter((product) => product.id !== id);
      setState([...filteredArr]);
    } else if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity -= 1;
      // Note: Don't modify isChecked when decrementing quantity
      setState(updatedCart);
    }
  };

  const toggleCheckbox = ({ id }) => {
    const updatedCart = state.map((product) =>
      product.id === id ? { ...product, isChecked: !product.isChecked } : product
    );
    setState(updatedCart);
  };

  const filterCheckoutItemsArr = (array) => {
    const filteredCart = array.filter(eachItem => eachItem.isChecked === true);
    setCheckoutArr(filteredCart)
  }

  return (
    <CartContext.Provider value={{ state, checkoutArr, addToCart, removeFromCart, toggleCheckbox, filterCheckoutItemsArr }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;