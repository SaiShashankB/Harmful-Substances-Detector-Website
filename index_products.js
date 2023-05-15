const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const products = [
  {
    product_name: "Nutella",
    ingredients: [
      "sugar",
      "palm oil",
      "hazelnut",
      "skim milk powder",
      "fat-reduced cocoa",
      "soy lecithins",
      "vanillin",
    ],
  },
  {
    product_name: "Coca-cola",
    ingredients: [
      "carbonated water",
      "sugar",
      "coloring",
      "e150d",
      "acidifier",
      "phosphoric acid",
      "plant extracts",
      "caffeine",
    ],
  },
  {
    product_name: "Pickles",
    ingredients: [
      "mango",
      "vinegar",
      "salt",
      "garlic",
      "turmeric",
      "dill oil",
      "yellow 5",
      "Sodium benzoate",
    ],
  },
];

const lowerCasedProducts = products.map((product) => {
  const lowerCasedIngredients = product.ingredients.map((ingredient) =>
    ingredient.toLowerCase()
  );

  return {
    ...product,
    product_name: product.product_name.toLowerCase(),
    ingredients: lowerCasedIngredients,
  };
});

Product.insertMany(lowerCasedProducts);
