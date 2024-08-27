import React, { useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import Forgot from '../images/lottie/forgot.json';
import Lottie from 'lottie-react';
import '../styles/auth.scss';
import Spinner from '../components/Spinner';
import { validateEmail } from '../utils/validationHelpers';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const emailError = validateEmail(email);

        if (emailError) {
            setError(emailError);
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/forgot-password', { email });
            setSuccess('Email sent successfully. You will receive a password reset link.');
        } catch (err) {
            if (err.response?.status === 429) {
                setError('You have made too many requests. Please try again later.');
            } else {
                setError('Failed to send reset link. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="image-container">
                <div className="lottie">
                    <Lottie animationData={Forgot} />
                </div>
            </div>
            <div className="form-container">
                <div className='form-wrapper'>
                    <h1 className="title">Forgot Password</h1>
                    <p className="subtitle">Enter your email address to receive a password reset link.</p>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                        </div>
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? <Spinner /> : 'Send Reset Link'}
                        </button>
                        <div className="link-group">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;