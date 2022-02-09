import {css} from 'styled-components';

export const NavComp = css`
.navbar__web{
  background-color: #076775;
  color: #fdfcfc;
  padding-top: 1.25rem;
  padding-bottom : 1rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }

  .header__brand {
    display: flex;
    align-items: center; 
    
    a {
      display: inline-flex;
      svg {
        margin-right:6px;
      }
  }

    h1 {
      font-size: 1.4rem;
      font-weight: 500;
      width: max-content;
    }
  }

 .brand_logo {
     width:200px !important;
     height: auto;
  }
}

.navbar {
  position: relative;

  &__container {
    display:flex;
  }

  &__links {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }

  &__item {
    padding: 1rem;
    align-items: center;
    display: flex;

    &:hover {
      background-color: #5ea8a9;
    }

    &--active {
      box-shadow: inset 0 -2px 0 0 #fff;
      font-weight: 500;

      @include narrowerThan('sprout') {
        box-shadow: inset 3px 0 0 0 #fff;
      }
    }
  }
`;


export default NavComp;