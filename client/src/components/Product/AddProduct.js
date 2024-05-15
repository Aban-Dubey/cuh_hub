import React, { useState } from 'react';
import axios from 'axios';
import ProductHeader from './prodHeader';
import Footer from '../Footer';
import { toast, Toaster } from 'react-hot-toast';

const AddProduct = () => {
        const user = localStorage.getItem('userId');
        const [formData, setFormData] = useState({
          name: '',
          description: '',
          price: '',
          category: '',
          images: [],
        });
      
        const handleChange = (e) => {
            const { name, value } = e.target;
          
            // Check if the input is for the image URL
            if (name === 'image') {
              // Create a new image object with the URL and append it to the images array
              const newImage = { url: value };
              setFormData({ ...formData, images: [...formData.images, newImage] });
            } else {
              // For other inputs, update the formData as usual
              setFormData({ ...formData, [name]: value });
            }
          };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                console.log(formData);
                const dataToSend = { ...formData, user: user };
                const response = await axios.post('http://localhost:8080/api/products/new', dataToSend);
                toast.success('Product added successfully');
            } catch (error) {
              toast.error('Product cannot be updated');
            }
          };

  return (
    <section>
        <header>
            <ProductHeader />
        </header>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <input
                className="border border-gray-400 rounded w-full py-2 px-3"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="description">Description:</label>
            <textarea
                className="border border-gray-400 rounded w-full py-2 px-3"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="price">Price:</label>
            <input
                className="border border-gray-400 rounded w-full py-2 px-3"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="category">Category:</label>
            <input
                className="border border-gray-400 rounded w-full py-2 px-3"
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="image">Image URL:</label>
            <input
              className="border border-gray-400 rounded w-full py-2 px-3"
              type="text"
              id="image"
              name="image"
              value={formData.image} // Keep value as a single URL input
              onChange={handleChange}
              required
            />
          </div>
            <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            type="submit"
            >
            Add Product
            </button>
        </form>
        </div>
        <footer>
            <Footer />
        </footer>
    </section>
    
  );
};

export default AddProduct;
