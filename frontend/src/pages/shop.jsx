import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/context';
import './shop.css'; // Import the CSS file for styling

const Shop = () => {
  const { products, addCart } = useContext(ShopContext);

  useEffect(() => {
    console.log('Products:', products);
  }, [products]);

  if (!products || products.length === 0) return <div>Loading...</div>;

  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img className="product-img" src={product.image} alt={product.title} />
          <div className="product-info">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button className="addToCartBttn" onClick={() => addCart(product.id)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
