import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const MyProductCard = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      onDelete(product._id);
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="md:flex">
        {/* Product Image */}
        {product.images && product.images.length > 0 && (
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={product.images[0].url} alt="Product" />
          </div>
        )}
        <div className="p-8 flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.name}</div>
            {/* Product Description */}
            <p className="mt-2 text-gray-500">{product.description}</p>
            {/* Product Price */}
            <p className="mt-2 text-gray-500">Price: Rs {product.price}</p>
          </div>
          {/* Buttons */}
          <div className="flex mt-4">
            <Link to={`/updateproduct/${product._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded">
              Update
            </Link>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductCard;