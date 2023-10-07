const express = require("express");
require("dotenv").config();
const connection = require("./Config/db");
const { recipeRouter } = require("./Routes/recipe.routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Webledger Assignment Backend");
});

app.use("/recipe", recipeRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log("Unable to connect to database");
  }
  console.log("Server is running on port", process.env.port);
});
