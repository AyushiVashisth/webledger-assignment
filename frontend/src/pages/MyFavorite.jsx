import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import RecipeLoader from "../Components/RecipeLoader";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyFavorite = ({ userId }) => {
  console.log("1", userId);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    let userId = location.state ? location.state.userId : null;
    if (!userId) {
      userId = localStorage.getItem("userId");
      console.log("userId", userId);
    }

    const fetchRecipe = () => {
      console.log("userId: " + userId);
      axios
        .get(
          `https://recipe-webledger-api.onrender.com/recipe?userId=${userId}`
        )
        .then((res) => {
          setData(res.data);
          setRecipeCount(res.data.length);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
    };

    fetchRecipe();
  }, [location.state]);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(
        `https://recipe-webledger-api.onrender.com/recipe/${recipeId}`
      );

      setRecipeCount(recipeCount - 1);
      toast.success("Recipe deleted successfully", {
        position: "top-right",
        autoClose: 3000
      });
      setData(data.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      setError(error);
      toast.error("An error occurred while deleting the recipe", {
        position: "top-right",
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <Navbar recipeCount={recipeCount} setRecipeCount={setRecipeCount} />
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <RecipeLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((recipe) => (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform scale-100 hover:scale-105">
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-64 object-cover transition-transform transform scale-100 hover:scale-105"
                    />
                    <div className="absolute top-5 left-2">
                      {recipe.diets && recipe.diets.length > 0 && (
                        <div className="flex flex-wrap">
                          {recipe.diets.map((diet, index) => (
                            <span
                              key={index}
                              className="mr-1 bg-blue-800 text-white px-2 py-2 rounded-lg text-xs"
                            >
                              {diet}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                    <h2 className="sm:text-3xl md:text-2xl lg:text-xl line-clamp-2 text-2xl font-semibold mb-2 h-16 text-red-700">
                        {recipe.title}
                      </h2>
                      <button
                        onClick={() => handleDelete(recipe._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">
                      <span className="text-gray-900 mb-2 font-semibold">
                        Ingredients:{" "}
                      </span>
                      {recipe.extendedIngredients &&
                        recipe.extendedIngredients.map((ingredient, index) => (
                          <span key={ingredient.id}>
                            {ingredient.name}
                            {index !== recipe.extendedIngredients.length - 1 &&
                              ", "}
                          </span>
                        ))}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="text-gray-900 mb-2 font-semibold">
                        Dish Type:{" "}
                      </span>
                      {recipe.dishTypes &&
                        recipe.dishTypes.map((dishType, index) => (
                          <span key={index}>
                            {dishType}
                            {index !== recipe.dishTypes.length - 1 && ", "}
                          </span>
                        ))}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="text-gray-900 mb-2 font-semibold">
                        Instructions:{" "}
                      </span>
                      <div
                        className="text-gray-700 leading-7 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: recipe.instructions
                        }}
                      />
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="text-gray-900 mb-2 font-semibold">
                        Summary:{" "}
                      </span>
                      <div
                        className="text-gray-700 leading-7 line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: recipe.summary
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center mt-4">
              An error occurred. Please try again later.
            </div>
          )}
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default MyFavorite;
