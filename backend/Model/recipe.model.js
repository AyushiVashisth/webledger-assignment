const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  userId: String,
  title: String,
  extendedIngredients: Array,
  instructions: String,
  readyInMinutes: Number,
  servings: Number,
  cuisines: Array,
  diets: Array,
  image: String,
  dishTypes: Array,
  author: String,
  summary: String,
  fontColor: String,
  source: String,
  occasions: Array
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = { RecipeModel };
