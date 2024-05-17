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
    image: null, // Store the file object here
  });
  const [uploadStatus, setUploadStatus] = useState({
    buttonText: 'Upload Image',
    buttonColor: 'bg-blue-500',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Check if the input is for the image file
    if (name === 'image' && files.length > 0) {
      // Get the first file from the list (assuming single file upload)
      const file = files[0];

      // Update formData with the file object
      setFormData({ ...formData, [name]: file });

      // Change button text and color after successful upload
      setUploadStatus({
        buttonText: 'Uploaded',
        buttonColor: 'bg-green-500',
      });
    } else {
      // For other inputs, update the formData as usual
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display a loading toast
    const loadingToast = toast.loading('Creating...', {
      duration: 1000, // Set the duration to 1000 milliseconds (1 second)
    });

    try {
      // Convert the image file to base64
      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      reader.onloadend = async () => {
        // Create a data URL from the base64 encoded image
        const base64Image = reader.result;

        // Prepare the form data to send
        const dataToSend = {
          ...formData,
          user: user,
          // Replace the image file with the base64 encoded image
          images: [{ url: base64Image }], // Update images array with base64Image
        };

        // Send the data to the server
        const response = await axios.post('https://cuh-hub-server.vercel.app/api/products/new', dataToSend);
        toast.success('Product added successfully');
      };
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Product cannot be added');
    } finally {
      // Close the loading toast when the request is complete
      toast.dismiss(loadingToast);
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
          <div className="mb-4 flex items-center">
            <label className="block text-sm font-bold mr-2" htmlFor="image">Image:</label>
            <input
              className="hidden"
              type="file"
              id="image"
              name="image"
              accept="image/*" // Accept only image files
              onChange={handleChange}
              required
            />
            <label
              htmlFor="image"
              className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer ${uploadStatus.buttonColor}`}
            >
              {uploadStatus.buttonText}
            </label>
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