import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import cssReset from './Reset';
import cssNormalise from './Normalise';
import ModalComp from 'components/Modal/ModalComp';

export const GlobalStyle = createGlobalStyle`
${cssReset}
${cssNormalise}
${ModalComp}
${normalize()}

html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: inherit;
}

:focus-visible {
  outline: 3px solid #78aeda !important;
  outline-offset: 1px;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
		Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;;
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

main {
  width: 90%;
  margin: 0 auto;
}

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
`;
