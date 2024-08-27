import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import LoginImage from '../images/lottie/login.json';
import Lottie from 'lottie-react';
import Spinner from '../components/Spinner';
import '../styles/auth.scss';
import { validateRequired } from '../utils/validationHelpers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const emailError = validateRequired(email, 'Email');
        const passwordError = validateRequired(password, 'Password');

        if (emailError || passwordError) {
            setError(emailError || passwordError);
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            if (err.response?.status === 429) {
                setError('You have made too many requests. Please try again later.');
            } else {
                const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="image-container">
                <div className="lottie">
                    <Lottie animationData={LoginImage} loop={true} />
                </div>
            </div>
            <div className="form-container">
                <div className='form-wrapper'>
                    <h1 className="title">Login</h1>
                    <p className="subtitle">Please enter your credentials to access your account.</p>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
                        </div>
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? <Spinner /> : 'Login'}
                        </button>
                        <div className="link-group">
                            I don't have an account? <Link to="/signup">Signup</Link>
                        </div>
                        <div className="link-group">
                            <Link to="/forgot-password">Forgot password</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;