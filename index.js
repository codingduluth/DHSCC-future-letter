require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authenticate');

const authRouter = require('./routes/auth');
const letterRouter = require('./routes/letters');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const authenticateUser = require('./middleware/authenticate');
app.use(express.json());

//Routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/letters', authenticateUser, letterRouter);

//Default Get
// app.get('/', (req, res) => {
// res.send("<a href = 'replit.dev/api/v1/letters'></a>")
// })

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
