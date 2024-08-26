require('dotenv');
const mongoose = require('mongoose');
const crypto = require('crypto');

const LetterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  letter: {
    type: String,
    required: [true, 'Please provide your letter'],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the user who created the letter'],
  },
  iv: {
    type: String,
  },
});

// LetterSchema.statics.encryptLetter = function (letter) {
//   const iv = crypto.randomBytes(12);
//   const cipher = crypto.createCipheriv(
//     process.env.ENCRYPTION_METHOD,
//     Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
//     iv
//   );

//   let encryptedLetter = cipher.update(letter, 'utf8', 'hex');
//   encryptedLetter += cipher.final('hex');

//   const authTag = cipher.getAuthTag().toString('hex');
//   console.log('hello world');
//   return {
//     encryptedLetter,
//     iv: iv.toString('hex'),
//     authTag,
//   };
// };

LetterSchema.methods.decryptLetter = function () {
  const decipher = crypto.createDecipheriv(
    process.env.ENCRYPTION_METHOD,
    process.env.ENCRYPTION_KEY,
    Buffer.from(this.iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(this.authTag, 'hex'));

  let decrypted = decipher.update(this.letter, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

module.exports = mongoose.model('Letter', LetterSchema);
