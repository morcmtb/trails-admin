import React from 'react';

import {
  ThemeProvider,
  createMuiTheme,
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { indigo, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    type: 'light',
  },
});

const GlobalCss = withStyles({
  '@global': {
    'html, body, #root': {
      margin: 0,
      padding: 0,
      height: '100vh',
      background: '#FCFBE3',
    },
  },
})(() => null);

export function Theming({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCss />
      {children}
    </ThemeProvider>
  );
}
