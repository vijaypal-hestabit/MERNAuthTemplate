import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import SignupImage from '../images/lottie/signup.json';
import Lottie from 'lottie-react';
import '../styles/auth.scss';
import Spinner from '../components/Spinner';
import { validateEmail, validateMatchText, validatePassword, validateRequired } from '../utils/validationHelpers';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState('')

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const nameError = validateRequired(name, 'Name')
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password);
        const matchTextError = validateMatchText(password, confirmPassword)

        if (nameError || emailError || passwordError || matchTextError) {
            setError(nameError || emailError || passwordError || matchTextError);
            setLoading(false);
            return;
        }


        try {
            const response = await api.post('/auth/signup', { name, email, password });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSuccess('Signup successful! Please check your email to verify your account.');
            setError('');
            navigate('/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="image-container">
                <div className="lottie">
                    <Lottie animationData={SignupImage} />
                </div>
            </div>
            <div className="form-container">
                <div className='form-wrapper'>
                    <h1 className="title">Sign Up</h1>
                    <p className="subtitle">Create a new account by filling in the details below.</p>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor='name'>Full name</label>
                            <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Password</label>
                            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='conf-password'>Confirm Password</label>
                            <input type="password" id='conf-password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? <Spinner /> : 'Sign Up'}
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

export default Signup;