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
  position: relative;
  height: 100%;
`;

export const MenuLabel = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--text-light-medium);
`;

export const MenuButton = styled.button`
  background-color: var(--color-background-lighter);
  border: var(--border-1);
  border-radius: 4px;
  box-shadow: var(--box-shadow-inset);
  padding: 9px 42px 9px 12px;

  background-image: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.55152 0.591299L5.00041 4.04019L8.4493 0.591299C8.79596 0.244632 9.35596 0.244632 9.70263 0.591299C10.0493 0.937965 10.0493 1.49797 9.70263 1.84463L5.62263 5.92463C5.27596 6.2713 4.71596 6.2713 4.3693 5.92463L0.289297 1.84463C-0.0573698 1.49797 -0.0573698 0.937965 0.289297 0.591299C0.635964 0.253521 1.20485 0.244632 1.55152 0.591299Z' fill='%236C666E'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat, repeat;
  background-position: right 20px top 55%, 0 0;
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

  max-height: 400px;
  min-width: 180px;
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
