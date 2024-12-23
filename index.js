const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/product.model.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:nwZryigmXzgLBwRF@backenddb.quc6e.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("connection error"));

//message test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// add to db
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get product by id
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update product by id
app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let updatedProduct = await Product.findById(productId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Delete product by id
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
