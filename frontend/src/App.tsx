import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import { Outlet } from 'react-router';

function App() {

  return (
    <div className="App">
      <Outlet/>
    </div>
  );
}

export default App;
