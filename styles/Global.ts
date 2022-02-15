import { createGlobalStyle } from 'styled-components';
import NavComp from 'components/Navbar/NavComp';
import MobileNavComp from 'components/MobileNav/MobileNavComp';
import { normalize } from 'polished';
import cssReset from './Reset';
import cssNormalise from './Normalise';
import ModalComp from 'components/Modal/ModalComp';
import { DEFAULT_THEME } from 'config/theme';

const theme = DEFAULT_THEME;

export const GlobalStyle = createGlobalStyle`
${cssReset}
${cssNormalise}
${ModalComp}
${NavComp}
${MobileNavComp}
${normalize()}

html {
  --color-primary: ${theme.primaryColor};
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}

:focus-visible {
  outline: 3px solid #78aeda !important;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  background-color: #f2f2f2;
  }

button {
  border:  none;
  background: none;
  cursor: pointer;
}

ul, ol {
  margin: 0;
  padding: 0;
}

/* main {
  width: 90%;
  margin: 0 auto;
} */

.sr-only {
  &:not(:where(:focus, :active, :focus-within)) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
}

.banner {
  figure {
    mix-blend-mode: multiply;
   
    img {
      border-radius: 8px;
    }
  }
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 720px) {
    width: 700px;
  }

  @media (min-width: 980px) {
    width: 960px;
  }

  @media (min-width: 1200px){
    width: 1180px;
  }

  @media (min-width: 1350px) {
    width: 1216px;
  }
}
`;
