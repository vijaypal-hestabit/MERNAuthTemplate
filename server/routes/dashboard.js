const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/data', authenticateToken, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});

module.exports = router;