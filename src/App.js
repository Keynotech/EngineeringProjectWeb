import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import GlobalStyle from "./styles/globalStyle"
import Today from "./pages/App/Today/Today"
import Inbox from "./pages/App/Inbox/Inbox"
import AppLayout from "./components/layout/AppLayout"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="/today" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
            <Route path="/today" element={<Today />} />
            <Route path="/inbox" element={<Inbox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
