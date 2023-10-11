import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import RecipeLoader from "./RecipeLoader";
import { useNavigate } from "react-router-dom";
import ViewRecipe from "../pages/ViewRecipe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";

function stripHTML(htmlString) {
  let doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
}

const ProductCard = ({ userId, setRecipeCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    console.log("recipe", recipe);
    localStorage.setItem("recipe", JSON.stringify(recipe));
    navigate("/viewrecipe");
  };

  const Base_url =
    "https://api.spoonacular.com/recipes/random?number=15&apiKey=314bdb33d153438382752a4c252635e6";

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
      .then((res) => {
        setData(res.data.recipes);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      });
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipe(searchKeyword, selectedDiet);
  };

  const updateRecipeCount = () => {
    axios
      .get(`https://recipe-webledger-api.onrender.com/recipe?userId=${userId}`)
      .then((res) => {
        setRecipeCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postRecipe = (recipeData) => {
    console.log("id", recipeData.id);
    const dataToPost = {
      userId: userId,
      title: recipeData.title,
      extendedIngredients: recipeData.extendedIngredients || [],
      instructions: recipeData.instructions,
      readyInMinutes: recipeData.readyInMinutes,
      servings: recipeData.servings,
      cuisines: recipeData.cuisines || [],
      diets: recipeData.diets || [],
      image: recipeData.image,
      dishTypes: recipeData.dishTypes || [],
      author: recipeData.sourceName,
      summary: recipeData.summary,
      fontColor: recipeData.fontColor || "defaultColor",
      source: recipeData.sourceName,
      occasions: recipeData.occasions || []
    };

    try {
      axios({
        method: "post",
        url: "https://recipe-webledger-api.onrender.com/recipe",
        data: dataToPost,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          console.log(
            "post userId",
            response.data.newRecipe.userId,
            response.data
          );
          localStorage.setItem("userId", response.data.newRecipe.userId);
          toast.success(response.data.msg);
          updateRecipeCount();
        })

        .catch((error) => {
          console.log(error.message);
          toast.error("Error posting data");
        });
    } catch (error) {
      console.log(error.message);
      toast.error("Error posting data");
    }
  };

  const toggleFavorite = (recipe) => {
    const index = favorites.findIndex((fav) => fav.id === recipe.id);
    if (index === -1) {
      setFavorites([...favorites, recipe]);
      postRecipe(recipe);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div className="bg-white p-4">
      <div className="container mx-auto mt-20">
        <form
          onSubmit={handleSearch}
          className="md:w-[80%] w-full max-w-screen-md m-auto bg-gray-400 p-2 rounded-lg shadow-md text-black bg-opacity-20 backdrop-blur-lg drop-shadow-lg mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-grow w-full sm:w-1/2">
              <input
                type="text"
                placeholder="Search for recipes..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="p-3 border border-white rounded-lg w-full focus:outline-none focus:border-blue-200"
              />
            </div>
            <div className="flex-grow w-full sm:w-1/4">
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="p-3 border border-white rounded-lg w-full focus:outline-none focus:border-blue-200 text-black"
              >
                <option value="">Select Diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="glutenFree">Gluten-Free</option>
              </select>
            </div>
            <div className="w-full sm:w-auto flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-blue-900 p-3 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-100 hover:text-white flex gap-4"
              >
                Search
                <FiSearch size={24} />
              </button>
            </div>
          </div>
        </form>

        {isLoading ? (
          <RecipeLoader />
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
                  <div className="absolute top-4 left-2 text-xs">
                    {el.vegetarian && (
                      <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                        <i className="fas fa-leaf"></i> Vegetarian
                      </span>
                    )}
                    {el.vegan && (
                      <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                        <i className="fas fa-seedling"></i> Vegan
                      </span>
                    )}
                    {el.glutenFree && (
                      <span className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs">
                        <i className="fas fa-bread-slice"></i> Gluten-Free
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="absolute bottom-[50%] right-4 border-white border-2 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(el);
                  }}
                >
                  <FaHeart
                    size={26}
                    color={
                      favorites.some((fav) => fav.id === el.id)
                        ? "red"
                        : "white"
                    }
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-xl sm:text-xl lg:text-xl line-clamp-2 font-semibold text-red-700 mb-2 h-14">
                    {el.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3 text-md">
                    {stripHTML(el.summary)}
                  </p>
                  <div className=" items-right justify-center text-right">
                    <button
                      className="text-blue-700 hover:underline text-center sm:text-left hover:font-bold mb-2 sm:mb-0 text-sm"
                      onClick={() => handleViewRecipe(el)}
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedRecipe && <ViewRecipe />}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ProductCard;
