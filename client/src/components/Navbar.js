import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const userMenuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    const logout = () => {
        localStorage.removeItem('user');
        handleMenuItemClick();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getUser = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            return {
                name: storedUser.name,
                image: storedUser.image || null
            };
        }
        return null;
    };

    const user = getUser();

    const handleMenuItemClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const renderAvatar = () => {
        if (user?.image) {
            return <img src={user.image} alt="User Avatar" className="user-avatar" onClick={toggleMenu} />;
        } else if (user?.name) {
            return (
                <div className="user-avatar-placeholder" onClick={toggleMenu}>
                    {user.name[0].toUpperCase()}
                </div>
            );
        }
        return null;
    };

    return (
        <nav className="navbar">
            <div className="logo"><Link to={'/'}>MyApp</Link></div>
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                {!user ?
                    <>
                        <Link to="/login" onClick={handleMenuItemClick}>Login</Link>
                        <Link to="/signup" onClick={handleMenuItemClick}>Signup</Link>
                    </>
                    :
                    <div className="user-menu" ref={userMenuRef}>
                        <div className='user-toggle'>
                            {renderAvatar()}
                        </div>
                        <div className={`user-dropdown ${isOpen ? 'active' : ''}`}>
                            <Link to="/dashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                }
            </div>
            <div
                className="menu-icon"
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                role="button"
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;