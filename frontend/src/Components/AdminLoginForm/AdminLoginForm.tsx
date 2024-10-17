
import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';


interface props {


}
const AdminLoginForm: React.FC<props> = (props): JSX.Element => {
  const [LoginCode, setLoginCode] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5149/api/Admin/login', {
        LoginCode,
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
          placeholder="LoginCode"
          value={LoginCode}
          onChange={e => setLoginCode(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
