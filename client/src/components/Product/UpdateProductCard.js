import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductHeader from "./prodHeader";
import Footer from '../Footer';
import { toast, Toaster } from 'react-hot-toast';


const UpdateProduct = () => {
  const { prodId } = useParams(); // Extracting the prodId from the URL params
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    // Fetch product data by ID
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${prodId}`);
        setProduct(response.data.product);
      } catch (error) {
        toast.error('Error fetching product data');
      }
    };

    fetchProductData(); // Call fetchProductData when the component mounts
  }, [prodId]); // Fetch data whenever prodId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://cuh-hub-server.vercel.app/api/products/${prodId}`, product);
      toast.success('Product updated successfully:');
      // Redirect user to MyProducts page or any other desired page
    } catch (error) {
      toast.error('Error updating product');
    }
  };

  return (
    <section>
        <header>
            <ProductHeader />
        </header>
        <div className='h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold mb-2">Name:</label>
                <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className="border border-gray-400 rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-bold mb-2">Description:</label>
                <textarea id="description" name="description" value={product.description} onChange={handleChange} className="border border-gray-400 rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-bold mb-2">Price:</label>
                <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="border border-gray-400 rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-bold mb-2">Category:</label>
                <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="border border-gray-400 rounded w-full py-2 px-3" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Update Product</button>
            </form>
        </div>
        </div>    
        <footer>
            <Footer />
        </footer>
    </section>
    
  );
};

export default UpdateProduct;
