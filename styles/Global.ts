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
  --color-primary: ${theme.primary};
  --color-secondary : ${theme.secondary};
  --color-text : ${theme.text};
  --color-tertiary : ${theme.tertiary};
  --color-background-dark : ${theme.background_dark};
  --color-background-darker : ${theme.background_darker};
  --color-background-light : ${theme.background_light};
  --color-background-lighter : ${theme.background_lighter};
  --color-white : ${theme.color_white};
  --color-violet : ${theme.color_violet};
  --color-honey : ${theme.color_honey};
  --color-amazon : ${theme.color_amazon};
  --color-grey-100 : ${theme.grey_100};
  --color-grey-200 : ${theme.grey_200};
  --color-grey-300 : ${theme.grey_300};
  --color-grey-400 : ${theme.grey_400};
  --color-grey-500 : ${theme.grey_500};
  --color-grey-600 : ${theme.grey_600};

  --border-1 : 1px solid var(--color-grey-500);
  --box-shadow-1 : 0px 4px 12px rgba(0, 0, 0, 0.08);
  --box-shadow-inset: inset 0px 0px 4px rgba(0, 0, 0, 0.08);

  --font-weight-bold: 600;
  --font-weight-medium: 500;
  --font-weight-light: 400;
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
  font-family: 'Rubik',-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
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
