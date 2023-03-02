import React, { Component } from 'react';
import './Signup.css';
import { Link, Navigate } from 'react-router-dom'
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../../../constants/IndexConstants';
import { signup } from '../../../api/AuthApi';
import googleLogo from '../../../img/google-logo.png';
import githubLogo from '../../../img/github-logo.png';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const location = useLocation();

    if (props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    }

    return (
        <div className="app-body">
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with SpringSocial</h1>
                    <SocialSignup />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm {...props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        </div>
    );
}


class SocialSignup extends Component {
    render() {
        return (
            <div className="app-body">
                <div className="social-signup">
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google" /> Sign up with Google</a>
                    <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github" /> Sign up with Github</a>
                </div>
            </div>
        );
    }
}

const SignupForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleInputChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        switch (inputName) {
            case 'name':
                setName(inputValue);
                break;
            case 'email':
                setEmail(inputValue);
                break;
            case 'password':
                setPassword(inputValue);
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = {
            'name': name,
            'email': email,
            'password': password,
        }

        signup(signUpRequest)
            .then(response => {
                if (response.status === 400) {
                    toast((response.data.message) || 'Oops! Something went wrong. Please try again!');
                    return;
                }
                toast("You're successfully registered. Please verify at your email!");
                navigate("/login")
            }).catch(error => {
                console.log(error);
                toast((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    return (
        <div className="app-body">
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <input type="text" name="name"
                        className="form-control" placeholder="Name"
                        value={name} onChange={handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="email" name="email"
                        className="form-control" placeholder="Email"
                        value={email} onChange={handleInputChange} required />
                </div>
                <div className="form-item">
                    <input type="password" name="password"
                        className="form-control" placeholder="Password"
                        value={password} onChange={handleInputChange} required />
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Signup