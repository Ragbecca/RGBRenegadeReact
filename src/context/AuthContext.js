import React, { Component, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { renewToken, logout } from '../api/AuthApi';
import { parseJwt } from '../misc/Helpers';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({ user });
    }

    getUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    changeAvatarURL = (avatarURL) => {
        const user = JSON.parse(localStorage.getItem('user'));
        user.imgUrl = avatarURL;
        this.setState({ user });
        localStorage.setItem('user', JSON.stringify(user));
    }

    userIsAuthenticated = (fromEffect) => {
        let user = localStorage.getItem('user');
        if (!user) {
            return false;
        }
        user = JSON.parse(user);

        if (Date.now() > user.data.exp * 1000) {
            if (fromEffect) {
                renewToken(user.refreshToken).then(response => {
                    const { token, refreshToken } = response.data;
                    const data = parseJwt(token);
                    const user = { data, token, refreshToken };
                    this.userLogin(user);
                }).catch(error => {
                    toast(error);
                    this.userLogout();
                    return false;
                });
            }
        }
        return true;
    }

    userLogin = user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user });
    }

    userLogout = () => {
        localStorage.removeItem('user');
        this.setState({ user: null });
    }

    render() {
        const { children } = this.props;
        const { user } = this.state;
        const { getUser, userIsAuthenticated, userLogin, userLogout, changeAvatarURL } = this;

        return (
            <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userLogin, userLogout, changeAvatarURL }}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext;

export function useAuthContext() {
    return useContext(AuthContext);
}

export { AuthProvider }