import React, { useState } from 'react';
import './AdminLogin.css';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Define admins with their hotel names
    const admins = [
        { username: 'admin1', password: 'password123', hotelName: 'Hotel Sunshine' },
        { username: 'admin2', password: 'password456', hotelName: 'Grand Palace' },
        { username: 'admin3', password: 'password789', hotelName: 'Ocean View Resort' }
    ];

    const handleLogin = async () => {

        const url = `${BACKEND_URL}/login/${username}/${password}`;
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          };
      
        const response = await fetch(url, options);
        const responseObj = await response.json();
        if (responseObj[0]) {
            navigate('/admin-dashboard', { state: { hotelName: responseObj[1] } });
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className='main'>
            <div className="admin-login">
                <Typography variant="h4" sx={{ color: '#d72324', marginBottom: '20px' }} className='admin-login-title'>Admin Login</Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    className='admin-login-title'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    className='admin-login-title'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#d72324', '&:hover': { backgroundColor: '#b81d20' } }}
                    fullWidth
                    className='admin-login-button'
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default AdminLogin;
