require('dotenv').config();
require('express-async-errors');

const path = require('path');
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authenticate');

const authRouter = require('./routes/auth');
const letterRouter = require('./routes/letters');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const authenticateUser = require('./middleware/authenticate');
app.set('trust proxy', 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

const allowedOrigins = [
  'http://localhost:3000',
  'https://dhscc-future-letter.onrender.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

//Routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/letters', authenticateUser, letterRouter);

//Default Gets
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html', 'register.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html', 'login.html'));
});

// app.get('/letters', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/html', 'letters.html'));
// });

//Middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, async () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
