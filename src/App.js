import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import GlobalStyle from "./styles/globalStyle"
import Navigation from "./components/Navigation/Navigation"
import store from "./app/store/store"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Navigation />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
