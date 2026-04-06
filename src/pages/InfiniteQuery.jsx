import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

function InfiniteQuery() {
  const limit = 8;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", limit],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}`
      );
      const data = await res.json();
      return {
        products: data.products,
        nextOffset: pageParam + limit,
        total: data.total,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset >= lastPage.total ? undefined : lastPage.nextOffset,
    staleTime: 5000,
  });

  const products = data?.pages.flatMap((page) => page.products) || [];

  const loadMoreRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">My Store</h2>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-semibold">{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>

        {/* Loading trigger */}
        <div ref={loadMoreRef} className="h-10 mt-4 flex justify-center items-center">
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Scroll to load more"
            : "No more products"}
        </div>
      </div>
    </div>
  );
}

export default InfiniteQuery;