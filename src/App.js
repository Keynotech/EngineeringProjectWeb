import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import GlobalStyle from "./styles/globalStyle"
import Navigation from "./components/navigation/Navigation"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Navigation />
    </QueryClientProvider>
  )
}

export default App
