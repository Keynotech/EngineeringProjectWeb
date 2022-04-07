import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
body {
    margin:0;
    padding:0;
    font-family: 'Inter', sans-serif;
    font-size:14px;
    overflow:hidden;
}
p,header,h1,h2,h3,h4 {
    padding: 0;
    margin:0;
}
`
export default GlobalStyle
