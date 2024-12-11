import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Global/Context';

interface Props {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setIsLogin }): JSX.Element => {
  const [Email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const { setNameId } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make API call
      const response = await axios.post('http://localhost:5149/api/Auth/Slogin', {
        Email,
        password,
      });

      // Save tokens securely
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      // Decode token to extract payload
      interface JwtPayload {
        nameid: string;
        [key: string]: any; // For additional payload fields
      }
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(response.data.token);

      if (decodedToken.nameid) {
        setNameId(decodedToken.nameid); // Assuming this updates Context
        localStorage.setItem('nameid', decodedToken.nameid); // Save nameid to localStorage
        navigate('/'); // Navigate to home on success
      } else {
        throw new Error('Invalid token payload.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Login failed!');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        p: 3,
        background: '#fff',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Button
        onClick={() => setIsLogin(false)}
        variant="text"
        color="secondary"
        sx={{ mt: 2 }}
      >
        New Account? Register
      </Button>
    </Box>
  );
};

export default LoginForm;
