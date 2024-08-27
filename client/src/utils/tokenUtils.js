import { jwtDecode } from 'jwt-decode';

/**
 * Checks if the JWT token is valid and not expired.
 * @param {string} token - The JWT token to validate.
 * @returns {boolean} - Returns true if the token is valid and not expired, otherwise false.
 */
export const isValidToken = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};
