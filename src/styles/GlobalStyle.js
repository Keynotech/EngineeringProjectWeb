import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

html {
    -webkit-tap-highlight-color: transparent;
}

body {
    background: ${({ theme }) => theme.background};
    margin:0;
    padding:0;
    overflow:hidden;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Apple Color Emoji,Helvetica,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol;
    font-size:14px;
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.2s cubic-bezier(0,0,.58,1);
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
input, input:focus, textarea {
    outline: none;
    border:0;
    margin:0;
    padding:0;
    background:transparent;
}
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

* {
    box-sizing: border-box;
}

`

export default GlobalStyle
