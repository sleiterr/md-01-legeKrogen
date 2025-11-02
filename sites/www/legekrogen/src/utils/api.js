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

const USER_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => {
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  const res = await fetch(USER_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error loading users");
  }

  const data = await res.json();
  return data.users || [];
};

export const fetchUsersById = async (id) => {
  const token = localStorage.getItem("token")?.replace(/"/g, "");

  const res = await fetch(`${USER_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Product not found");
  }

  return res.json();
};
