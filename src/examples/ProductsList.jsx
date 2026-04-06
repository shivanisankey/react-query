import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function ProductsList() {
  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let url = `https://dummyjson.com/products`;
      const res = await fetch(url);
      const data = await res.json();
      return data.products;
    },

    // ✅ Caching & stale behavior
    staleTime: 5000, // Data is fresh for 5s, won’t refetch in background
    gcTime: 10000, // How long unused data stays in cache before garbage collection (10 sec)

    // ✅ Retry behavior
    // retry: 2,               // Number of retry attempts if query fails
    // retryDelay: attemptIndex => Math.min(5000 * 2 ** attemptIndex, 30000), // Exponential backoff

    // // ✅ Refetching behavior
    // refetchOnReconnect: false, // refetch when browser reconnects to internet
    // refetchInterval: 1000,           // auto refetch interval in ms (0 = disabled)

    // // ✅ Select & transform data // transform the data before returning to component
    // select: (data) =>
    //   data.map((product) => ({
    //     ...product,
    //     title: product.title.slice(0, 10),
    //   })),
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My store
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
