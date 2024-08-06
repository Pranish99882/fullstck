import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar bg-blue-500 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <p className="flex items-center">
          <img src="../img/logo.jpg" alt="MYAPP Logo" className="h-16 w-auto" />
        </p>
        <nav className="hidden md:flex">
          <div className="nav-links flex gap-4">
            <Link to="/register" className="hover:text-gray-300">Register</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/edit_profile" className="hover:text-gray-300">Profile</Link>
            <Link to="/user_listing" className="hover:text-gray-300">Users</Link>
          </div>
        </nav>
        {/* Hamburger menu */}
        <div className="hamburger md:hidden flex flex-col items-center justify-center cursor-pointer" onClick={toggleMenu}>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
        </div>
      </div>
      {/* Mobile navigation links */}
      <nav className={`nav-links-mobile bg-blue-500 text-white md:hidden fixed top-16 left-0 w-full py-4 text-center ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <Link to="/register" className="block py-2 hover:bg-blue-600">Register</Link>
        <Link to="/login" className="block py-2 hover:bg-blue-600">Login</Link>
        <Link to="/edit_profile" className="block py-2 hover:bg-blue-600">Profile</Link>
        <Link to="/user_listing" className="block py-2 hover:bg-blue-600">Users</Link>
      </nav>
    </header>
  );
};

export default Navbar;
