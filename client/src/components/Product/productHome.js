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
        const response = await axios.get('http://localhost:8080/api/products/all');
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
      const response = await axios.get(`http://localhost:8080/api/products/all?keyword=${searchQuery}`);
      setSearchResults(response.data.products);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/all?category=${category}`);
      setSearchResults(response.data.products);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error filtering products by category:', error);
    }
  };

  return (
    <section className="flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <ProdHeader />
      </header>
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className="h-screen w-1/5 bg-gray-200 overflow-y-auto">
          {/* Search Bar */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 bg-white rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearchSubmit}
              className="bg-blue-500 text-white font-semibold py-2 px-4 ml-2 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Go
            </button>
          </div>
          {/* Product Categories */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Laptop')} className="text-blue-500 hover:underline">Laptop</p></li>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Phone')} className="text-blue-500 hover:underline">Phone</p></li>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Gadget')} className="text-blue-500 hover:underline">Gadget</p></li>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Footwear')} className="text-blue-500 hover:underline">Footwear</p></li>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Appearel')} className="text-blue-500 hover:underline">Appearel</p></li>
              <li className="mb-2 cursor-pointer"><p onClick={() => handleCategoryClick('Bicycle')} className="text-blue-500 hover:underline">Bicycle</p></li>
              {/* Add more categories as needed */}
            </ul>
          </div>
        </aside>
        {/* Product Cards */}
        <div className="w-full flex flex-col justify-between px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.length > 0 ? searchResults.map(product => (
              <ProductCard key={product._id} product={product} />
            )) : products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>        
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default ProductHome;