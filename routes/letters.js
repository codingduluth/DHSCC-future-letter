const express = require("express");
const router = express.Router();


const {
  getLetter, 
  createLetter
} = require('.././controllers/letters.js');

router.route('/').post(createLetter).get(getLetter);

module.exports = router;