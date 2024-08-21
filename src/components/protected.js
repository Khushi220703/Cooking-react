import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('tokenCooking'); // Check if the token exists
    console.log(token);
    
    return token ? Component : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
