// AdminDashboard.js
import React, { useState } from 'react';
import './AdminDashboard.css';
import { Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const hotelName = location.state?.hotelName || 'Unknown Hotel';

    const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104'];

    const handleRoomSelection = (room) => {
        setSelectedRooms((prevSelected) =>
            prevSelected.includes(room)
                ? prevSelected.filter((r) => r !== room)
                : [...prevSelected, room]
        );
    };

    const handleConfirmBooking = () => {
        if (selectedRooms.length > 0) {
            alert(`Rooms ${selectedRooms.join(', ')} have been successfully booked!`);
            setSelectedRooms([]);
        } else {
            alert('Please select at least one room.');
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="admin-dashboard-container">
            <Typography variant="h3" className="admin-dashboard-title">
                {hotelName} - Admin Dashboard
            </Typography>

            <div className="room-selection">
                {rooms.map((room) => (
                    <FormControlLabel
                        key={room}
                        control={
                            <Checkbox
                                checked={selectedRooms.includes(room)}
                                onChange={() => handleRoomSelection(room)}
                                className="room-checkbox"
                            />
                        }
                        label={room}
                        className="room-label"
                    />
                ))}
            </div>

            <Button
                className="admin-dashboard-button"
                onClick={handleConfirmBooking}
                fullWidth
            >
                Confirm Selected Rooms
            </Button>

            <Button
                className="admin-dashboard-logout"
                onClick={handleLogout}
                fullWidth
            >
                Logout
            </Button>
        </div>
    );
};

export default AdminDashboard;
