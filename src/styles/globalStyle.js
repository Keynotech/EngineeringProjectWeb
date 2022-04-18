import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
body {
    background: ${({ theme }) => theme.background};
    margin:0;
    padding:0;
    overflow:hidden;
    font-family: 'Inter', sans-serif;
    font-size:14px;
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.5s cubic-bezier(0,0,.58,1);
}

h1,h2,h3, header,p, a, a:link, a:active, a:visited, a:hover {
    padding: 0;
    margin:0;
    text-decoration:none;
    color: ${({ theme }) => theme.textPrimary}
}

button {
    background: none;
    border:0;
    padding: 0;
    cursor: pointer;
    color: ${({ theme }) => theme.textPrimary}
}

input, input:focus {
    outline: none;
    border: 1px solid;
    border-radius: 2px;
    padding: 5px;
}
`

export default GlobalStyle
