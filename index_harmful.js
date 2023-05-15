const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const harmfulSchema = new mongoose.Schema({
  ingredients: {
    type: [String],
    required: true,
  },
});

const Harmful = mongoose.model("Harmful", harmfulSchema);

const harmfulIngredients = new Harmful({
  ingredients: [
    "Palm Oil",
    "Monosodium Glutamate",
    "Erythrosine",
    "Blue 1",
    "Red 40",
    "Yellow 5",
    "Yellow 6",
    "Sodium Nitrite",
    "Guar Gum",
    "High-Fructose Corn Syrup",
    "Carrageenan",
    "Sodium Benzoate",
  ].map((ingredient) => ingredient.toLowerCase()),
});

Harmful.insertMany(harmfulIngredients);
