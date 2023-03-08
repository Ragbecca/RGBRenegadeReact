import React, { useContext, useState } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
import rgbLogo from '../../img/rgb-logo.png';
import AuthContext from '../../context/AuthContext';
import { Button } from '@mui/material';

const Home = () => {
    const authContext = useContext(AuthContext);

    const [isLoggedIn, setLoggedIn] = useState(authContext.userIsAuthenticated(false));

    return (
        <div className="app-body">
            <div className="app-body-left">
                {isLoggedIn ? (
                    <NavLink to="/profile" className="link">Profile</NavLink>
                ) : (
                    <NavLink to="/login" className="link">Login</NavLink>
                )}
                <div className="line-container">
                    <div className="line"></div>
                </div>
            </div>
            <div className="app-body-middle">
                <div className="container">
                    <div className='middle-left'>
                        <h1 className="home-title">Your LARP Adventure Starts Here</h1>
                        <div className="home-message">RGB Renegade is the only real public MARP project there is. Apply now to enter the world of MARP (Minecraft Action Roleplay). Hosted by many folks... or maybe even you! See you soon in the world of RGB Renegade</div>
                        <NavLink to="/login" className="home-button">Login Now</NavLink>
                    </div>
                    <div className='middle-right'>
                        <img src={rgbLogo} alt="logo"></img>
                    </div>
                </div>
            </div>
            <div className="app-body-right">
                <div className="app-body-right-text">
                    RGB Renegade where the magic happens
                </div>
            </div>
        </div>
    )
}

export default Home;