import React, { useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ResetImage from '../images/lottie/login.json';
import Lottie from 'lottie-react';
import '../styles/auth.scss';
import Spinner from '../components/Spinner';
import { validatePassword } from '../utils/validationHelpers';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const passwordError = validatePassword(password);

        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(`/auth/reset-password/${token}`, { password });
            setSuccess('Password changed successfully.');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="image-container">
                <div className="lottie">
                    <Lottie animationData={ResetImage} />
                </div>
            </div>
            <div className="form-container">
                <div className='form-wrapper'>
                    <h1 className="title">Reset Password</h1>
                    <p className="subtitle">Enter your new password below to complete the reset process.</p>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input id="password" type={isPasswordVisible ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" className="eye-button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} >
                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="submit-button" disabled={loading}> {loading ? <Spinner /> : 'Submit'} </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;