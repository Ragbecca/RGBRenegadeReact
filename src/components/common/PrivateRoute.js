import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PrivateRoute = (props) => {

    const authContext = useContext(AuthContext);

    return authContext.userIsAuthenticated() ? props.child : <Navigate to="/login" replace />;
}

export default PrivateRoute;