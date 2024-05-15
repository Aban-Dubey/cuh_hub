import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaUser, FaPowerOff } from 'react-icons/fa';
import logo from '../assets/logo.png';


const Header = () => {
  const navigate = useNavigate();
  
  //Logout user component
  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/');
}
  return (
    <header className="flex items-center justify-between p-4 relative" style={{ background: 'linear-gradient(135deg, #97594C, #CFA68A)', maxHeight: '5rem' }}>
      <div className="flex items-center text-lg font-medium text-white">
        <img src={logo} alt='logo' style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: 'cover', marginRight: '1rem' }} />
        <span className="text-2xl font-bold" style={{ color: "#3E271E" }}>Unleash Your Voice</span>
      </div>

      <nav className="flex items-center space-x-6">
        <Link to="/bloghome" className="text-lg font-medium text-white hover:text-gray-300 transition duration-300 ease-in-out">Home</Link>
        <Link to="/prodhome" className="text-lg font-medium text-white hover:text-gray-300 transition duration-300 ease-in-out">Product Home</Link>
        <Link to="/myblogs" className="text-lg font-medium text-white hover:text-gray-300 transition duration-300 ease-in-out">My Blogs</Link>
        <Link to="/profile" className="hover:text-gray-300 transition duration-300 ease-in-out">
          <FaUser className="text-xl text-white hover:text-gray-300" />
        </Link>
        <Link to="/addblog" className="hover:text-gray-300 transition duration-300 ease-in-out">
          <FaPlus className="text-xl text-white hover:text-gray-300" />
        </Link>
        <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300 ease-in-out focus:outline-none">
          <FaPowerOff className="text-xl text-white hover:text-gray-300" />
        </button>
      </nav>
    </header>


  );
};

export default Header;
