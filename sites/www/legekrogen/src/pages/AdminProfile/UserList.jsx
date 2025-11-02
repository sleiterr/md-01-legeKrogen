import React, { useState, useEffect } from "react";

import { fetchUsers } from "../../utils/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data || []);
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
    <div className="">
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((u) => (
          <div className="" key={u._id} product={u}>
            <p>{u.name}</p>
            <p>{u.email}</p>
            <p>{u.role}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
