import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./router";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 30, // data stays fresh for 30 seconds
  //     gcTime: 1000 * 60 * 5, // unused cache kept for 5 minutes
  //     retry: 2, // retry failed requests twice
  //     refetchOnWindowFocus: false, // no surprise refetch on tab focus
  //   },
  // },
});

// React Query
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

// Redux
// function App() {
//   return (
//    <Provider store={store}>
//     <div style={{ padding: "2rem", fontFamily: "Arial" }}>
//         <h1>React Query Demo</h1>
//         <ReduxUser />
//     </div>
//   </Provider>
//   )
// }

// BASIC
// function App() {
//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial" }}>
//         <h1>React Query Demo</h1>
//         <BasicUserList />
//     </div>
//   )
// }

export default App;
