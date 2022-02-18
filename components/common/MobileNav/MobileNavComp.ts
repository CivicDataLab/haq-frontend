import { css } from 'styled-components';

export const MobileNavComp = css`
.m-header {
    display : none;
    min-height: 4rem;
  
    @media only screen and (max-width: 980px) {
      display: flex;
      align-items: center;
      background-color: #076775
    }
  
    .container {
      display: flex;
      padding-top: 1rem;
      justify-content: flex-start;
    }

    .header__brand {
       display: inline-flex;
       align-items: center
    }
   
    &__button {
      margin-right: 1rem;
    }
  
    &__link {
      justify-self: flex-end;
  
      @include narrowerThan('seed') {
        display: none;
      }
    }
  }
  
  .m-navbar {
    background:#076775;
    color: #fdfcfc;
  
    a {
      text-decoration: none;
    }
  
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #06525d;
      height: 4rem;
      padding-left: 1.5rem;
  
      button {
        height: 100%;
        width: 4rem;
        font-size: 1.5rem;
      }
    }
  
    .navbar__item {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 2rem;
  
      &[type='button'] {
        &::after {
          border-bottom: 2px solid #0b0c0c;
          border-bottom-color: rgb(11, 12, 12);
          border-right: 2px solid #0b0c0c;
          border-right-color: rgb(11, 12, 12);
          content: ' ';
          display: inline-block;
          height: 8px;
          margin: 0 2px 0 1rem;
          transform: translateY(-35%) rotate(45deg);
          vertical-align: middle;
          width: 8px;
          border-color: #fff;
          transition: transform 300ms ease;
        }
      }
  
      &[aria-expanded='true'] {
        background-color: #076775;
  
        &::after {
          transform: rotate(-135deg);
        }
  
        & + ul {
          background-color: #076775;
          padding-bottom: 1rem;
        }
      }
    }
  
    &__nested {
      width: 100%;
      a {
        padding: 1rem 1.5rem;
        display: block;
        padding-left: 2rem;
        display: flex;
        justify-content: space-between;
      }
    }
  
    @include narrowerThan('seed') {
      min-width: 248px;
    }
  }`
;

export default MobileNavComp;
