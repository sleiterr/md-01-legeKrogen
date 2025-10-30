const BASE_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error loading products");
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};
