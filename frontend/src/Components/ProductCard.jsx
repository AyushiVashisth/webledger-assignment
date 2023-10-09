import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
function stripHTML(htmlString) {
  let doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
}

const ProductCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const Base_url =
    "https://api.spoonacular.com/recipes/random?number=15&apiKey=5c518d49481941d4a8f204a0680f05f9";

  const fetchRecipe = (keyword = "", diet = "") => {
    setIsLoading(true);
    let url = `${Base_url}`;

    if (keyword) {
      url += `&query=${keyword}&titleMatch=true`;
    }

    if (diet) {
      url += `&${diet}=true`;
    }

    axios
      .get(url)
      .then((res) => setData(res.data.recipes))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipe(searchKeyword, selectedDiet);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <form
          onSubmit={handleSearch}
          className="md:w-[50%] w-[50%] m-auto bg-blue-700 p-6 rounded-lg shadow-md text-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search for recipes..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="p-3 border border-white rounded-lg w-full focus:outline-none focus:border-blue-200"
              />
            </div>
            <div className="flex-grow">
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="p-3 border border-white rounded-lg w-full focus:outline-none focus:border-blue-200"
              >
                <option value="">Select Diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="glutenFree">Gluten-Free</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="bg-white text-blue-900 p-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-100 hover:text-white"
              >
                <FiSearch size={24} />
              </button>
            </div>
          </div>
        </form>

        {isLoading ? (
          <p className="text-2xl text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((el) => (
              <div
                key={el.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="relative">
                  <img
                    src={el.image}
                    alt={el.title}
                    className="w-full h-64 object-cover transition-transform transform scale-100 hover:scale-105"
                  />
                  <div className=" bg-opacity-80 backdrop-blur-lg font-bold drop-shadow-lg absolute top-2 left-2 bg-blue-800 text-white px-2 py-2 rounded-md">
                    {el.vegetarian && (
                      <span className="mr-2">
                        <i className="fas fa-leaf"></i> Vegetarian
                      </span>
                    )}
                    {el.vegan && (
                      <span className="mr-2">
                        <i className="fas fa-seedling"></i> Vegan
                      </span>
                    )}
                    {el.glutenFree && (
                      <span>
                        <i className="fas fa-bread-slice"></i> Gluten-Free
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-red-700 mb-2 h-14 text-center">
                    {el.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-4">
                    {stripHTML(el.summary)}
                  </p>
                  <div className="flex items-center justify-between ">
                    <button className="text-blue-700 hover:underline text-left hover:font-bold">
                      View Recipe
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors duration-300">
                      Add to Favorites
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;