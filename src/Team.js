import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import './Team.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const Team = () => {
    return (
        <div>
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
                    <Link to="/team" style={{ textDecoration: 'none' }} target='_blank'>
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

            <div className='team_main'>
                <h1 className='team_title'>Team</h1>
                <div className='cards'>
                    <div className='card1'>
                        <img src='/assets/pic1.jpg' alt='Ajith S P' className='profile_pic' />
                        <h5>Ajith S P</h5>
                        <h6>Frontend-Developer</h6>
                        <hr />
                        <div className='socials'>
                            <div>
                                <button id='gmail_btn' className='social_btn' onClick={() => window.location.href = 'mailto:ajithsp224@gmail.com'}>
                                    <FontAwesomeIcon icon={faGoogle} style={{ color: "#ff0000", }} />
                                </button>
                            </div>
                            <div>
                                <button id='linkedin_btn' className='social_btn' onClick={() => window.open('https://www.linkedin.com/in/ajith-sp-21baa2318')}>
                                    <FontAwesomeIcon icon={faLinkedinIn} style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='database'>
                        <FontAwesomeIcon icon={faDatabase} style={{ fontSize: '100px' }} />
                    </div>

                    <div className='card2'>
                        <img src='/assets/pic2.jpg' alt='Aathreya D A' className='profile_pic' />
                        <h5>Aathreya D A</h5>
                        <h6>Backend-Developer</h6>
                        <hr />
                        <div className='socials'>
                            <div>
                                <button id='gmail_btn' className='social_btn' onClick={() => window.location.href = 'mailto:aathreyathebro@gmail.com'}>
                                    <FontAwesomeIcon icon={faGoogle} style={{ color: "#ff0000", }} />
                                </button>
                            </div>
                            <div>
                                <button id='linkedin_btn' className='social_btn' onClick={() => window.open('https://www.linkedin.com/in/aathreya-d-a-01a107290')}>
                                    <FontAwesomeIcon icon={faLinkedinIn} style={{ color: "#ffffff" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="arrow arrow-left"></div>
                    <div className="arrow arrow-right"></div>
                    <div className="arrow-label">Database Management</div>
                </div>
            </div>

            <div className='footer'>
                <p>This website was made for the sole purpose of a SE-DBMS project.</p>
                <p>&copy; 2024 Tra-Well. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Team