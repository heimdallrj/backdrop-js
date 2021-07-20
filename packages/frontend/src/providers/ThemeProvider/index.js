import styled, { ThemeProvider as StyledProvider } from 'styled-components';

import './reset.css';
import 'react-sliding-side-panel/lib/index.css';
import './theme.css';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

export default function ThemeProvider({ children }) {
  return (
    <StyledProvider theme={{}}>
      <Container>{children}</Container>
    </StyledProvider>
  );
}
