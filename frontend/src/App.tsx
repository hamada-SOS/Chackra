import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Outlet } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './themes';

function App() {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className="App">
        <Outlet/>
      </div>
    </ThemeProvider>
  );
}

export default App;
