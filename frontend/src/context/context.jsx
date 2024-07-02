import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

export const useShopData = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const apiUrl = 'https://fakestoreapi.com/products';

    try {
      const response = await axios.get(apiUrl);
      const productData = response.data;

      console.log('Received products:', productData); // Log received products

      setProducts(productData); // Update local state with fetched products
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, cart, setCart, fetchProducts };
};

export const ShopContextProvider = (props) => {
  const { products, cart, setCart } = useShopData();
  const [cartItems, setCartItems] = useState({});

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === parseInt(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
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

  const contextValue = { cartItems, addCart, removeCart, getTotalCartAmount, checkout, products, setCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
