import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme } from "./Theme";
import Router from "./Router";

// TODO: import web font to global.
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  h1,
  h2,
  p {
    color: ${(props) => props.theme.textColor};
  }
`;

const ThemeToggler = styled.button`
  position: fixed;
  background-color: transparent;
  bottom: 3rem;
  left: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  appearene: none;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  border: 2px solid ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 2rem auto 0;
  padding: 0 1rem;
  display: grid;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState);
  };
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
        <GlobalStyle />
        <Wrapper>
          <Router />
          <ThemeToggler onClick={toggleTheme}>
            {darkMode ? (
              <svg
                fill="#eee"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="#333"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            )}
          </ThemeToggler>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
