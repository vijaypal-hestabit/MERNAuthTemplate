import { Navigate, useLocation } from 'react-router-dom';
import { isValidToken } from '../utils/tokenUtils';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));;

    return isValidToken(user?.token) ? (
        Element
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateRoute;