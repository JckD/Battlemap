
import './App.css';
import React from 'react'
import Test from './components/scene.component';
import { useState } from 'react';
import SideBar from './components/sideBar.component';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SideBar/>
      <Test/>
    </ThemeProvider>
    
  );
}

export default App;
