import styled from 'styled-components';

export const Breadcrumb = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 16px;

  .List {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 4px;
    list-style: none;
  }

  .List > li {
    display: flex;
    color: #8e888f;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }

  .List > li + li:before {
    content: '>';
    padding: 2px 16px;
  }

  .List > .active {
    color: var(--focused);
  }

  .ListItem {
    display: flex;
    align-items: center;

    & + &::before {
      content: '>';
      padding: 2px 8px;
    }
  }

  .CollapseItem {
    display: flex;
    align-items: center;
  }

  .Button {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    border: var(--border-transparent);
    font-size: var(--font-size-200);
  }

  .ButtonLink {
    color: var(--text);
    background-color: transparent;
    border-color: transparent;
  }

  .ButtonLink:hover {
    color: #8e888f;
    text-decoration: underline;
    background-color: transparent;
    border-color: transparent;
  }

  .CollapseToggle {
    font-size: 14px;
    color: #8e888f;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;