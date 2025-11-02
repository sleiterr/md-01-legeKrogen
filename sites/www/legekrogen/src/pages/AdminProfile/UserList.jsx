import React, { useState, useEffect } from "react";

import { fetchUsers } from "../../utils/api";
import { DashBoardUsers } from "./DashBoardUsers";
import { UsersTable } from "./UsersTable";
import { UsesTableHeader } from "./UsesTableHeader";
import { UserTableRow } from "./UserTableRow";

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
    <div className="w-full">
      <DashBoardUsers label="Users Dashboard">
        <UsersTable
          headers={
            <>
              <UsesTableHeader>picture</UsesTableHeader>
              <UsesTableHeader>Name</UsesTableHeader>
              <UsesTableHeader align="center">Email</UsesTableHeader>
              <UsesTableHeader align="center">Role</UsesTableHeader>
              <UsesTableHeader align="center">Actions</UsesTableHeader>
              <UsesTableHeader align="center">Remove</UsesTableHeader>
            </>
          }
        >
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <UserTableRow>
                  <img
                    src={
                      u.picture
                        ? `http://localhost:5000${u.picture}`
                        : "/users/no-user.jpg"
                    }
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/users/no-user.jpg";
                    }}
                  />
                </UserTableRow>
                <UserTableRow>{u.name}</UserTableRow>
                <UserTableRow>{u.email}</UserTableRow>
                <UserTableRow>{u.role}</UserTableRow>
                <UserTableRow>Edit</UserTableRow>
                <UserTableRow>Delete</UserTableRow>
              </tr>
            ))
          )}
        </UsersTable>
      </DashBoardUsers>
    </div>
  );
};

export default UserList;
