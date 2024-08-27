import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import Navbar from './components/Navbar';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <RedirectIfAuthenticated>
                            <Login />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RedirectIfAuthenticated>
                            <Signup />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <RedirectIfAuthenticated>
                            <ForgotPassword />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/reset-password/:token"
                    element={
                        <RedirectIfAuthenticated>
                            <ResetPassword />
                        </RedirectIfAuthenticated>
                    }
                />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;