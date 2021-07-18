import styled, { ThemeProvider as StyledProvider } from 'styled-components';

import './reset.css';
import './theme.css';

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

export default function ThemeProvider({ children }) {
  return (
    <StyledProvider theme={{}}>
      <Container className="container">{children}</Container>
    </StyledProvider>
  );
}
