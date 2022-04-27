import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { useSelector } from "react-redux"
import { ThemeProvider } from "styled-components"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import lightTheme from "./styles/lightTheme"
import darkTheme from "./styles/darkTheme"
import GlobalStyle from "./styles/globalStyle"
import Navigation from "./components/navigation/Navigation"

const queryClient = new QueryClient()

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode === true ? darkTheme : lightTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <GlobalStyle />
          <Navigation />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
