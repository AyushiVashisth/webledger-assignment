import React from "react";
import { GiBroccoli, GiWheat, GiKnifeFork } from "react-icons/gi";
import { FaClock, FaUsers, FaDollarSign } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";

const ViewRecipe = () => {
  const selectedRecipe = JSON.parse(localStorage.getItem("recipe"));
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRecipe = () => {
      axios
        .get(
          `https://recipe-webledger-api.onrender.com/recipe?userId=${userId}`
        )
        .then((res) => {
          setRecipeCount(res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchRecipe();
  }, []);

  return (
    <>
      <Navbar recipeCount={recipeCount} setRecipeCount={setRecipeCount} />
      <div className="bg-gray-100 min-h-screen p-4 md:p-8 mt-16">
        <div className="container mx-auto">
          {selectedRecipe ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Recipe Image */}
                <div className="w-full h-64 md:h-80 object-cover object-center overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Dietary Labels */}
                <div className="absolute top-4 right-4 space-y-2">
                  {selectedRecipe.vegetarian && (
                    <div className="flex items-center text-green-500">
                      <GiBroccoli className="h-6 w-6 mr-1" />
                      Vegetarian
                    </div>
                  )}
                  {selectedRecipe.vegan && (
                    <div className="flex items-center text-blue-500">
                      <GiKnifeFork className="h-6 w-6 mr-1" />
                      Vegan
                    </div>
                  )}
                  {selectedRecipe.glutenFree && (
                    <div className="flex items-center text-yellow-500">
                      <GiWheat className="h-6 w-6 mr-1" />
                      Gluten-Free
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Recipe Title */}
                <h1 className="text-4xl font-bold mb-4 text-purple-700">
                  {selectedRecipe.title}
                </h1>

                {/* Summary */}
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Summary
                  </h2>
                  <p
                    className="text-gray-700 text-lg leading-7 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: selectedRecipe.summary
                    }}
                  />
                </div>

                {/* Recipe Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                      Details
                    </h2>
                    <ul className="list-disc pl-4 text-lg leading-7">
                      <li className="flex items-center">
                        <FaClock className="inline-block mr-2 text-gray-600" />
                        Preparation Time: {
                          selectedRecipe.preparationMinutes
                        }{" "}
                        minutes
                      </li>
                      <li className="flex items-center">
                        <FaClock className="inline-block mr-2 text-gray-600" />
                        Cooking Time: {selectedRecipe.cookingMinutes} minutes
                      </li>
                      <li className="flex items-center">
                        <FaUsers className="inline-block mr-2 text-gray-600" />
                        Servings: {selectedRecipe.servings}
                      </li>
                      <li className="flex items-center">
                        <FaDollarSign className="inline-block mr-2 text-gray-600" />
                        Price Per Serving: $
                        {selectedRecipe.pricePerServing.toFixed(2)}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                      Nutritional Information
                    </h2>
                    <ul className="list-disc pl-4 text-lg leading-7">
                      <li>Calories: {selectedRecipe.calories}</li>
                      <li>Protein: {selectedRecipe.protein}g</li>
                      <li>Fat: {selectedRecipe.fat}g</li>
                    </ul>
                  </div>
                </div>

                {/* Recipe Ingredients */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Ingredients
                  </h2>
                  <ul className="list-disc pl-4 text-lg leading-7">
                    {selectedRecipe.extendedIngredients.map(
                      (ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                      )
                    )}
                  </ul>
                </div>

                {/* Recipe Instructions */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Instructions
                  </h2>
                  <div
                    className="text-lg leading-7 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: selectedRecipe.instructions
                    }}
                  />
                </div>

                {/* Source and Credits */}
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">
                    Source and Credits
                  </h2>
                  <p className="text-lg leading-7">
                    {selectedRecipe.creditsText}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-2xl font-semibold text-gray-900">
              No recipe selected
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ViewRecipe;
