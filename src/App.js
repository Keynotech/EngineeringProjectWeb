/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { useSelector } from "react-redux"
import { ThemeProvider } from "styled-components"
import light from "./styles/light"
import dark from "./styles/dark"
import GlobalStyle from "./styles/GlobalStyle"
import Navigation from "./navigation/Navigation"
import useWindowDragDetect from "./hooks/useWindowDragDetect"

function App() {
  const queryClient = new QueryClient()

  const isDarkMode = useSelector((state) => state.theme.isDarkMode)
  useWindowDragDetect()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode === true ? dark : light}>
        <GlobalStyle />
        <Navigation />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
