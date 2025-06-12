const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req,res) => {
    res.json({
        message: 'Welcome to your protected dashboard!',
        user: req.user
    });
});

module.exports = router;