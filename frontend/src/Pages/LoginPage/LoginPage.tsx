import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import LoginForm from '../../Components/LoginForm/LoginForm';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';

const LoginPage = () => {
    const theme = useTheme();
    const [isLogin, setIsLogin] = React.useState(true);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, blue, white)',
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent:'center'       
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '100%',
                    mb: 3,
                }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">Student</Button>
                    </Link>
                    <Link to="/AdminLogin" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined">Admin</Button>
                    </Link>
                </Box>

                <Box sx={{ width: '100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {isLogin ? (
                        <LoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
                    ) : (
                        <RegisterForm setIsLogin={setIsLogin} isLogin={isLogin} />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
