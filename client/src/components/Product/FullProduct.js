import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProdHeader from './prodHeader';
import Footer from '../Footer';
import { toast, Toaster } from 'react-hot-toast';

function FullProduct() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://cuh-hub-server.vercel.app/api/products/${productId}`);
        setProduct(response.data.product);
        setUser(response.data.user);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Show loading indicator if data is being fetched
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  if (!product || !user) {
    return <div>Loading...</div>;
  }

  const userName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username;

  // Function to handle chat button click
  const handleChatButtonClick = () => {
    if (!user.mobile) {
      toast.error("Owner does not have a verified mobile number.");
      return;
    }
  
    // WhatsApp Web URL with phone number and message
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${user.mobile}&text=Hello%20${userName},%20I%20am%20interested%20in%20your%20product:%20${product.name}`;
    
    // Open WhatsApp Web in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="h-screen">
      <header>
        <ProdHeader />
      </header>
      <div className="container mx-auto px-4 py-8 h-screen">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
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
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleChatButtonClick}>
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
