import styled, { ThemeProvider as StyledProvider } from 'styled-components';

import './theme.css';

const Container = styled.div``;

export default function ThemeProvider({ children }) {
  return (
    <StyledProvider
      theme={{}}
    >
      <Container className="container">
        {children}
      </Container>
    </StyledProvider>
  );
}
