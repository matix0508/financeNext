import css from "styled-jsx/css";

import theme from "./theme";

export default css.global`
html,
body {
  padding: 0;
  margin: 0;
  background: ${theme.colors.background};
  color: ${theme.colors.onBackground};
  font-family: ${theme.fontFamily.sansSerif};
  min-height: 100vh;
}
ul {
  list-style: none;
}

#__next {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

footer {
  position: absolute;
  width: 100vw;
  bottom: 0;
  padding: 1rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.onPrimary};
  text-align: center;
  @include shadow;
}
`