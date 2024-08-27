
/**
 * Validates the expiration time format and returns the expiration time to use.
 * @param {string} expiresIn - The expiration time from the request body.
 * @returns {string|Error} - Returns the expiration time if valid, otherwise throws an error.
 */
function validateExpirationTime(expiresIn) {
    const defaultExpirationTime = '2d';
    const validFormats = ['s', 'm', 'h', 'd'];
    const expirationPattern = /^(\d+)([smhd])$/;

    if (!expiresIn) {
        return defaultExpirationTime;
    }

    const match = expirationPattern.exec(expiresIn);
    if (!match || !validFormats.includes(match[2])) {
        throw new Error('Invalid expiration time format. Use a format like "1h", "30m", "2d", etc.');
    }

    return expiresIn;
}

module.exports = validateExpirationTime;
