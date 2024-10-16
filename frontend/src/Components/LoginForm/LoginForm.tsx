import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';


interface props {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void; // Function to change the state
}
const LoginForm: React.FC<props> = ({setIsLogin}): JSX.Element => {
  const [universityId, setUniversityId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5149/api/auth/login', {
        universityId,
        password
      });

      // Save access token and refresh token in local storage
      localStorage.setItem('accessToken', response.data.token);
      // Assuming you return the refresh token in the same response
      localStorage.setItem('refreshToken', response.data.refreshToken);

      alert('Login successful!');
      // Redirect or handle post-login behavior
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="University ID"
          value={universityId}
          onChange={e => setUniversityId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setIsLogin(false)}>New Account</button>
    </div>
  );
};

export default LoginForm;
