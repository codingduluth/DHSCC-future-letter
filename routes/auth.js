const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/user');

const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  window: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again in 15 minutes',
  },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

module.exports = router;
