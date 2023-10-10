const express = require("express");
const { RecipeModel } = require("../Model/recipe.model");
const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }
    const recipes = await RecipeModel.find({ userId: userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

recipeRouter.post("/", async (req, res) => {
  try {
    const newRecipe = new RecipeModel({
      ...req.body,
      userId: req.body.userId
    });

    await newRecipe.save();
    res.status(201).json({ msg: "Recipe added successfully!", newRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

recipeRouter.delete("/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const deletedrecipe = await RecipeModel.findByIdAndRemove(recipeId);
    if (!deletedrecipe) {
      return res.status(404).json({ error: "recipe not found" });
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = { recipeRouter };