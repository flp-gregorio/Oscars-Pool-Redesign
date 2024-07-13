import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const isAuthDisabledForTesting = true; // Set to true for testing, false for production

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    console.log('Is authenticated: ', isAuthenticated);
    console.log('Auth disabled for testing: ', isAuthDisabledForTesting);

    if (!isAuthenticated && !isAuthDisabledForTesting) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;
