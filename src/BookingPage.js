import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { BACKEND_URL } from './config';


const BookingPage = () => {

    const [cities, setCities] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line
    const [selectedCity, setSelectedCity] = useState('');
    // eslint-disable-next-line
    const [selectedHotel, setSelectedHotel] = useState('');
    // eslint-disable-next-line
    const [allInputsFilled, setallInputsFilled] = useState(true);
    // eslint-disable-next-line
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentDone, setPaymentDone] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [bookingData, setBookingData] = useState({});
    

    // Mock data to be replaced by database/API data
    useEffect(() => {
        // Fetch cities from the database (mocked here)
        setCities(['City 1', 'City 2', 'City 3']);
    }, []);


    const sendBookingData = async (bookingDataObject) => {
        console.log("Booked");
        try {
            console.log(process.env.MYSQL_DATABASE);
          const url = `${BACKEND_URL}/booking-data`;
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set content type for JSON data
            },
            body: JSON.stringify(bookingDataObject) // Convert data to JSON string
          };
      
          const response = await fetch(url, options);
      
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        // Fetch hotels based on selected city (mocked here)
        setHotels([
            { name: 'Hotel A', rating: '4.5' },
            { name: 'Hotel B', rating: '4.0' },
        ]);
    };

    const handleHotelChange = (e) => {
        setSelectedHotel(e.target.value);
        // Fetch rooms based on selected hotel (mocked here)
        setRooms(['Room 1', 'Room 2', 'Room 3']);
    };

    const handlePayment = () => {
        // Add your actual input validation logic here
         // Replace with actual validation logic
        if (bookingConfirmed) {
            setPaymentDone(true);
            const firstName = document.getElementById('f_name').value;
            const lastName = document.getElementById('l_name').value;
            const phoneNumber = document.getElementById('phone').value
            const email = document.getElementById('email').value;
            const checkInDate = document.getElementById('checkin').value;
            const checkOutDate = document.getElementById('checkout').value;

            setBookingData({
                firstName : firstName,
                lastName : lastName,
                phoneNumber: phoneNumber,
                email : email,
                checkInDate : checkInDate,
                checkOutDate : checkOutDate
            })
            sendBookingData(bookingData);
        }
    };

    const confirmBooking = () => {
        if (allInputsFilled) {
            setBookingConfirmed(true);
            handlePayment();
        }
    };

    const handleNumberOfPeopleChange = (e) => {
        setNumberOfPeople(e.target.value);
    };

    const generateReceiptPDF = () => { 
        if(paymentDone) {
            const doc = new jsPDF();
            doc.setFontSize(20);
            doc.text('Booking Receipt', 20, 20);
            doc.setFontSize(12);
            doc.text('Booking ID: #12345', 20, 30);
            doc.text(`Name: ${bookingData.firstName} ${bookingData.lastName}`, 20, 40);
            doc.text(`Phone: ${bookingData.phoneNumber}`, 20, 50);
            doc.text(`Email: ${bookingData.email}`, 20, 60);
            doc.text(`Check-in: ${bookingData.checkInDate}`, 20, 70);
            doc.text(`Check-out: ${bookingData.checkOutDate}`, 20, 80);

            doc.save('receipt.pdf'); // Save the generated PDF with the name 'receipt.pdf'
        }
    };

    return (
        <div className="booking-page">
            <div className='header'>
                <a href='/' style={{ textDecoration: 'none' }}>
                    <div className='header_head' style={{ cursor: 'pointer' }}>
                        <img src='/assets/head_img.png' alt='header_img'></img>
                        <h1><i>Tra-Well</i></h1>
                    </div>
                </a>
                <div className='header_links'>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            className='home_btn'
                            startIcon={<HomeIcon />}
                            size='large'
                            sx={{ color: '#2cb977', '&:hover': { backgroundColor: '#2cb977', color: 'white' }, borderRadius: '50px' }}
                        >
                            <i>Home</i>
                        </Button>
                    </Link>
                    <Link to="/booking" style={{ textDecoration: 'none' }}>
                        <Button
                            className='book_btn'
                            startIcon={<FeaturedPlayListIcon />}
                            size='large'
                            sx={{ color: '#1e2978', '&:hover': { backgroundColor: '#1e2978', color: 'white' }, borderRadius: '50px' }}
                        >
                            <i>Booking</i>
                        </Button>
                    </Link>
                    <Link to="/team" style={{ textDecoration: 'none' }}>
                        <Button
                            className='team_btn'
                            startIcon={<GroupIcon />}
                            size='large'
                            sx={{ color: '#9c1de8', '&:hover': { backgroundColor: '#9c1de8', color: 'white' }, borderRadius: '50px' }}
                        >
                            <i>Team</i>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='booking_main'>
                <h1 className='booking_title'>Booking</h1>
                <form className='main_form'>
                    {/* Personal Information */}
                    <label className='form_label' htmlFor='first_name'>First Name:</label>
                    <input className='form_input' type='text' id='f_name' name='first_name' required />

                    <label className='form_label' htmlFor='last_name'>Last Name:</label>
                    <input className='form_input' type='text' id='l_name' name='last_name' required />

                    <label className='form_label' htmlFor='phone_number'>Phone Number:</label>
                    <input className='form_input' type='tel' id='phone' name='phone_number' required />

                    <label className='form_label' htmlFor='email'>Mail ID:</label>
                    <input className='form_input' type='email' id='email' name='email' required />

                    <label className='form_label' htmlFor='dob'>Date of Birth:</label>
                    <input className='form_input' type='date' id='dob' name='dob' required />

                    <label className='form_label' htmlFor='gender'>Gender:</label>
                    <select className='form_select' id='gender' name='gender' required>
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>

                    <label htmlFor='number_of_people'>Number of People:</label>
                    <input
                        type='number'
                        id='number_of_people'
                        name='number_of_people'
                        min='1'
                        value={numberOfPeople}
                        onChange={handleNumberOfPeopleChange}
                        required
                    />

                    {/* City and Hotel Selection */}
                    <label className='form_label' htmlFor='city'>City:</label>
                    <select className='form_select' id='city' name='city' onChange={handleCityChange} required>
                        <option value=''>Select City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>

                    <label className='form_label' htmlFor='hotel'>Hotel:</label>
                    <select className='form_select' id='hotel' name='hotel' onChange={handleHotelChange} required>
                        <option value=''>Select Hotel</option>
                        {hotels.map((hotel, index) => (
                            <option key={index} value={hotel.name}>
                                {hotel.name} (Rating: {hotel.rating})
                            </option>
                        ))}
                    </select>

                    {/* Room Selection */}
                    <div className='rooms_container'>
                        <h4 className='rooms_title'>Available Rooms:</h4>
                        {rooms.map((room, index) => (
                            <div key={index} className='room_item'>{room}</div>
                        ))}
                    </div>

                    {/* Check-in and Check-out */}
                    <label className='form_label' htmlFor='checkin'>Check-in Date:</label>
                    <input className='form_input' type='date' id='checkin' name='checkin' required />

                    <label className='form_label' htmlFor='checkout'>Check-out Date:</label>
                    <input className='form_input' type='date' id='checkout' name='checkout' required />

                    {/* Mode of Payment */}
                    <label className='form_label' htmlFor='payment'>Mode of Payment:</label>
                    <select className='form_select' id='payment' name='payment' onChange={()=>{
                        setPaymentMethod(document.getElementById("payment").value);
                        console.log("Payment Method : ", paymentMethod);
                    }} required>
                        <option value=''>Select Payment Method</option>
                        <option value='card'>Credit Card</option>
                        <option value='paypal'>PayPal</option>
                    </select>

                    {/* Confirm Booking */}
                    {paymentDone && <p>Payment Done</p>}
                </form>

                {/* Confirm Booking Button */}
                <Button className='confirm_button' onClick={confirmBooking} disabled={!allInputsFilled}>Confirm Booking</Button>

                {/* Booking Receipt */}
                <Button className='download_button' onClick={generateReceiptPDF}>Download Receipt</Button>
            </div>
            <div className='footer'>
                <p>This website was made for the sole purpose of a SE-DBMS project.</p>
                <p>&copy; 2024 Tra-Well. All rights reserved.</p>
            </div>
        </div>
    );
};

export default BookingPage;
