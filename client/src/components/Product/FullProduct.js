import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProdHeader from './prodHeader';
import Footer from '../Footer';

function FullProduct() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(response.data.product);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product || !user) {
    return <div>Loading...</div>;
  }

  const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username;

  return (
    <section>
      <header>
        <ProdHeader />
      </header>
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="max-w-3xl mx-auto flex bg-white rounded-lg">
          <div className="w-1/2 m-4">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-1/2 px-4 flex-col justify-end mt-12">
            <p className="text-gray-600 text-sm font-bold mt-2">Owner: {userName}</p>
            <p className="text-gray-600 text-xs mt-2">Category: {product.category}</p>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            <p className="text-gray-700 font-semibold mt-2">Price: Rs {product.price}</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Wishlist
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Chat
              </button>
            </div>       
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </section>
    
  );
}

export default FullProduct;