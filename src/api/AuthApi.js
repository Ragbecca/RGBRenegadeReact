import { API_BASE_URL, API_BASE_URL_AUTH } from '../constants/IndexConstants';
import axios from 'axios';
import { bearerAuth } from '../misc/Helpers';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function getCurrentUser(user) {
    if (!localStorage.getItem("test")) {
        return Promise.reject("No access token set.");
    }

    return instanceAuth.get('/test', {
        headers: {
            'Authorization': bearerAuth(user),
        }
    });
}

export function login(userRequest) {
    return instanceAuth.post('/auth/login', userRequest, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function logout(username) {
    return instanceAuth.post('/auth/signout', username, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function signup(signUpUser) {
    return instanceAuth.post('/auth/signup', JSON.stringify(signUpUser), {
        headers: { 'Content-type': 'application/json' }
    })
}

export function verifyEmail(id) {
    return instanceAuth.get(`/auth/verify?id=${id}`, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function createTokenOAuth2(oAuth2User) {
    return instanceAuth.post('/auth/oauth2/createToken', oAuth2User, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function renewToken(refreshTokenGotten) {
    const refreshTokenJson = {
        refreshToken: refreshTokenGotten
    }
    return instanceAuth.post('/auth/refreshtoken', refreshTokenJson, {
        headers: { 'Content-type': 'application/json' }
    })
}

export function test(user) {
    return instance.get('/api/character/test', {
        headers: {
            'Authorization': bearerAuth(user),
        }
    })
}

const instanceAuth = axios.create({
    baseURL: API_BASE_URL_AUTH
});

export const instance = axios.create({
    baseURL: API_BASE_URL
});

const AxiosInterceptor = ({ children }) => {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {

        const interceptor = instance.interceptors.request.use(function (config) {
            if (!authContext.userIsAuthenticated(true)) {
                navigate("/login");
            } else {
                return config;
            }
        }, function (config) {
            if (!authContext.userIsAuthenticated(true)) {
                navigate("/login");
            } else {
                return config;
            }
        });

        return () => instance.interceptors.response.eject(interceptor);

    }, [])

    return children;
}

export { AxiosInterceptor };

