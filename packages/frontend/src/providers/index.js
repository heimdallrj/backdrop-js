import { Provider as ReduxProvider } from 'react-redux';

import store from 'store';
import ThemeProvider from './ThemeProvider';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
}
