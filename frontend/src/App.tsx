import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';

function App() {

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleLogin = (email: string, password: string) => {
    setLoginInfo({ email, password });
    console.log(loginInfo)
  };
  return (
    <div className="App">
      <LoginPage onLogin={handleLogin}/>
    </div>
  );
}

export default App;
