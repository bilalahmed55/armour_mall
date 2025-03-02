/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const userRole = localStorage.getItem('role');

    // Show loading state or spinner while checking authentication
    if (isLoading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
        // Save the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 