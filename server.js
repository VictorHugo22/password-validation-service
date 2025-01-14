// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Password validation function
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must include at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must include at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must include at least one number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must include at least one special character.');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

// Route for password validation
app.post('/validate-password', (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            error: 'Password is required.'
        });
    }

    const result = validatePassword(password);
    res.json(result);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Password validation microservice is running on port ${PORT}`);
});
