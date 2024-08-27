import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isValidToken } from '../utils/tokenUtils';


const RedirectIfAuthenticated = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));;
    const location = useLocation();

    return isValidToken(user?.token) ? (
        <Navigate to="/dashboard" state={{ from: location }} />
    ) : (
        children
    );
};

export default RedirectIfAuthenticated;
