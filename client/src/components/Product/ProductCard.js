import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border-gray-200 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 mb-8">
      <div className="w-full h-60 bg-white flex items-center justify-center">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-white">
        <Link
          to={`/product/${product._id}`}
          className="text-gray-900 font-semibold text-xl mb-2 block hover:text-blue-500 transition duration-200"
        >
          {product.name}
        </Link>
        <p className="text-gray-700 font-semibold text-lg">Rs {product.price}</p>
        <p className="text-gray-500 text-sm">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
