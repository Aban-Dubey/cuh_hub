import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-70 h-74"> {/* Adjust the width and height */}
      <img
        src={product.images[0].url}
        alt={product.name}
        className="w-full h-37 object-cover object-center"
      />
      <div className="p-4">
        <Link to={`/product/${product._id}`} className="text-gray-800 font-semibold text-lg mb-2 block">
          {product.name}
        </Link>
        <p className="text-gray-700 font-semibold">Rs {product.price}</p>
        <p className="text-gray-600 text-xs">Category: {product.category}</p>
        {/* You can add more product details here */}
      </div>
    </div>
  );
};

export default ProductCard;

