import React, { Component, useContext, useState } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../../../constants/IndexConstants';
import { login } from '../../../api/AuthApi';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import googleLogo from '../../../img/google-logo.png';
import githubLogo from '../../../img/github-logo.png';
import toast from 'react-hot-toast';
import AuthContext from '../../../context/AuthContext';
import { parseJwt } from '../../../misc/Helpers';

const Login = (props) => {

    const [isInitialCall, setInitialCall] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    if (isInitialCall) {
        setInitialCall(false);
        if (location.state && location.state.error) {
            setTimeout(() => {
                toast(location.state.error, {
                    duration: 5000
                });
                navigate({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    if (props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    }

    return (
        <div className="app-body">
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to SpringSocial</h1>
                    <SocialLogin />
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <LoginForm />
                    <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
                </div>
            </div>
        </div>
    );
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="app-body">
                <div className="social-login">
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google" /> Log in with Google</a>
                    <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github" /> Log in with Github</a>
                </div>
            </div>
        );
    }
}


const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'email') {
            setEmail(inputValue);
        } else {
            setPassword(inputValue);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const loginRequest = {
            email: email,
            password: password
        }

        login(loginRequest)
            .then(response => {
                const { token, refreshToken, imgUrl, name } = response.data;
                const data = parseJwt(token);
                const user = { data, token, refreshToken, imgUrl, name };
                authContext.userLogin(user);
                toast("You're successfully logged in!");
                navigate("/")
            }).catch(error => {
                if (error.response.data.message.toLowerCase() === "bad credentials") {
                    toast("You are using the wrong username and/or password");
                    return;
                }
                toast((error.response.data.message) || 'Oops! Something went wrong. Please try again!');
            });
    }

    return (
        <div className="app-body">
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login