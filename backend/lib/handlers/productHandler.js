// Importer producter fra JSON-fil
const products = require("../../data/products.json");
// Importere Product modellen fra MongoDB
const Product = require("../db/Product");

//Get all producter
const getProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

// Get produkt via ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product ikke fundet" });
};

// POST importer producter fra JSON-fil
const importProducts = async (req, res) => {
  // Sletter alle producter fra JSON-filen
  await Product.deleteMany();
  const created = await Product.insertMany(products);
  res.status(201).json(created);
};

// POST opret et nyt produkt
const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  // POST opret et nyt produkt baseret på request body
  const newProduct = new Product({ name, price, description, image });
  // Gemmer produktet i databaser
  const saved = await newProduct.save();
  res.satus(201).json(saved);
};

// PUT opdater produkt
const updateProduct = async (req, res) => {
  // Finder og opdaterer produkt med ID fra request, returnerer den opdaterede version
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updated) res.json(updated);
  else res.status(404).json({ message: "Produkt ikke fundet" });
};

// DELETE produkt
const deleteProduct = async (req, res) => {
  // Finder produkt med ID
  const product = await Product.findById(req.params.id);
  if (product) {
    //Hvis product findes, slet det
    await product.remove();
    res.json({ message: "Produkt slette" });
  } else res.status(404).json({ message: "Product ikke fundet" });
};

// Eksport alle functioner som modul (CommonJS)
module.exports = {
  getProducts,
  getProductById,
  importProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
