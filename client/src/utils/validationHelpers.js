/**
 * Validates a required field.
 * @param {string} value - The value to validate.
 * @param {string} fieldName - The name of the field.
 * @returns {string} - Error message or empty string if valid.
 */
export const validateRequired = (value, fieldName) => {
    return value ? '' : `${fieldName} is required`;
};

/**
 * Validates an email address.
 * @param {string} value - The email value to validate.
 * @returns {string} - Error message or empty string if valid.
 */
export const validateEmail = (value) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(value) ? '' : 'Email address is invalid';
};

/**
 * Validates a number.
 * @param {string} value - The number value to validate.
 * @returns {string} - Error message or empty string if valid.
 */
export const validateNumber = (value) => {
    const numberPattern = /^\d+$/;
    return numberPattern.test(value) ? '' : 'Must be a valid number';
};

// validationHelpers.js

/**
 * Validates a password with modern criteria.
 * @param {string} value - The password value to validate.
 * @returns {string} - Error message or empty string if valid.
 */
export const validatePassword = (value) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (value.length < minLength) {
        return `Password must be at least ${minLength} characters long`;
    }
    if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!hasNumber) {
        return 'Password must contain at least one number';
    }

    return '';
};

/**
 * Validates if two values match.
 * @param {string} value1 - The first value to compare.
 * @param {string} value2 - The second value to compare.
 * @returns {string} - Error message if values do not match, empty string if valid.
 */
export const validateMatchText = (value1, value2) => {
    if (value1 !== value2) {
        return 'Passwords do not match.';
    }
    return ''; // Return an empty string if the values match
};