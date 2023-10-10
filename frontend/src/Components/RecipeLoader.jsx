import React from "react";
import loader from "../assets/loader.gif";

const RecipeLoader = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <img className="w-34 h-34" src={loader} alt="Cooking Loader" />
      </div>
    </div>
  );
};

export default RecipeLoader;
