import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const token = localStorage.getItem('access-token');

    if (!user || !token) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
