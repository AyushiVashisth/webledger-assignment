import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/GoogleAccount";
import { FiMenu, FiHeart, FiLogOut } from "react-icons/fi";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { useEffect } from "react";

const Home = ({ userId }) => {
  const { googleAccount, setGoogleAccount } = useContext(AccountContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [recipeCount, setRecipeCount] = useState(0);
  console.log("recipeCount", recipeCount);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setGoogleAccount(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    console.log("userId: " + userId);

    const fetchRecipe = () => {
      axios
        .get(
          `https://recipe-webledger-api.onrender.com/recipe?userId=${userId}`
        )
        .then((res) => {
          console.log("recipe", res.data.length);
          setRecipeCount(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchRecipe();
  }, [userId]);

  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="fixed z-10 w-full top-0 bg-red-500 let-400-500 shadow-md p-4 border-b-2 border-red-500">
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
                to="/myfavorite"
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
              className="bg-red-500 text-white hover:bg-red-600 rounded-full py-2 px-4 hover:shadow-md transition duration-300 border-2 border-red-600"
              onClick={handleLogout}
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link
                  to="/myfavorite"
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
      <ProductCard userId={userId} setRecipeCount={setRecipeCount} />
      <Footer />
    </div>
  );
};

export default Home;
