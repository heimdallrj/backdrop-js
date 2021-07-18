import { Provider as ReduxProvider } from 'react-redux';

import ThemeProvider from './ThemeProvider';
import { store } from '../app/store';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );
}
