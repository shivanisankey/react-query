import React from "react";
import { useQueries } from "@tanstack/react-query";
import "./Parallel.css";

function Parallel() {
  const fetchData = async (url, name) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${name} API failed (${res.status})`);
    }

    return res.json();
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["products-data"],
        queryFn: () =>
          fetchData("https://dummyjson.com/products?limit=5", "Products"),
        retry: 1,
        staleTime: 0,
      },
      {
        queryKey: ["users-data"],
        queryFn: () =>
          fetchData("https://dummyjson.com/users?limit=5", "Users"),
        retry: 1,
        staleTime: 0,
      },
    ],
  });

  const [productsQuery, usersQuery] = results;

  return (
    <div className="container1">
      <h1 className="title">📊 Dashboard</h1>

      <div className="grid">
        {/* 🔷 Products */}
        <div className="card">
          <h2>🛒 Products</h2>

          {productsQuery.isLoading && <p>Loading...</p>}

          {productsQuery.isError && (
            <div>
              <p>❌ {productsQuery.error.message}</p>
              <button onClick={productsQuery.refetch}>Retry</button>
            </div>
          )}

          {productsQuery.data?.products?.map((product) => (
            <div key={product.id} className="item">
              {product.title}
            </div>
          ))}
        </div>

        {/* 🔷 Users */}
        <div className="card">
          <h2>👤 Users</h2>

          {usersQuery.isLoading && <p>Loading...</p>}

          {usersQuery.isError && (
            <div>
              <p>❌ {usersQuery.error.message}</p>
              <button onClick={usersQuery.refetch}>Retry</button>
            </div>
          )}

          {usersQuery.data?.users?.map((user) => (
            <div key={user.id} className="item">
              {user.firstName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Parallel;
