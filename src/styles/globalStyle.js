import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root{
  --dark: #000;
  --light: #fff;
  --primary: #237948;
  --secondary: #044FA1;
  --border: #e0e0e0;
  --disabled: #e0e0e0;
  --error:#f70404;
  --protected: #f2c1c1;
  --primary-color-font: #bcbcbc;
  --secondary-color-font: #595959;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-size: 1rem;
  vertical-align: baseline;
  }


  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

`;

export default GlobalStyle;
