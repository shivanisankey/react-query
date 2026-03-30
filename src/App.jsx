import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RQDemoComponent from './RQDemoComponent'
import Users from './Users'

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>React Query Demo</h1>
        <Users />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  )
}

export default App
