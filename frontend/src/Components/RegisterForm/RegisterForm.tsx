import React, { useState } from 'react';
import axios from 'axios';

interface props {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void; // Function to change the state
}
const RegisterForm: React.FC<props> = ({setIsLogin}): JSX.Element => {
    
  const [universityId, setUniversityId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5149/api/Auth/register', {
        universityId,
        email,
        password
      });
      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="University ID"
          value={universityId}
          onChange={e => setUniversityId(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setIsLogin(true)}>Have Account?</button>
    </div>
  );
};

export default RegisterForm;
