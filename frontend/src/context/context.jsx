import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const useShopData = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/products';

    axios
      .get(apiUrl)
      .then((response) => {
        const productData = response.data;
        setProducts(productData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return { products, cart };
};

export const ShopContextProvider = (props) => {
  const { products, cart } = useShopData();
  const [cartItems, setCartItems] = useState(cart);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) - 1,
    }));
  };

  const checkout = () => {
    setCartItems({});
  };

  const contextValue = { cartItems, addCart, removeCart, getTotalCartAmount, checkout };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
