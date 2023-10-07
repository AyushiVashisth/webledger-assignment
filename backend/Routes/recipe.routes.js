const express = require("express");
const { RecipeModel } = require("../Model/recipe.model");
const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "UserId is required." });
    }
    const products = await RecipeModel.find({ userId: userId });
    res.status(200).json(products);
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

module.exports = { recipeRouter };
