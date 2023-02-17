import React, { Component } from 'react';
import './Home.css';
import rgbLogo from '../../img/rgb-logo.png';

class Home extends Component {
    render() {
        return (
            <div className="app-body">
                <div className="home-container">
                    <div className="container">
                        <div><img src={rgbLogo} alt="logo"></img></div>
                        <h1 className="home-title">RGB Renegade</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;