
import './App.css';
import React from 'react'
import Scene from './components/scene.component';
import StateProvider from './components/provider.component';
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
      <StateProvider>
        <SideBar/>
        {/* <Scene/> */}
      </StateProvider>
      
    </ThemeProvider>
    
  );
}

export default App;
