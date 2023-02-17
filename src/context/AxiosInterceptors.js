import { useContext, useEffect } from 'react'
import { instanceResouce } from '../api/AuthApi';
import AuthContext from './AuthContext';

const AxiosInterceptors = ({ children }) => {
    const { userIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        instanceResouce.interceptors.request.use(function (config) {
            userIsAuthenticated(true);
        }, function (error) {
            return Promise.reject(error);
        })
    })

    return children
}

export default AxiosInterceptors