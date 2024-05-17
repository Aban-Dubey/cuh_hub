import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyProductCard from './MyProductCard';
import ProductHeader from './prodHeader';
import Footer from '../Footer';
import { toast, Toaster } from 'react-hot-toast';


const MyProducts = () => {
  // State to store products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from the backend
    const fetchProductsData = async () => {
      try {
        const response = await axios.get('https://cuh-hub-server.vercel.app/api/user/getUserById/66249b881dd0e4e10f8fd95f');
        setProducts(response.data.products);
      } catch (error) {
        toast.error('Error fetching products data');
      }
    };

    fetchProductsData(); // Call the fetchProductsData function when the component mounts
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      // Delete the product from the backend
      await axios.delete(`https://cuh-hub-server.vercel.app/api/products/${productId}`);
      toast.success("Product deleted successfully")
      // Update the products state after successful deletion
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <section className="min-h-screen">
      <header>
        <ProductHeader />
      </header>
      <div className="container mx-auto py-8">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h2 className="text-3xl text-center mb-8">My Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <MyProductCard key={product._id} product={product} onDelete={handleDeleteProduct} />
          ))}
        </div>
      </div>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </section>
  );
};

export default MyProducts;