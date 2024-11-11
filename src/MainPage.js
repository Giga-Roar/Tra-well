import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';

const MainPage = () => {
    return (
        <div>
            <div className='header'>
                <a href='/' style={{ textDecoration: 'none' }}>
                    <div className='header_head' style={{ cursor: 'pointer' }}>
                        <img src='/assets/head_img.png' alt='header_img'></img>
                        <h1><i>Book-My-Trip</i></h1>
                    </div>
                </a>
                <div className='header_links'>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            className='home_btn'
                            startIcon={<HomeIcon />}
                            size='large'
                            sx={{ color: '#2cb977', '&:hover': { backgroundColor: '#2cb977', color: 'white', textShadow: '1px 1px 5px black', borderTopLeftRadius: '12px', borderBottomRightRadius: '20px' } }}
                        >
                            <i>Home</i>
                        </Button>
                    </Link>
                    <Link to="/booking" style={{ textDecoration: 'none' }}>
                        <Button
                            className='book_btn'
                            startIcon={<FeaturedPlayListIcon />}
                            size='large'
                            sx={{ color: '#1e2978', '&:hover': { backgroundColor: '#1e2978', color: 'white' }, textShadow: '1px 1px 5px black', borderRadius: '12px' }}
                        >
                            <i>Booking</i>
                        </Button>
                    </Link>
                    <Link to="/team" style={{ textDecoration: 'none' }} target='_blank'>
                        <Button
                            className='team_btn'
                            startIcon={<GroupIcon />}
                            size='large'
                            sx={{ color: '#9c1de8', '&:hover': { backgroundColor: '#9c1de8', color: 'white', textShadow: '1px 1px 5px black', borderTopRightRadius: '12px', borderBottomLeftRadius: '20px' } }}
                        >
                            <i>Team</i>
                        </Button>
                    </Link>
                    <Link to="/admin-login" style={{ textDecoration: 'none' }}>
                        <Button
                            className='admin_btn'
                            startIcon={<LockIcon />}
                            size='large'
                            sx={{ color: '#d72324', '&:hover': { backgroundColor: '#d72324', color: 'white', textShadow: '1px 1px 5px black', borderRadius: '12px' } }}
                        >
                            <i>Admin Login</i>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className='card_holder'>
                <h2><i>What is <span>Book-My-Trip</span> ?</i></h2>
                <b>
                    <p>
                        <span className='orange'>India is a country which is rich in cultural diversity, vibrant traditions and awe-inspiring landscapes.
                            From the bustling city of Mumbai to the serene backwaters of Kerala, every city has its own story to tell.
                            Navigating through this vast and diverse country can be quite a challenge.</span><br />
                        <span className='white'>This is where <span className='tra_span'>Book-My-Trip</span> comes in.</span>
                    </p>
                    <p>
                        <span className='green'>Book-My-Trip is your one-stop solution for seamless travel planning and booking. Whether you're looking to organize a personal trip or a group tour, Book-My-Trip offers an easy-to-use interface and a host of features designed to make your journey hassle-free.</span>
                    </p>
                    <br />
                    <Typography variant='subtitle1' align='left' sx={{ marginLeft: '30px', color: '#d72324', fontWeight: 'bold', fontSize: '20px' }}>Our features:</Typography>
                    <ol>
                        <li> Book hotels across famous Indian cities</li>
                        <li> Flexible booking options</li>
                        <li> Option to avail transportation service</li>
                        <li> Real-time hotel-room availablity</li>
                        <li> Easy payment gateway</li>
                        <li> Support on stand-by</li>
                    </ol>
                    <br />
                    <p style={{ textShadow: '1px 1px 5px black' }}>
                        With Book-My-Trip, travel planning has never been easier. Start your adventure today and explore India, worry-free!
                    </p>
                </b>
            </div>

            <div className='footer'>
                <p>This website was made for the sole purpose of a SE-DBMS project.</p>
                <p>&copy; 2024 Book-My-Trip. All rights reserved.</p>
            </div>
        </div >
    );
};

export default MainPage;
