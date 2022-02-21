import styled from 'styled-components';
import ButtonComp from 'components/actions/Button/ButtonComp';

export const WidgetComp = styled.div`
  position: relative;
  height: 100%;

  ${ButtonComp} {
    &[aria-expanded='true'] {
      background-color: #ebfeff;
    }
  }
`;

export const WidgetContent = styled.div`
  position: absolute;
  top: 3.5rem;
  /* right: 0; */
  display: none;
  isolation: isolate;
  z-index: 20;

  &.widget__active {
    display: block;
  }
`;
