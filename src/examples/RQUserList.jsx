import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsersAPI } from '../services/API/api';

const RQUserList = () => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsersAPI,
    staleTime: 30000,  
    gcTime: 10000,
  });

//   // Add user (local simulation)
//   const addUserMutation = useMutation({
//     mutationFn: async (newUser) => newUser,
//     onSuccess: (newUser) => {
//       queryClient.setQueryData(['users'], (old = []) => [
//         ...old,
//         newUser,
//       ]);
//     },
//   });

//   // Delete user
//   const deleteUserMutation = useMutation({
//     mutationFn: async (userId) => userId,
//     onSuccess: (userId) => {
//       queryClient.setQueryData(['users'], (old = []) =>
//         old.filter((u) => u.id !== userId)
//       );
//     },
//   });

  return (
    <div>
      <h2>User List</h2>

      <button
        // onClick={() =>
        //   addUserMutation.mutate({
        //     id: Date.now(),
        //     name: 'New User',
        //     email: 'new@email.com',
        //   })
        // }
      >
        Add User
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading users</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RQUserList;