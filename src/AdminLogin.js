import React, { useState } from 'react';
import './AdminLogin.css';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Hardcoded credentials
        const hardcodedUsername = 'admin';
        const hardcodedPassword = 'password123';

        if (username === hardcodedUsername && password === hardcodedPassword) {
            navigate('/admin-dashboard');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="admin-login">
            <Typography variant="h4" sx={{ color: '#d72324', marginBottom: '20px' }}>Admin Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                sx={{ backgroundColor: '#d72324', '&:hover': { backgroundColor: '#b81d20' } }}
                fullWidth
                onClick={handleLogin}
            >
                Login
            </Button>
        </div>
    );
};

export default AdminLogin;
