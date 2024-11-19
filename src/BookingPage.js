import React, { useState, useEffect} from 'react';
import './BookingPage.css';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { BACKEND_URL } from './config';

const BookingPage = () => {
    var randomBID;
    const [isRendered, setRendered] = useState(false);
    const [bookingData, setBookingData] = useState(null);

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



    // useEffect(() => {
    //     // Triggering the preflight OPTIONS request manually
        const triggerPreflight = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/booking-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    console.log('Preflight successful');
                } else {
                    // console.error('Preflight failed');
                }
            } catch (error) {
                // console.error('Error triggering preflight', error);
            }
        };

    useEffect(() => {
        if (selectedHotel) {
            // console.log(selectedHotel); // Log after state updates
            setRooms(['Room 1', 'Room 2', 'Room 3']); // Update rooms here
        }
    }, [selectedHotel]);

    

    const fetchCities = async () => {
        // Fetch cities from the database (mocked here)
        setCities(['City 1', 'City 2', 'City 3']);
        
        try {
            const citiesIdName = await fetch(`${BACKEND_URL}/cities`);
            const data = await citiesIdName.json();
            setCities(data);
            // console.log(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    if(!isRendered){
        fetchCities();
        triggerPreflight();
        setRendered(true);
    }


    const sendBookingData = async (bookingDataObject) => {
        try {
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

          const responseText = await response.text()
        //   eslint-disable-next-line
          if (responseText.trim() == "Age must be above 18"){
            alert('Age of the customer must be 18 or above to book a room');
            setBookingConfirmed(false);
          }

        } catch (error) {
          console.error('Error:', error);
        }
      };


    const handleCityChange = async (e) => {
        setSelectedCity(document.getElementById("city").value);
        const response = await fetch(`${BACKEND_URL}/hotelsInCity/${e.target.value}`);
        setHotels(await response.json());
    };

    const handleHotelChange = async (e) => {
        const currHotel = JSON.parse(e.target.value);
        setSelectedHotel(currHotel);

        const response = await fetch(`${BACKEND_URL}/number-of-rooms/${currHotel.hotel_id}`);
        const numRooms= await response.json();

        const checkedRoomsResponse = await fetch(`${BACKEND_URL}/checked-rooms/${currHotel.hotel_id}`);
        const checkedRooms = await checkedRoomsResponse.json();
        let rooms_list = [];
        for(let i=0; i<numRooms; i++){
            if(checkedRooms.includes(i+1)){
                continue;
            }
            rooms_list[i] = `Room ${i+1}`
        }

        setRooms(rooms_list);
    };

    const handleRoomSelect = (room) => {
        if (selectedRooms.includes(room)) {
            setSelectedRooms((prevRooms) => prevRooms.filter((r) => r !== room));
        } else {
            setSelectedRooms((prevRooms) => [...prevRooms, room]);
        }
    };

    useEffect(()=>{
        if(paymentDone){
            // console.log("Payment Done");
        }
    }, [paymentDone]);

    const handlePayment = () => {
        setPaymentDone(true);
    };


    useEffect(()=>{
        if (bookingConfirmed) {
            // console.log("Booked Effect");
            setBookingId(generateBookingId());
            // setPaymentDone(true);
            const firstName = document.getElementById('f_name').value;
            const lastName = document.getElementById('l_name').value;
            const phoneNumber = document.getElementById('phone').value
            const email = document.getElementById('email').value;
            const checkInDate = document.getElementById('checkin').value;
            const checkOutDate = document.getElementById('checkout').value;
            const h_id = JSON.parse(document.getElementById("hotel").value).hotel_id
            const booker_dob = document.getElementById('dob').value;

            const today = new Date();
            const date_object_of_dob = new Date(booker_dob);

            // Calculate the difference in milliseconds
            const differenceInMilliseconds = today - date_object_of_dob;

            // Convert milliseconds to years
            const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; 
            const booker_age = differenceInMilliseconds / millisecondsInYear;
            if(bookingId){
                setBookingId(bookingId);
            }

            const checkedRooms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map((checkbox) => checkbox.id);
            setBookingData({
                bookingID : (bookingId || randomBID),
                firstName : firstName,
                lastName : lastName,
                phoneNumber: phoneNumber,
                email : email,
                checkInDate : checkInDate,
                checkOutDate : checkOutDate,
                hotel_id : h_id,
                booker_age : booker_age,
                rooms : checkedRooms
            })
            // console.log("ok here: " + JSON.stringify(bookingData));
        } // eslint-disable-next-line
    }, [bookingConfirmed]);

    // eslint-disable-next-line
    useEffect(()=>{
        if(bookingId){
            randomBID = bookingId;
        }

    }, [bookingId]);

    useEffect(()=>{
        if(bookingData){
            sendBookingData(bookingData);
        }
                
    }, [bookingData])
    const confirmBooking = () => {
        setBookingConfirmed(true);
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
        doc.text(`Hotel: ${selectedHotel.hotel_name}`, 20, 110);
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
                        id="f_name"
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
                        id="l_name"
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
                        id="phone"
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
                        id="email"
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
                        id="dob"
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
                        id="number_of_people"
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
                    <select id="city" value={selectedCity} onChange={handleCityChange}>
                        <option key={0} value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                        ))}
                    </select>
                </div>

                {/* Hotel Selection */}
                <div>
                    <label>Select Hotel</label>
                    <select id="hotel" value={JSON.stringify(selectedHotel)} onChange={handleHotelChange}>
                        <option key={0} value="">Select Hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.hotel_id} value={JSON.stringify(hotel)}>
                                {hotel.hotel_name} (Rating: {hotel.rating})
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
                                // checked = {`Room ${index+1}`}
                                onChange={() => handleRoomSelect(room)}
                            />
                            <label htmlFor={room}>{room}</label>
                        </div>
                    ))}
                </div>

                {/* Date Selection */}
                <div>
                    <label>Check-in Date</label>
                    <input id="checkin" type="date" value={checkInDate} onChange={handleCheckInChange} />
                </div>

                <div>
                    <label>Check-out Date</label>
                    <input id="checkout" type="date" value={checkOutDate} onChange={handleCheckOutChange} />
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
