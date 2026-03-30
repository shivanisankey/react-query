import React, { useEffect, useState } from 'react';
import { fetchUsersAPI } from '../services/API/api';

const BasicUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users using API layer
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersAPI();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Add user (local)
  const addUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'New User',
      email: 'new@email.com',
    };
    setUsers((prev) => [...prev, newUser]);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h2>User List</h2>

      <button onClick={addUser}>Add User</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BasicUserList;