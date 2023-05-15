const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;
const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://127.0.0.1:27017/";
const dbName = "Products";

app.get("/index.js", function (req, res) {
  res.set("Content-Type", "application/javascript");
  res.sendFile(__dirname + "/index.js");
});

app.get("/search.css", function (req, res) {
  res.set("Content-Type", "text/css");
  res.sendFile(__dirname + "/search.css");
});

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle request for product information
app.post("/product", (req, res) => {
  const productName = req.body.productName.trim().toLowerCase();
  MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then((client) => {
      const dbo = client.db(dbName);
      console.log("Connected to database");
      return dbo
        .collection("products")
        .findOne({ product_name: productName })
        .then((result) => {
          console.log("Product query result:", result);
          if (result) {
            console.log("Product found:", result.product_name);
            const ingredients = result.ingredients;
            console.log(ingredients);
            return dbo
              .collection("harmfuls")
              .findOne({})
              .then((doc) => {
                if (doc) {
                  const harmfulIngredients = doc.ingredients;
                  const harmfulSubstances = [];

                  harmfulIngredients.forEach((harmful) => {
                    if (ingredients.includes(harmful)) {
                      harmfulSubstances.push(harmful);
                    }
                  });

                  console.log(harmfulSubstances);
                  res.send({ harmfulSubstances });
                  return;
                } else {
                  res.send({ harmfulSubstances: [] });
                  return;
                }
              })
              .catch((err) => {
                console.error("Error finding harmful substances", err);
                res
                  .status(500)
                  .send({ error: "Unable to find harmful substances" });
                return;
              });
          } else {
            res.send({ error: "Product not found" });
            console.log("Product not found:", productName);
            return;
          }
        });
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
      res.status(500).send({ error: "Unable to connect to database" });
      return;
    });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
