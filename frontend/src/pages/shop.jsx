import React, { useContext } from 'react';
import { ShopContext } from '../context/context';

const Shop = () => {
  const { products, addCart } = useContext(ShopContext);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button onClick={() => addCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export { Shop };
