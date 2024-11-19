// AdminDashboard.js
import React, { useState, useEffect} from 'react';
import './AdminDashboard.css';
import { Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { BACKEND_URL } from './config';

const AdminDashboard = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const hotel_id = location.state.hotel_id;
    const hotelName = location.state?.hotelName || 'Unknown Hotel';
    const [roomDetails, setRoomDetails] = useState([]);
    //This is to continuosly rerender whenever rooms get unbooked
    const [reloadCount, setReloadCount] = useState(0);

    const rd_function = async() =>{
        const  response = await fetch(`${BACKEND_URL}/full-room-details/${hotel_id}`)
        const fetchedRoomDetails = await response.json();
    
        setRoomDetails(fetchedRoomDetails);
    }

    useEffect(()=>{
        rd_function();
    }, []);
    
    useEffect(()=>{
        // console.log(roomDetails);
    }, [roomDetails]);

    useEffect(() => {
        rd_function();
    }, [reloadCount])

    const handleRoomSelection = (room) => {
        setSelectedRooms((prevSelected) =>
            prevSelected.includes(room)
                ? prevSelected.filter((r) => r !== room)
                : [...prevSelected, room]
        );
    };

    const handleConfirmBooking = async () => {
        if (selectedRooms.length > 0) {
            alert(`The rooms have been successfully unbooked!`);
            const url = `${BACKEND_URL}/unbook-rooms/${hotel_id}`;
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json' // Set content type for JSON data
                },
                body: JSON.stringify(selectedRooms)
            }
            await fetch(url, options)
            setSelectedRooms([]);
            setReloadCount(reloadCount + 1);
        } else {
            alert('Please select at least one room.');
        }
    };

    //   eslint-disable-next-line
    const findRoomIndex = (roomNo) => {
        for(let i = 0; i<roomDetails.length; i++){
            if( (roomDetails[i]).room_no === roomNo ){
                return i;
            }
        }
        return -1;
    }

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="admin-dashboard-container">
            <Typography variant="h3" className="admin-dashboard-title">
                {hotelName} - Admin Dashboard
            </Typography>

            <div className="room-selection">
            {/* eslint-disable-next-line */}
            <table style={{fontSize : '10px'}}>
                {roomDetails.map((room) => (
                    //   eslint-disable-next-line
                    <tr>
                        <td>
                        <FormControlLabel
                            key={room.room_no}
                            control={
                                <Checkbox
                                    checked={selectedRooms.includes(room)}
                                    onChange={() => handleRoomSelection(room)}
                                    className="room-checkbox"
                                />
                            }
                            label={room.room_no}
                            className="room-label"
                        />
                        </td>
                        <td>
                            {room.booking_id}
                        </td>
                        <td>
                            {room.first_name}
                        </td>
                        <td>
                            {room.last_name}
                        </td>
                        <td>
                            {room.check_in_date}
                        </td>
                        <td>
                            {room.check_out_data}
                        </td>
                    </tr>
                ))}
            </table>
            </div>

            <Button
                className="admin-dashboard-button"
                onClick={handleConfirmBooking}
                fullWidth
            >
                Unbook Selected Rooms
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
