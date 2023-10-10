import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/GoogleAccount";
import { FiMenu, FiHeart, FiLogOut } from "react-icons/fi";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";

const Home = ({ userId }) => {
  const { googleAccount, setGoogleAccount } = useContext(AccountContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setGoogleAccount(null);
    localStorage.removeItem("userId");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-red-500 let-400-500 shadow-md p-4 border-b-2 border-red-500">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-blue-700">
            Recipe Hub
          </Link>
          {/* Hamburger Menu for Mobile */}
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
                <FiHeart size={20} /> {/* Favorites icon */}
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full border-2 border-blue-500"
                src={googleAccount.picture}
                alt="profile"
              />
              <h1 className="text-lg font-semibold text-gray-800">
                {googleAccount.name}
              </h1>
            </div>
            <button
              className="bg-red-500 text-white hover:bg-red-600 rounded-full py-2 px-4 hover:shadow-md transition duration-300"
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
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                    src={googleAccount.picture}
                    alt="profile"
                  />
                  <h1 className="text-base font-semibold text-gray-800">
                    {googleAccount.name}
                  </h1>
                </div>
              </li>
              <li>
                <button
                  className="block bg-red-300 text-white hover:bg-red-600 rounded-full py-1 px-2 hover:shadow-md transition duration-300 w-auto text-center border-4 border-red-800"
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <ProductCard userId={userId} />

      <Footer />
    </div>
  );
};

export default Home;
