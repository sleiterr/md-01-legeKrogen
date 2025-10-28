require("dotenv".config());
const express = require("express");

const connectDB = require(".db/db.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const productroutes = require("../routes/productRoutes.js");

// Miljøvariabler
dotenv.config({ path: "../../.env.local" });

// Forbind til MongoDB
connectDB();

const app = express();

// Middleware: parse JSON i body
app.use(express.json());

// Routes
app.use("api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

PORT = 5000;
app.listen(PORT, () => console.log(`Server køre på port ${PORT}`));

export default app;

module.exports = app;
