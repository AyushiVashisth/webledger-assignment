import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHeart, FiLogOut } from "react-icons/fi";

const Navbar = ({ recipeCount, setRecipeCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(recipeCount);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <nav className="bg-red-500 let-400-500 shadow-md p-4 border-b-2 border-red-500">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-blue-700">
            Recipe Hub
          </Link>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-500 transition duration-300 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex space-x-6 text-gray-600">
              <Link
                to="/wishlist"
                className="hover:text-blue-500 transition duration-300"
              >
                <span className="relative">
                  <FiHeart size={30} /> 
                  {recipeCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 text-xs w-4">
                      {recipeCount}
                    </span>
                  )}
                </span>
              </Link>
            </div>
            <button
              className="bg-red-500 text-white hover:bg-red-600 rounded-full py-2 px-4 hover:shadow-md transition duration-300 border-2 border-red-600"
              onClick={handleLogout}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link
                  to="/wishlist"
                  className="block hover:text-blue-500 transition duration-300"
                >
                  <FiHeart size={20} />
                  {recipeCount > 0 && (
                    <span className="absolute top-12 left-7 bg-blue-500 text-white rounded-full p-1 text-xs w-4">
                      {recipeCount}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <button
                  className="block bg-red-300 text-white hover:bg-red-600 rounded-full py-1 px-2 hover:shadow-md transition duration-300 w-auto text-center border-2 border-red-600"
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
