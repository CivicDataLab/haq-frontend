import styled from 'styled-components';

interface MenuProps {
  /**
   * should the menu open to top
   */
  readonly top?: true | false;

  /**
   * should the menu stick to left or right
   */
  readonly position?: 'left' | 'right';
}

export const MenuComp = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuLabel = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--text-light-light);
  font-size: 14px;
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const MenuButton = styled.button`
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  border-radius: 4px;
  box-shadow: var(--box-shadow-inset);
  padding: 9px 24px 9px 12px;
  display: flex;
  align-items: center;
  line-height: 137%;

  svg {
    margin-left: 17px;
    margin-bottom: -2px;
  }
`;

export const MenuContent = styled.ul<MenuProps>`
  position: absolute;
  isolation: isolate;
  margin-top: -1px;
  z-index: 20;
  left: ${(props: any) => (props.position == 'left' ? 0 : null)};
  right: ${(props: any) => (props.position == 'right' ? 0 : null)};
  bottom: ${(props: any) => (props.top == true ? '100%' : null)};

  background-color: var(--color-background-lighter);
  border: var(--border-1);
  box-shadow: var(--box-shadow-1);
  border-radius: 0px 0px 4px 4px;
  padding: 8px;

  max-height: 300px;
  overflow-y: auto;
  min-width: 100%;
  width: max-content;
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
