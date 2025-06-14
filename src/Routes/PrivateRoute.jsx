import React from 'react';
import { use } from 'react';
import { AuthContext } from './../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user } = use(AuthContext)
    const location = useLocation()

    if (!user) {
        <Navigate to="/signIn" state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;