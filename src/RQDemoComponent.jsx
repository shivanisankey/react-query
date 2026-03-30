// RQDemoComponent.js
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Function to fetch paginated posts using fetch
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageParam}`
  );

  if (!response.ok) {
    throw new Error("Network Error: Unable to fetch posts.");
  }

  const data = await response.json();

  return {
    data,
    nextPage: data.length ? pageParam + 1 : undefined,
  };
};

const RQDemoComponent = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5000,
    retry: 2,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Infinite Scroll Posts</h2>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : isError ? (
        <div>
          <p style={{ color: "red" }}>{error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      ) : (
        <div>
          {data.pages
            .flatMap((page) => page.data)
            .map((post) => (
              <div
                key={post.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </div>
            ))}

          {hasNextPage && (
            <button
              onClick={loadMore}
              disabled={isFetchingNextPage}
              style={{ padding: "10px", marginTop: "10px" }}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          )}

          {!hasNextPage && <p>No more posts to load.</p>}
        </div>
      )}
    </div>
  );
};

export default RQDemoComponent;