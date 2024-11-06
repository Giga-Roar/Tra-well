import React, { useState } from 'react';
import './AdminDashboard.css';
import { Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [confirmedRoom, setConfirmedRoom] = useState(null);
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        if (selectedRoom) {
            setConfirmedRoom(selectedRoom);
            alert(`Room ${selectedRoom} has been successfully booked!`);
        } else {
            alert('Please select a room first.');
        }
    };

    const handleLogout = () => {
        // Optional: Clear any session storage or authentication state if needed
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <Typography variant="h4" sx={{ color: '#2cb977', marginBottom: '20px' }}>
                Admin Dashboard
            </Typography>
            <TextField
                select
                label="Select Room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            >
                <MenuItem value="Room 101">Room 101</MenuItem>
                <MenuItem value="Room 102">Room 102</MenuItem>
                <MenuItem value="Room 103">Room 103</MenuItem>
                <MenuItem value="Room 104">Room 104</MenuItem>
            </TextField>

            {selectedRoom && (
                <Typography variant="body1" sx={{ marginTop: '10px', color: '#1e2978' }}>
                    Selected Room: {selectedRoom}
                </Typography>
            )}

            <Button
                variant="contained"
                sx={{ backgroundColor: '#d72324', '&:hover': { backgroundColor: '#b81d20' }, marginTop: '20px' }}
                fullWidth
                onClick={handleConfirmBooking}
            >
                Confirm Slot Booking
            </Button>

            {confirmedRoom && (
                <Typography variant="h6" sx={{ color: '#2cb977', marginTop: '20px' }}>
                    Confirmed Booking: {confirmedRoom}
                </Typography>
            )}

            {/* Logout Button */}
            <Button
                variant="outlined"
                sx={{ marginTop: '30px', color: '#d72324', borderColor: '#d72324', '&:hover': { backgroundColor: '#fbecec' } }}
                fullWidth
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default AdminDashboard;
