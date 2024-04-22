import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // If you are using react-router for navigation
import { FaPlus, FaUser, FaPowerOff } from 'react-icons/fa'; // Assuming you are using react-icons for icons

const Header = () => {
  const navigate = useNavigate();
  
  //Logout user component
  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/');
}
  return (
    /*<header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Thought Thread</div>
      <div className="flex items-center space-x-4">
        <Link to="/bloghome" className="hover:text-gray-400">
          Home
        </Link>
        <Link to="/myblogs" className="hover:text-gray-400">
          My Blogs
        </Link>
        <Link to="/profile" className="hover:text-gray-400">
          <FaUser />
        </Link>
        <Link to="/addblog" className="hover:text-gray-400">
          <FaPlus />
        </Link>
        <Link onClick={handleLogout} className="hover:text-gray-400">
          <FaPowerOff />
        </Link>
      </div>
    </header> */
    /*<header className="flex items-center justify-between p-4" style={{ background: 'linear-gradient(135deg, #97594C, #CFA68A)' }}>
    <div className="text-2xl font-bold text-white">Thought Thread</div>
    <nav className="flex items-center space-x-6">
        <Link to="/bloghome" className="hover:text-gray-300 transition duration-300 ease-in-out">Home</Link>
        <Link to="/myblogs" className="hover:text-gray-300 transition duration-300 ease-in-out">My Blogs</Link>
        <Link to="/profile" className="hover:text-gray-300 transition duration-300 ease-in-out">
            <FaUser className="text-xl text-white" />
        </Link>
        <Link to="/addblog" className="hover:text-gray-300 transition duration-300 ease-in-out">
            <FaPlus className="text-xl text-white" />
        </Link>
        <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300 ease-in-out focus:outline-none">
            <FaPowerOff className="text-xl text-white" />
        </button>
    </nav>
</header> */
<header className="flex items-center justify-between p-4" style={{ background: 'linear-gradient(135deg, #97594C, #CFA68A)' }}>
<div className="text-3xl font-bold text-white">Cuh-Hub</div>
<nav className="flex items-center space-x-6">
    <Link to="/bloghome" className="text-lg font-medium text-white hover:text-gray-300 transition duration-300 ease-in-out">Home</Link>
    <Link to="/myblogs" className="text-lg font-medium text-white hover:text-gray-300 transition duration-300 ease-in-out">My Blogs</Link>
    <Link to="/profile" className="hover:text-gray-300 transition duration-300 ease-in-out">
        <FaUser className="text-xl text-white" />
    </Link>
    <Link to="/addblog" className="hover:text-gray-300 transition duration-300 ease-in-out">
        <FaPlus className="text-xl text-white" />
    </Link>
    <button onClick={handleLogout} className="hover:text-gray-300 transition duration-300 ease-in-out focus:outline-none">
        <FaPowerOff className="text-xl text-white" />
    </button>
</nav>
</header>







  );
};

export default Header;
