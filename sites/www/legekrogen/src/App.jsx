import { Routes, Route } from "react-router-dom";

import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
