import { useState } from 'react'
import './App.css'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux'
import { store } from './services/redux/store'
import ReduxUser from './examples/ReduxUser';
import RQUserList from './examples/RQUserList';
import BasicUserList from './examples/BasicUserList';

const queryClient = new QueryClient();

// React Query
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>React Query Demo</h1>
        <RQUserList />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  )
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

export default App
