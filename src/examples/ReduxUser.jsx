import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../services/redux/users/userThunks';
import { addUser, removeUser } from '../services/redux/users/userSlice';

const ReduxUser = () => {

// Use selector
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.users
  );

// Use effect to load data
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>User List</h2>

      <button
        onClick={() =>
          dispatch(
            addUser({
              id: Date.now(),
              name: 'New User',
              email: 'new@email.com',
            })
          )
        }
      >
        Add User
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {list.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReduxUser;