import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProdHeader from './prodHeader';
import Footer from '../Footer';

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
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
              <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Laptop</a></li>
              <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Footwear</a></li>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from './ProductCard';
// import ProdHeader from './prodHeader';
// import Footer from '../Footer';

// const ProductHome = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let url = 'http://localhost:8080/api/products/all';
//         if (searchQuery) {
//           url += `?keyword=${searchQuery}`;
//         }
//         const response = await axios.get(url);
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, [searchQuery]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <section className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header>
//         <ProdHeader />
//       </header>
//       <div className="flex-grow flex">
//         {/* Sidebar */}
//         <aside className="h-screen w-1/5 bg-gray-200 overflow-y-auto">
//           {/* Search Bar */}
//           <div className="p-4">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full py-2 px-4 bg-white rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </div>
//           {/* Product Categories */}
//           <div className="p-4">
//             <h3 className="text-lg font-semibold mb-4">Categories</h3>
//             <ul>
//               <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Laptop</a></li>
//               <li className="mb-2"><a href="#" className="text-blue-500 hover:underline">Footwear</a></li>
//               {/* Add more categories as needed */}
//             </ul>
//           </div>
//         </aside>
//         {/* Product Cards */}
//         <div className="w-full flex flex-col justify-between px-4 py-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products.map(product => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>        
//         </div>
//       </div>
//       <footer>
//         <Footer />
//       </footer>
//     </section>
//   );
// };

// export default ProductHome;
