import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = () => {
    return (
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
    )
}

export default Header