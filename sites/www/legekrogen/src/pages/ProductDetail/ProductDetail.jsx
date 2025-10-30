import React, { useState, useEffect } from "react";
import { fetchProductById } from "../../utils/api";
import { useParams } from "react-router-dom";

const Contact = () => {
  const { id } = useParams();
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="py-[8rem] mx-auto md:max-w-7xl">
        <div className="">
          <h2 className="font-normal text-4xl text-center text-zinc-800 mb-8">
            Product details
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <img src={product.image} alt={product.name} />
          <div className="">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} грн</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
