import styled from 'styled-components';
import { typography, space, color, variant } from 'styled-system';

const variants = {
  display: {
    fontSize: ['2.5rem', '4rem'],
    lineHeight: [1.2, 1.16],
  },
  h1: {
    fontSize: ['1.5rem', '2.5rem'],
    lineHeight: [1.24, 1.2],
  },
  h2: {
    fontSize: ['1.25rem', '1.5rem'],
    lineHeight: [1.32, 1.24],
  },
  h3: {
    fontSize: ['1.125rem', '1.25rem'],
    lineHeight: [1.28, 1.5],
  },
  h4: {
    fontSize: ['1rem'],
    lineHeight: [1.4],
  },
  h4b: {
    fontSize: ['1rem'],
    lineHeight: [1.4],
    fontWeight: 500,
  },
  h5: {
    fontSize: ['1rem'],
    lineHeight: [1.5],
    textTransform: 'uppercase',
  },
  h6: {
    fontSize: ['0.875rem', '0.75rem'],
    lineHeight: [1.7],
    letterSpacing: ['0.56px', '0.48px'],
    textTransform: 'uppercase',
  },
  displayl: {
    fontSize: ['2.5rem', '3rem'],
    lineHeight: [1.2, 1.16],
    fontWeight: 'var(--font-normal)',
  },
  h1l: {
    fontSize: ['1.5rem', '2.5rem'],
    lineHeight: [1.24, 1.2],
    fontWeight: 'var(--font-weight-medium)',
  },
  h2l: {
    fontSize: ['1.25rem', '1.5rem'],
    lineHeight: [1.32, 1.24],
    fontWeight: 'var(--font-weight-medium)',
  },
  h3l: {
    fontSize: ['1.25rem', '1.5rem'],
    lineHeight: [1.28, 1.5],
    fontWeight: 'var(--font-normal)',
  },
  h4l: {
    fontSize: ['1.125rem', '1.25rem'],
    lineHeight: [1.4, 1.59],
    fontWeight: 'var(--font-normal)',
  },
  h5l: {
    fontSize: ['1rem'],
    lineHeight: [1.5],
    fontWeight: 'var(--font-weight-medium)',
  },
  h6l: {
    fontSize: ['0.875rem', '0.75rem'],
    lineHeight: [1.7],
    fontWeight: 'var(--font-normal)',
    letterSpacing: ['0.56px', '0.48px'],
    textTransform: 'uppercase',
  },
};

const Heading = styled.h2`
  margin: 0;
  padding: 0;
  line-height: 1.5;
  font-weight: 700;
  display: block;

  ${variant({ variants })};
  ${color};
  ${space};
  ${typography};
`;

export default Heading;
