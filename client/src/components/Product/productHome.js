import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProdHeader from './prodHeader';
import Footer from '../Footer';

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://cuh-hub-server.vercel.app/api/products/all');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`https://cuh-hub-server.vercel.app/api/products/all?keyword=${searchQuery}`);
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`https://cuh-hub-server.vercel.app/api/products/all?category=${category}`);
      setSearchResults(response.data.products);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error filtering products by category:', error);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="shadow-md">
        <ProdHeader />
      </header>
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="flex-grow w-1/5 bg-white shadow-md p-4 border-r border-gray-200 overflow-y-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearchSubmit}
              className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Go
            </button>
          </div>
          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Categories</h3>
            <ul className="space-y-2">
              {['Laptop', 'Phone', 'Gadget', 'Footwear', 'Apparel', 'Bicycle'].map((category) => (
                <li key={category} className="cursor-pointer">
                  <p
                    onClick={() => handleCategoryClick(category)}
                    className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
                  >
                    {category}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Product Cards */}
        <div className="w-4/5 flex flex-col justify-between px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.length > 0 ? searchResults.map(product => (
              <ProductCard key={product._id} product={product} />
            )) : products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <footer className="mt-auto shadow-md">
        <Footer />
      </footer>
    </section>
  );
};

export default ProductHome;
