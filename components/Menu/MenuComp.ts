import styled from 'styled-components';

export const MenuComp = styled.div`
  position: relative;
  height: 100%;
`;

export const MenuContent = styled.ul`
  position: absolute;
  isolation: isolate;
  margin-top: -1px;
  z-index: 20;

  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 0px 0px 4px 4px;
  padding: 8px;

  max-height: 400px;
  min-width: 200px;
  right: 0;
`;

export const MenuItem = styled.li`
  line-height: 22px;
  border-radius: 4px;
  transition: background-color 150ms ease;

  button {
    padding: 8px;
    width: 100%;
    text-align: start;
    height: 100%;

    &:hover,
    &:focus-visible {
      background-color: var(--color-grey-600);
    }
  }
`;

export const MenuButton = styled.button`
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  border-radius: 4px;
  box-shadow: var(--box-shadow-inset);
  padding: 9px 12px;
`;
