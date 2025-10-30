import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

import { fetchProducts } from "../../utils/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <p className="font-normal text-2xl text-sky-800">Loading products...</p>
    );

  if (error)
    return <p className="font-normal text-2xl text-red-500">{error}</p>;

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <div>
          <h2 className="font-bold text-5xl text-center text-zinc-800 mb-8">
            Product
          </h2>
          <div className="">
            <div className="flex flex-wrap gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
