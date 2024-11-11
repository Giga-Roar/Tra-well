import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const BookingPage = () => {
    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedHotel, setSelectedHotel] = useState('');
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [paymentDone, setPaymentDone] = useState(false);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [bookingId, setBookingId] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [dateError, setDateError] = useState('');
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState('');
    const [guestDetails, setGuestDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });
    const [usedBookingIds, setUsedBookingIds] = useState(new Set());

    useEffect(() => {
        setCities(['City 1', 'City 2', 'City 3']);
    }, []);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setHotels([
            { name: 'Hotel A', rating: '4.5' },
            { name: 'Hotel B', rating: '4.0' },
        ]);
    };

    const handleHotelChange = (e) => {
        setSelectedHotel(e.target.value);
        setRooms(['Room 1', 'Room 2', 'Room 3']);
    };

    const handleRoomSelect = (room) => {
        if (selectedRooms.includes(room)) {
            setSelectedRooms((prevRooms) => prevRooms.filter((r) => r !== room));
        } else {
            setSelectedRooms((prevRooms) => [...prevRooms, room]);
        }
    };

    const handlePayment = () => {
        setPaymentDone(true);
    };

    const confirmBooking = () => {
        if (paymentDone) {
            setBookingId(generateBookingId());
            setBookingConfirmed(true);
        }
    };

    const handleNumberOfPeopleChange = (e) => {
        const peopleCount = e.target.value;
        setNumberOfPeople(peopleCount);

        if (selectedRooms.length < peopleCount) {
            const requiredRooms = peopleCount - selectedRooms.length;
            const newRooms = rooms.slice(0, requiredRooms);
            setSelectedRooms((prevRooms) => [...prevRooms, ...newRooms]);
        } else if (selectedRooms.length > peopleCount) {
            setSelectedRooms((prevRooms) => prevRooms.slice(0, peopleCount));
        }
    };

    const generateBookingId = () => {
        let newId;
        do {
            newId = `#${Math.floor(Math.random() * 90000) + 10000}`;
        } while (usedBookingIds.has(newId));

        setUsedBookingIds((prevIds) => new Set(prevIds).add(newId));
        return newId;
    };

    const generateReceiptPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(24);
        doc.setFont('times', 'bold');
        doc.setTextColor(54, 69, 79);
        doc.text('Book-My-Trip', 105, 20, { align: 'center' });
        doc.setDrawColor(169, 169, 169);
        doc.line(20, 25, 190, 25);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Booking ID: ${bookingId}`, 20, 40);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(54, 69, 79);
        doc.text('Guest Details', 20, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(
            `Name: ${guestDetails.firstName} ${guestDetails.lastName}`,
            20,
            60
        );
        doc.text(`Phone: ${guestDetails.phone}`, 20, 70);
        doc.text(`Email: ${guestDetails.email}`, 20, 80);
        doc.text(`People Count: ${numberOfPeople}`, 20, 90);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(54, 69, 79);
        doc.text('Hotel & Room Information', 20, 100);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Hotel: ${selectedHotel}`, 20, 110);
        doc.text(`Room(s): ${selectedRooms.join(', ')}`, 20, 120);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(54, 69, 79);
        doc.text('Stay Duration', 20, 135);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Check-in Date: ${checkInDate}`, 20, 145);
        doc.text(`Check-out Date: ${checkOutDate}`, 20, 155);

        doc.setFontSize(10);
        doc.setTextColor(128, 128, 128);
        doc.text(
            'Thank you for choosing Book-My-Trip! We look forward to your stay.',
            105,
            170,
            { align: 'center' }
        );

        doc.save('receipt.pdf');
    };

    const handleNameValidation = (e) => {
        const value = e.target.value;
        if (!/^[A-Za-z]+$/.test(value)) {
            alert('Name should only contain alphabets');
            e.target.value = '';
        } else {
            setGuestDetails({ ...guestDetails, [e.target.name]: value });
        }
    };

    const handleDobChange = (e) => {
        const selectedDate = e.target.value;
        const today = new Date().toISOString().split('T')[0];
        setDob(selectedDate);

        if (selectedDate > today) {
            setDobError('Date of birth cannot be in the future.');
        } else {
            setDobError('');
        }
    };

    const handleCheckInChange = (e) => {
        setCheckInDate(e.target.value);
        if (checkOutDate && e.target.value >= checkOutDate) {
            setDateError('Check-out date must be later than check-in date.');
        } else {
            setDateError('');
        }
    };

    const handleCheckOutChange = (e) => {
        setCheckOutDate(e.target.value);
        if (checkInDate && e.target.value <= checkInDate) {
            setDateError('Check-out date must be later than check-in date.');
        } else {
            setDateError('');
        }
    };

    return (
        <div className="booking-page">
            <div className="header">
                <a href="/" style={{ textDecoration: 'none' }}>
                    <div className="header_head" style={{ cursor: 'pointer' }}>
                        <img src="/assets/head_img.png" alt="header_img" />
                        <h1>
                            <i>Book-My-Trip</i>
                        </h1>
                    </div>
                </a>
                <div className="header_links">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            className="home_btn"
                            startIcon={<HomeIcon />}
                            size="large"
                            sx={{
                                color: '#2cb977',
                                '&:hover': { backgroundColor: '#2cb977', color: 'white' },
                                borderRadius: '50px',
                            }}
                        >
                            <i>Home</i>
                        </Button>
                    </Link>
                    <Link to="/booking" style={{ textDecoration: 'none' }}>
                        <Button
                            className="book_btn"
                            startIcon={<FeaturedPlayListIcon />}
                            size="large"
                            sx={{
                                color: '#1e2978',
                                '&:hover': { backgroundColor: '#1e2978', color: 'white' },
                                borderRadius: '50px',
                            }}
                        >
                            <i>Booking</i>
                        </Button>
                    </Link>
                    <Link to="/team" style={{ textDecoration: 'none' }}>
                        <Button
                            className="team_btn"
                            startIcon={<GroupIcon />}
                            size="large"
                            sx={{
                                color: '#9c1de8',
                                '&:hover': { backgroundColor: '#9c1de8', color: 'white' },
                                borderRadius: '50px',
                            }}
                        >
                            <i>Team</i>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Booking Form Components */}
            <div className="booking-form">
                {/* Guest Details */}
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={guestDetails.firstName}
                        onChange={handleNameValidation}
                        required
                    />
                </div>

                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={guestDetails.lastName}
                        onChange={handleNameValidation}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={handleDobChange}
                        required
                    />
                    {dobError && <span style={{ color: 'red' }}>{dobError}</span>}
                </div>

                {/* Number of People */}
                <div>
                    <label>Number of People</label>
                    <input
                        type="number"
                        value={numberOfPeople}
                        onChange={handleNumberOfPeopleChange}
                        min="1"
                        max="10"
                    />
                </div>

                {/* City Selection */}
                <div>
                    <label>Select City</label>
                    <select value={selectedCity} onChange={handleCityChange}>
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hotel Selection */}
                <div>
                    <label>Select Hotel</label>
                    <select value={selectedHotel} onChange={handleHotelChange}>
                        <option value="">Select Hotel</option>
                        {hotels.map((hotel, index) => (
                            <option key={index} value={hotel.name}>
                                {hotel.name} ({hotel.rating} stars)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Room Selection */}
                <div>
                    <label>Select Rooms</label>
                    {rooms.map((room, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={room}
                                checked={selectedRooms.includes(room)}
                                onChange={() => handleRoomSelect(room)}
                            />
                            <label htmlFor={room}>{room}</label>
                        </div>
                    ))}
                </div>

                {/* Date Selection */}
                <div>
                    <label>Check-in Date</label>
                    <input type="date" value={checkInDate} onChange={handleCheckInChange} />
                </div>

                <div>
                    <label>Check-out Date</label>
                    <input type="date" value={checkOutDate} onChange={handleCheckOutChange} />
                    {dateError && <span style={{ color: 'red' }}>{dateError}</span>}
                </div>

                {/* Payment Section */}
                <div>
                    <label>Select Payment Mode</label>
                    <select value={selectedPaymentMode} onChange={(e) => setSelectedPaymentMode(e.target.value)}>
                        <option value="">Select Payment Mode</option>
                        <option value="credit_card">Credit
                            Card</option>
                        <option value="debit_card">Debit Card</option>
                        <option value="net_banking">Net Banking</option>
                        <option value="upi">UPI</option>
                    </select>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePayment}
                        disabled={
                            !guestDetails.firstName ||
                            !guestDetails.lastName ||
                            !guestDetails.phone ||
                            !guestDetails.email ||
                            !dob ||
                            !numberOfPeople ||
                            !selectedCity ||
                            !selectedHotel ||
                            selectedRooms.length === 0 ||
                            !checkInDate ||
                            !checkOutDate ||
                            !selectedPaymentMode
                        }
                    >
                        Pay Now
                    </Button>
                </div>

                {paymentDone && (
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={confirmBooking}
                        >
                            Confirm Booking
                        </Button>
                    </div>
                )}
                {/* Booking Confirmation */}
                <div className="booking_confirmation">
                    {bookingConfirmed && (
                        <div>
                            <h3>Your booking is confirmed!</h3>
                            <p style={{ color: 'black' }}>Your booking ID is: {bookingId}</p>
                            <Button onClick={generateReceiptPDF} variant="contained" color="primary">
                                Download Receipt
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className='footer'>
                <p>This website was made for the sole purpose of a SE-DBMS project.</p>
                <p>&copy; 2024 Book-My-Trip. All rights reserved.</p>
            </div>
        </div>
    );
};

export default BookingPage;
