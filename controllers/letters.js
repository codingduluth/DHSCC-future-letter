require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const Letter = require('../models/Letter');
const crypto = require('crypto');
const BadRequestError = require('../errors');

//Get letter
const getLetter = async (req, res) => {
  var end = new Date('05/15/2025 2:00 PM');
  var now = new Date();

  if (now < end) {
    throw new Error('Countdown is not over yet!');
  }

  const createdBy = req.user.userId;

  const letter = await Letter.findOne({ createdBy });

  if (!letter) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Letter not found.' });
  }

  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

  const decipher = crypto.createDecipheriv(
    process.env.ENCRYPTION_METHOD, // e.g., 'aes-256-cbc'
    encryptionKey,
    Buffer.from(letter.iv, 'hex') // Convert iv from hex to Buffer
  );

  // Decrypt the letter
  let decryptedLetter = decipher.update(letter.letter, 'hex', 'utf8');
  decryptedLetter += decipher.final('utf8');

  res
    .status(StatusCodes.OK)
    .json({ name: req.user.name, letter: decryptedLetter });
};

//Create letter
const createLetter = async (req, res) => {
  req.body.createdBy = req.user.userId;

  //Check for existing letter
  const existingLetter = await Letter.findOne({
    createdBy: req.body.createdBy,
  });

  if (existingLetter) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: 'You have already created a letter.' });
  }

  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

  const iv = crypto.randomBytes(16); // Generate a random Initialization Vector
  const cipher = crypto.createCipheriv(
    process.env.ENCRYPTION_METHOD,
    encryptionKey,
    iv
  );

  let encryptedLetter = cipher.update(req.body.letter, 'utf8', 'hex');
  encryptedLetter += cipher.final('hex');

  //If not letter then create a new one
  const letter = await Letter.create({
    name: req.user.name,
    letter: encryptedLetter,
    createdBy: req.body.createdBy,
    iv: iv.toString('hex'),
  });
  res.status(StatusCodes.CREATED).json({ letter });
};

module.exports = {
  getLetter,
  createLetter,
};
