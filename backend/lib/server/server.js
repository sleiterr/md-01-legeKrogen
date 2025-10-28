require("dotenv").config();
// Miljøvariabler
dotenv.config({ path: "../../.env.local" });

const express = require("express");

const connectDB = require("./db/db.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");

// Forbind til MongoDB
connectDB();

const app = express();

// Middleware: parse JSON i body
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server køre på port ${PORT}`));
console.log("MONGO_URI =", process.env.MONGO_URI);

export default app;

module.exports = app;
