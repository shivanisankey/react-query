import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./Mutation.css";

const API_URL = "http://localhost:3000/posts";

const Mutation = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  // 🔷 FETCH POSTS
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error fetching");
      return res.json();
    },
  });

  // 🔷 ADD (Optimistic)
  const addMutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Add failed");
      return res.json();
    },

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old = []) => [newPost, ...old]);

      return { previous };
    },

    onError: (err, newPost, context) => {
      queryClient.setQueryData(["posts"], context.previous);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // 🔷 DELETE (Optimistic)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previous = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (old = []) =>
        old.filter((p) => p.id !== id),
      );
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["posts"], context.previous);
    },
  });

  // 🔷 HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title: name,
    };

    addMutation.mutate(newPost, {
      onSuccess: () => {
        setName(""); // clear only on success
      },
      onError: () => {
        // ❗ keep input value if failed
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="posts-container">
      <h2>📋 Posts</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {addMutation.isError && <p className="error">❌ Add failed</p>}

      {isError && <p className="error">Error loading data</p>}

      {posts.map((post) => (
        <div key={post.id} className="card2">
          <div>{post?.title}</div>

          <button
            className="delete"
            onClick={() => deleteMutation.mutate(post.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Mutation;
