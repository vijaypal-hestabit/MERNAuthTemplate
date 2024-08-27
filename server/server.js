// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.NODE_ENV,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.NODE_ENV || 5000, () => console.log(`Server running on port ${process.env.NODE_ENV || 5000}`));