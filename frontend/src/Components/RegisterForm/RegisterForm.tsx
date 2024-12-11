import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';

interface Props {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const RegisterForm: React.FC<Props> = ({ setIsLogin }): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5149/api/Auth/Sregister', {
        email,
        password,
        userName,
      });
      alert('Registration successful! You can now log in.');
      setIsLogin(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error registering');
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
        Register
      </Typography>
      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
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
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <Button
        onClick={() => setIsLogin(true)}
        variant="text"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Already have an account? Log in
      </Button>
    </Box>
  );
};

export default RegisterForm;
