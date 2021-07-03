import { ThemeProvider as StyledProvider } from 'styled-components';

import './theme.css';

export default function ThemeProvider({ children }) {
  return <StyledProvider theme={{}}>{children}</StyledProvider>;
}
