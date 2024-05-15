import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaPlus, FaUser, FaPowerOff, FaHeart } from 'react-icons/fa';

const ProdHeader = () => {
  const navigate = useNavigate();
  //Logout user component
  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/');
}

  return (
    <nav className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Cuh Hub Logo" className="bg-white w-14 h-14 mr-2" />
          <h1 className="text-2xl font-semibold">Cuh Hub</h1>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/prodhome" className="hover:text-gray-300">Home</Link></li>
          <li>
            <Link to="/bloghome" className="hover:text-gray-300">Blog Home</Link>
          </li>
          <li><Link to="/myproducts" className="hover:text-gray-300">My Products</Link></li>
          <li><Link to="#" className="hover:text-gray-300"><FaHeart className="text-xl text-white hover:text-gray-300" /></Link></li>
          <li><Link to="/addproduct" className="hover:text-gray-300"><FaPlus className="text-xl text-white hover:text-gray-300" /></Link></li>
          <li>
            <Link to="/profile" className="hover:text-gray-300 transition duration-300 ease-in-out">
            <FaUser className="text-xl text-white hover:text-gray-300" />
            </Link>
          </li>
          
          <li onClick={handleLogout}><Link to="/logout" className="hover:text-gray-300"><FaPowerOff className="text-xl text-white hover:text-gray-300" /></Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default ProdHeader;


